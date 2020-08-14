
// Instancio fastify
const fastify = require('fastify')({
  logger: true,
  ignoreTrailingSlash: true
});

const PORT = 3000;
// Registro archivo con endpoints

fastify.register(require('./api'));

// Levanto el server
const start = async () => {
  try {
    await fastify.listen(PORT)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start();
