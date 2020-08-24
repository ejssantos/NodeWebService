const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

const auth = deps => {
    return {
        authenticate: (email, senha) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                const queryString = 'select codigo, email from usuarios where email = ? and senha = ?';
                const parameters = [email, sha1(senha)];

                connection.query(queryString, parameters, (error, results) => {
                    if (error || !results.length) {
                        errorHandler(error, 'Falha ao autenticar', reject);
                        return false;
                        
                        //return reject(error);
                    }

                    const { email, codigo } = results[0];
                    //console.log(results);

                    //  60 segundos x 60 minutos x 24 horas = total em segundos
                    const token = jwt.sign({ email, codigo }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

                    resolve({ token });
                });
            });
        }
    }
}

module.exports = auth;
