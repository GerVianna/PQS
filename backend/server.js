
// Instancio fastify

const PORT = 3000;

const Fastify = require('fastify')

async function build () {
  const fastify = Fastify()
  await fastify.register(require('middie'))
  // do you know we also have cors support?
  // https://github.com/fastify/fastify-cors
  fastify.use(require('cors')())
  fastify.register(require('./api'));
  return fastify
}

build()
    .then(fastify =>{
      console.log('Servidor corriendo en el puerto 3000');
      fastify.listen(PORT)
    })
    .catch(console.log)
