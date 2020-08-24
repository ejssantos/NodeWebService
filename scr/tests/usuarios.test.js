
const { test, connection, errorHandler } = require('./setup');

const usuariosModule = require('../services/mysql/usuarios')({ connection, errorHandler });

const list = () => usuariosModule.all();
const create = (email, senha) => usuariosModule.save(email, senha);
const update = (codigo, senha) => usuariosModule.update(codigo, senha);
const del = (codigo) => usuariosModule.del(codigo);

//  Limpando os testes anteriores...
test.beforeEach(t => connection.query('delete from ejss_teste.usuarios'));

test('Iniciando os testes de cadastro de usuários...', async t => {
    const bar = Promise.resolve('OK');
    t.is(await bar, 'OK');
});

test('Teste de listagem de usuarios', async t => {
    await create('ejssantos@hotmail.com', '123')
    const result = await list();
    t.is(result.usuarios.length > 0, true);
});

test('Teste de inclusão de usuário', async t => {
    const result = await create('adriana@hotmail.com', '456');
    t.is(result.usuario.email, 'adriana@hotmail.com');
});

test('Teste de atualização de usuário', async t => {
    let result = await create('maria@hotmail.com', '789');
    result = await update(result.usuario.codigo, '000');
    t.is(result.usuario.senha, '000');
});

test('Teste de exclusão de usuário', async t => {
    let result = await create('bela@hotmail.com', '999');
    result = await del(result.usuario.codigo);
    t.is(result.usuario.affectedRows, 1);
});

//  Limpando todos os testes
//test.after.always(t => connection.query('delete from ejss_teste.produtos'));
