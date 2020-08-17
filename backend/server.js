
// Instanciado de fastify

const PORT = 3000; // Puerto

const Fastify = require('fastify') // Importo la dependencia Fastify

async function build () {
  const fastify = Fastify();
  await fastify.register(require('middie')); // cargo middlewares
  // do you know we also have cors support?
  // https://github.com/fastify/fastify-cors
  fastify.use(require('cors')()); // uso de cors
  fastify.register(require('./api')); // registro endpoints
  return fastify
}

build()
    .then(fastify =>{
      fastify.listen(PORT) // run server
        console.log('Servidor corriendo en el puerto 3000');
    })
    .catch(console.log)
