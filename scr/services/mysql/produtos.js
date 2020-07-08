
//  O processamento é tão rápido que o browser não consegue capturar os dados. Nesse caso, usamos promise.
// const produtos = connection.query('select * from produtos', (error, results) => {
//     if (error) {}

//     return { produtos: results }
// });

//  Usando promise
// const produtos = deps => {
//     new Promise((resolve, reject) => {
//         const { connection } = deps
//         connection.query('select * from produtos', (error, results) => {
//             if (error) {
//                 reject(error);
//             }
    
//             resolve({
//                 pagination: { page: 2, results: results.length },
//                 produtos: results
//             });
//         });
//     });
// }

const produtos = deps => {
    return {

        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('select * from produtos', (error, results) => {
                    if (error) {
                        //reject(error);
                        errorHandler(error, 'Falha ao listar produtos.', reject);
                        return false;
                    }
            
                    resolve({
                        pagination: { page: 2, results: results.length },
                        produtos: results
                    });
                });
            });
        },

        save: (codigo, descricao) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('insert into produtos(codigo, descricao) values(?, ?)', [codigo, descricao], (error, results) => {
                    if (error) {
                        //reject(error);
                        errorHandler(error, `Falha ao salvar o produto ${descricao}`, reject);
                        return false;
                    }
            
                    resolve({
                        //produto: { codigo: results.insertId, descricao }
                        produto: { codigo, descricao }
                    });
                });
            });
        },

        update: (codigo, descricao) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('update produtos set descricao = ? where codigo = ?', [descricao, codigo], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Falha ao atualizar o produto ${descricao}`, reject);
                        return false;
                    }
            
                    resolve({
                        produto: { codigo, descricao }
                    });
                });
            });
        },

        del: (codigo) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('delete from produtos where codigo = ?', [ codigo ], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Falha ao excluir o produto de código ${codigo}`, reject);
                        return false;
                    }
            
                    resolve({
                        produto: { message: 'Produto excluído com sucesso.', affectedRows: results.affectedRows }
                    });
                });
            });
        }
    }
}

module.exports = produtos;
