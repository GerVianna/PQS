// Import de las dos clases necesarias
const OrderInfo = require('./orderInfo');
const OrderItem = require('./orderItem');
const STATUS_OK = 200;
const STATUS_ERROR = 400;
const STATUS_NOT_FOUND = 404;

// Configuro e importo cliente para postgresql
const {Client} = require('pg');

// Ingresar usuario postgres y credenciales de postgresql
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
    .then(() => console.log('Cliente conectado'));

// Definicion de endpoints
async function routes (fastify, options) {
    fastify.get('/api/orders/pending', async (req, res) => {
        let orders = [];
        client.query(
            `SELECT * FROM vorders_pending`, [], (error,results) => {
                if (error) {
                    res.send(STATUS_ERROR).send({'text': 'Error, bad request'});
                    throw error;
                }
                if (results.rows) {
                    results.rows.forEach(row => {
                        // Instancio objeto
                        const newOrder = new OrderInfo();
                        newOrder.orderId = row['OrderId'];
                        newOrder.status = 0;
                        newOrder.orderDescription = row['OrderDescription'];
                        newOrder.createdOn = row['CreatedOn'];
                        newOrder.total = row['TotalItemPrice'];
                        newOrder.qItems = row['TotalItems'];
                        orders.push(newOrder);
                    })
                }
                res.status(STATUS_OK).send(orders);
            }
        )
    })
    fastify.get('/api/orders/approved', async (req, res) => {
        let orders = [];
        client.query(
            `SELECT * FROM vorders_approved`, [], (error,results) => {
                if (error) {
                    res.send(STATUS_ERROR).send({'text': 'Error, bad request'});
                    throw error;
                }
                if (results.rows) {
                    results.rows.forEach(row => {
                        const newOrder = new OrderInfo();
                        newOrder.orderId = row['OrderId'];
                        newOrder.status = 1;
                        newOrder.orderDescription = row['OrderDescription'];
                        newOrder.createdOn = row['CreatedOn'];
                        newOrder.total = row['TotalItemPrice'];
                        newOrder.qItems = row['TotalItems'];
                        orders.push(newOrder);
                    })
                }
                res.status(STATUS_OK).send(orders);
            }
        )
    })
    fastify.get('/api/orders/rejected', async (req, res) => {
        let orders = [];
        client.query(
            `SELECT * FROM vorders_rejected`, [], (error,results) => {
                if (error) {
                    res.send(STATUS_ERROR).send({'text': 'Error, bad request'});
                    throw error;
                }
                if (results.rows) {
                    results.rows.forEach(row => {
                        const newOrder = new OrderInfo();
                        newOrder.orderId = row['OrderId'];
                        newOrder.status = -1;
                        newOrder.orderDescription = row['OrderDescription'];
                        newOrder.createdOn = row['CreatedOn'];
                        newOrder.total = row['TotalItemPrice'];
                        newOrder.qItems = row['TotalItems'];
                        orders.push(newOrder);
                    })
                }
                res.status(STATUS_OK).send(orders);
            }
        )
    })
    fastify.get('/api/orders/:id', async (req, res) => {
        const id = req.params.id;
        let items = [];
        client.query(
            `SELECT * FROM "OrderItems"  WHERE "OrderId" = ${id}`, [], (error,results) => {
                if (error) {
                    res.send(STATUS_ERROR).send({'text': 'Error, bad request'});
                    throw error;
                }
                if (results.rows.length) {
                    results.rows.forEach(row => {
                        const newOrderItem = new OrderItem();
                        newOrderItem.orderItemId = row['OrderItemId'];
                        newOrderItem.description = row['ItemDescription'];
                        newOrderItem.unitPrice = row['UnitPrice'];
                        newOrderItem.quantity = row['Quantity'];
                        items.push(newOrderItem);
                    })
                } else {
                    res.status(STATUS_NOT_FOUND).send({'text': 'Not found'});
                }
                res.status(STATUS_OK).send(items);
            }
        )
    })
    fastify.post('/api/orders', async (req,res) => {
        const id = req.body.id;
        client.query(`UPDATE "Orders"
                             SET "Status" = 1
                             WHERE "OrderId" = ${id}`,[], (error, results) => {
            if (error) {
                res.send(STATUS_ERROR).send({'text': 'Error, bad request'});
                throw error;
            }
            if (results.rowCount === 0) {
                res.status(STATUS_NOT_FOUND).send({'text': 'Not found'});
            } else {
                res.status(STATUS_OK).send({'text': 'La orden ha sido aceptada'});
            }
        });
    })
    fastify.delete('/api/orders/:id', async (req,res) => {
        const id = req.params.id;
        client.query(`UPDATE "Orders"
                             SET "Status" = -1
                             WHERE "OrderId" = ${id}`,[], (error, results) => {
            if (error) {
                res.send(STATUS_ERROR).send({'text': 'Error, bad request'});
                throw error;
            }
            if (results.rowCount === 0) {
                res.status(STATUS_NOT_FOUND).send({'text': 'Not found'});
            } else {
                res.status(STATUS_OK).send({'text': 'La orden ha sido rechazada'});
            }
        });
    })
}

module.exports = routes;
