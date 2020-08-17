const { test, connection, errorHandler } = require('./setup');

const produtosModule = require('../services/mysql/produtos')({ connection, errorHandler });

const list = () => produtosModule.all();
const create = (codigo, descricao) => produtosModule.save(codigo, descricao);
const update = (codigo, descricao) => produtosModule.update(codigo, descricao);
const del = (codigo) => produtosModule.del(codigo);

//  Limpando os testes anteriores...
test.beforeEach(t => connection.query('delete from ejss_teste.produtos'));

test('Iniciando os testes de cadastro de produtos...', async t => {
    const bar = Promise.resolve('OK');
    t.is(await bar, 'OK');
});

test('Teste de listagem de produtos', async t => {
    await create(1, 'Headset')
    const result = await list();
    t.is(result.produtos.length > 0, true);
    //console.log(result.produtos.length > 0);
});

test('Teste de inclusão de produto', async t => {
    const result = await create(2, 'Notebook');
    t.is(result.produto.descricao, 'Notebook');
});

test('Teste de atualização de produto', async t => {
    await create(3, 'Computador');
    const result = await update(3, 'SSD');
    t.is(result.produto.descricao, 'SSD');
});

test('Teste de exclusão de produto', async t => {
    await create(4, 'HD');
    const result = await del(4);
    t.is(result.produto.affectedRows, 1);
    //console.log(result.produto.affectedRows);
});

//  Limpando todos os testes
//test.after.always(t => connection.query('delete from ejss_teste.produtos'));
