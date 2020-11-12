const fastify = require('fastify')({
    logger: true
})

const { Pool, Client } = require('pg')

// const pool = new Pool()
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'hz',
    password: 'qwertyuiop3',
    port: 5432,
})
fastify.register(require('fastify-formbody'))

// fastify.get('/register', function (request, reply) {
//     reply.send({ hello: 'world' })
// })
fastify.route({
    method: 'POST',
    url: '/register',
    async handler(request, reply) {
        //let data = await ТВОЯ ФУНКЦИЯ(request.body)
        let query;
        query = `INSERT INTO users ("userName", "userPassword", "userNumber") VALUES ('${request.body.userName}', ${request.body.userPassword}, ${request.body.userNumber});`
        console.log(query)
        await client.connect()
        let data = await client.query(query)
        await client.end()
        reply.send(data)

        console.log(request.body.userName)
    }
})

fastify.listen(3000, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})