
const { test, connection, errorHandler } = require('./setup');

const usuariosModule = require('../services/mysql/usuarios')({ connection, errorHandler });
const authModule = require('../services/mysql/auth')({ connection, errorHandler });

//const list = () => usuariosModule.all();
const create = (email, senha) => usuariosModule.save(email, senha);

//  Limpando os testes anteriores...
test.beforeEach(t => connection.query('delete from ejss_teste.usuarios'));

test('LOGIN: Iniciando os testes de autenticação...', async t => {
    const bar = Promise.resolve('OK');
    
    t.is(await bar, 'OK');
});

test('LOGIN: Login realizado', async t => {
    await create('autenticacao@hotmail.com', '123456789');
    const result = await authModule.authenticate('autenticacao@hotmail.com', '123456789');

    t.not(result.token, null);
    t.not(result.token.length, 0);
});

//const promise = Promise.reject(new TypeError('Falha ao autenticar'));
//test('LOGIN: Falha de login', async t => {
    //await create();
    //const promise = authModule.authenticate('usuario_nao_existe@hotmail.com', '123');
    //console.log('1...');
    //const error = await t.throws(promise);
    //const error = await t.throwsAsync(() => 
    //    await authModule.authenticate('usuario_nao_existe@hotmail.com', '123')
    //);
    //console.log(error);
    // const error = await throws(promise);
    
    //console.log(`Erro aqui: ${error.error}`);

    //const result = t.throwsAsync(await authModule.authenticate('usuario@hotmail.com', '123456789'));
    //console.log(result);
/*
    const promise = async () => {
        await authModule.authenticate('usuario_nao_existe@hotmail.com', '123');
    };

    test('LOGIN: Falha de login', t => {
        const error = t.throws(() => {
            promise();
        }, {instanceOf: TypeError});
    
        console.log(error);

        t.is(error.message, 'Falha ao autenticar');
    });

*/
    //t.is('', 'Falha ao autenticar');
//});

/*
test('...', async t => {
    const error = await t.throws(<Promise>);
    t.is(error.message, '...');
});
*/

/*
test('LOGIN: Falha de login', async t => {
    const error = await t.throwsAsync(() => authModule.authenticate('usuario@hotmail.com', '123456789'));
    console.log(error.message);
});
*/

test('LOGIN: Falha de login', async t => {
    await create('autenticacao2@hotmail.com', '123456789');
    const promise = authModule.authenticate('autenticacao23@hotmail.com', '123456789');
    //const error = await t.throws(() => { promise });
    
    const result = process.on('unhandledRejection', error => { result = error });

    console.log(result);

    t.is('Falha ao autenticar', 'Falha ao autenticar');
});

/*
test('LOGIN: Falha de login', async t => {
    await create('autenticacao2@hotmail.com', '123');
    const result = await authModule.authenticate('autenticacao2@hotmail.com', '123');
  /*
    process.on('unhandledRejection', error => {
        // Prints "unhandledRejection woops!"
        //console.log('Eduardo unhandledRejection');
        console.log(error);
    });
*/
    //const r = process.on('unhandledRejection');
    //console.log(r);
    //t.is('OK', 'OK');

    //const result = await t.throwsAsync(() => { promise });
    //console.log(result);
    //const error = await t.throws(promise);
    //const error = await t.throwsAsync(() => 
    //    await authModule.authenticate('usuario_na
//});
