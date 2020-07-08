const db = require('../services/mysql');

// db.produtos().all();
// db.produtos().save(name);
// db.produtos().update(id, name);
// db.produtos().del(id);

const routes = (server) => {

    //  Usando Async e Await
    server.get('/produtos', async(req, res, next) => {
        try {
            res.send(await db.produtos().all());
        } catch (error) {
            res.send(error);
        }
        next();
    });

    /*
    //  Usanso then e promise
    server.get('/produtos', (req, res, next) => {
        
        //console.log(db.produtos());
        
        db.produtos().all().then(produtos => {
            //produtos => console.log(produtos)
            res.send(produtos);
            next();
        }).catch(error => {
            //error => console.error(error)
            res.send(error);
            next();
        });
    });
    */

    /*
    server.post('/produtos', (req, res, next)  => {

        console.log(req);

        const { name } = req.params;

        res.send(name);
        next();
    });
    */

   server.post('/produtos', async(req, res, next)  => {

        const { codigo, descricao } = req.params;

        try {
            res.send(await db.produtos().save(codigo, descricao));
        } catch (error) {
            res.send(error);
        }
        next();
    });

    server.put('/produtos', async(req, res, next) => {
        const { codigo, descricao } = req.params;

        try {
            res.send(await db.produtos().update(codigo, descricao));
        } catch (error) {
            res.send(error);
        }
        next();
    });

    server.del('/produtos', async(req, res, next) => {
        const { codigo } = req.params;

        try {
            res.send(await db.produtos().del(codigo));
        } catch (error) {
            res.send(error);
        }
        next();
    });

    server.get('/', (req, res, next) => {
        res.send('Conectado.');
        next();
    });
    
}

module.exports = routes;
