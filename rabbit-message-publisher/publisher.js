import * as amqp from 'amqplib'
import yargs from 'yargs'
;(async () => {
  const argv = yargs(process.argv.slice(2))
    .usage('Usage: $0 [options]')
    .example(
      '$0 -u amqp://localhost -e file -t topic -k file.event.created -m {} -d',
      'The publisher will connect to RabbitMQ, send a single message, then exit.',
    )
    .alias('u', 'uri')
    .nargs('u', 1)
    .describe('u', 'RabbitMQ amqp uri.')
    .alias('e', 'exchange')
    .nargs('e', 1)
    .describe('e', 'Topic exchange to which the message is sent.')
    .alias('t', 'type')
    .nargs('t', 1)
    .describe('e', 'The type of he exchange (direct, topic, fanout, match).')
    .alias('k', 'key')
    .nargs('k', 1)
    .describe('k', 'Routing key.')
    .alias('m', 'message')
    .nargs('m', 1)
    .describe('m', 'Message to be sent.')
    .alias('vn', 'connectionName')
    .nargs('cn', 1)
    .describe('cn', 'The name of the connection to be created.')
    .option('durable', {
      alias: 'd',
      type: 'boolean',
      description: 'Optionally the queue will survive the broker restart.',
    })
    .demandOption(['u', 'e', 't', 'k', 'm'])
    .help('h')
    .alias('h', 'help').argv

  const connection = await amqp.connect(argv.uri, {
    clientProperties: { connection_name: argv.connectionName },
  })

  const channel = await connection.createChannel()

  const durable = argv.durable || false
  await channel.assertExchange(argv.exchange, argv.type, {
    durable: durable,
  })

  channel.publish(argv.exchange, argv.key, Buffer.from(argv.message))

  setTimeout(async () => {
    await connection.close()
    process.exit(0)
  }, 500)
})()
