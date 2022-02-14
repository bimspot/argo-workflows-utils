// import connect from 'amqplib/callback_api'
import yargs from 'yargs'

var argv = yargs(process.argv.slice(2))
    .usage('Usage: $0 [options]')
    .example('$0 -u amqp://localhost -e file -k file.event.created -m {} -d', 
    'The publisher will connect to RabbitMQ, send a single message, then exit.')
    .alias('u', 'uri').nargs('u', 1).describe('u', 'RabbitMQ amqp uri.')
    .alias('e', 'exchange').nargs('e', 1).describe('e', 'Topic exchange to which the message is sent.')
    .alias('k', 'key').nargs('k', 1).describe('k', 'Routing key.')
    .alias('m', 'message').nargs('m', 1).describe('m', 'Message to be sent.')
    .option('durable', {
      alias: 'd',
      type: 'boolean',
      description: 'Optionally the queue will survive the broker restart.'
    })
    .demandOption(['u', 'e', 'k', 'm'])
    .help('h')
    .alias('h', 'help')
    .argv;

connect(argv.uri, (error, connection) => {
  if (error) {
    throw error
  }

  connection.createChannel((error, channel) => {
    if (error) {
      throw error
    }
    // durable false by default
    let durable = argv.durable || false
    channel.assertExchange(argv.exchange, 'topic', {
      durable: durable
    })
    channel.publish(argv.exchange, argv.key, Buffer.from(argv.message))
    console.log(" [x] Sent %s: $s", argv.key, argv.message)

    setTimeout(() => {
      connection.close();
      process.exit(0)
      }, 500);
  });
})