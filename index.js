//for env vars
import fastifyEnv from '@fastify/env';
import fastifyCors from '@fastify/cors';

import Fastify from 'fastify'
import fastifyPostgres from '@fastify/postgres';



import {envConfig}  from './configs/env-config.js';



const fastify = Fastify({
  logger: true
})


// Register the plugin
await fastify.register(fastifyEnv, envConfig)

await fastify.register(fastifyCors, {
  origin: ['http://localhost:5173'], // Your React dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE']
});

  await fastify.register(fastifyPostgres, {
      connectionString: fastify.config.DB_CONN_STRING
    });


    // Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'hello' })
})

  
fastify.get('/applications/all', async function (request, reply) {
 const client =  await fastify.pg.connect()

 try {
  const { rows } = await fastify.pg.query('SELECT * FROM applications')
  console.log(rows)
  // Note: avoid doing expensive computation here, this will block releasing the client
  reply.send(rows)
  // return rows
} finally {
  // Release the client immediately after query resolves, or upon error
  client.release()
}
})

fastify.get('/applications/:fileNumber', async function (request, reply) {
 const client =  await fastify.pg.connect()
 const { fileNumber } = request.params

 try {
  const { rows } = await fastify.pg.query('SELECT * FROM applications WHERE file_number = $1',[fileNumber])
  console.log(rows)
  // Note: avoid doing expensive computation here, this will block releasing the client
  reply.send(rows)
  // return rows
} finally {
  // Release the client immediately after query resolves, or upon error
  client.release()
}
})


// get data with table and entity
fastify.get('/applications/:entity/:data', async function (request, reply) {
 const client =  await fastify.pg.connect()
 const { entity, data } = request.params
 console.log(entity, data)

 try {
  const { rows } = await fastify.pg.query('SELECT * FROM applications WHERE $1 = $2',[entity, data])
  console.log(rows)
  // Note: avoid doing expensive computation here, this will block releasing the client
  reply.send(rows)
  // return rows
} finally {
  // Release the client immediately after query resolves, or upon error
  client.release()
}
})



    
// Run the server!
await fastify.listen({ port: fastify.config.PORT })



  // fastify.log.info(`Server configuration: ${JSON.stringify(fastify.config)}`);


