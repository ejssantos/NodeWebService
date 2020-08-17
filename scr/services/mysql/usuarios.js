const sha1 = require('sha1');

const usuarios = deps => {
    return {

        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection.query('select codigo, email from usuarios', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar usuarios.', reject);
                        return false;
                    }
            
                    resolve({
                        pagination: { page: 2, results: results.length },
                        usuarios: results
                    });
                });
            });
        },

        save: (email, senha) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('insert into usuarios(email, senha) values(?, ?)', [email, sha1(senha)], (error, results) => {
                    if (error) {
                        errorHandler(error, `Falha ao salvar usuário ${email}`, reject);
                        return false;
                    }
            
                    resolve({
                        usuario: { email, codigo: results.insertId }
                    });
                });
            });
        },

        update: (codigo, senha) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('update usuarios set senha = ? where codigo = ?', [sha1(senha), codigo], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Falha ao atualizar a senha do usuário ${ codigo }`, reject);
                        return false;
                    }
            
                    resolve({
                        usuario: { senha, affectedRows: results.affectedRows }
                    });
                });
            });
        },

        del: (codigo) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('delete from usuarios where codigo = ?', [ codigo ], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Falha ao excluir o usuário de código ${ codigo }`, reject);
                        return false;
                    }
            
                    resolve({
                        usuario: { message: 'Usuário excluído com sucesso.', affectedRows: results.affectedRows }
                    });
                });
            });
        }
    }
}

module.exports = usuarios;
