// Configuro cliente para postgresql
const {Client} = require('pg');

const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    password: 'bdxb9o',
    port: 5432
});

// Conecto cliente
client
    .connect()
    .then(() => console.log('cliente conectado'));

// Definicion de endpoints
async function routes (fastify, options) {
    fastify.get('/api/orders/pending', async (req, res) => {
        client.query(
            `SELECT * FROM "Orders" 
                    WHERE "Status" = 0`, [], (error,results) => {
                if (error) {
                    throw error;
                }
                res.status(200).send(results.rows);
            }
        )
    })
    fastify.get('/api/orders/approved', async (req, res) => {
        client.query(
            `SELECT * FROM "Orders"  WHERE "Status" = 1`, [], (error,results) => {
                if (error) {
                    throw error;
                }
                res.status(200).send(results.rows);
            }
        )
    })
    fastify.get('/api/orders/rejected', async (req, res) => {
        client.query(
            `SELECT * FROM "Orders"  WHERE "Status" = -1`, [], (error,results) => {
                if (error) {
                    throw error;
                }
                res.status(200).send(results.rows);
            }
        )
    })
    fastify.get('/api/orders/:id', async (req, res) => {
        const id = req.params.id;
        client.query(
            `SELECT * FROM "Orders"  WHERE "OrderId" = ${id}`, [], (error,results) => {
                if (error) {
                    throw error;
                }
                res.status(200).send(results.rows);
            }
        )
    })
    fastify.post('/api/orders', async (req,res) => {
        const id = req.body.id;
        client.query(`UPDATE "Orders"
                             SET "Status" = 1
                             WHERE "OrderId" = ${id}`,[], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).send('La orden ha sido aceptada');
        })
    })
    fastify.delete('/api/orders/:id', async (req,res) => {
        const id = req.params.id;
        client.query(`UPDATE "Orders"
                             SET "Status" = -1
                             WHERE "OrderId" = ${id}`,[], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).send('La orden ha sido rechazada');
        })
    })
}

module.exports = routes;
