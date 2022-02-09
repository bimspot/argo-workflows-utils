// import connect from 'amqplib/callback_api'
import yargs from 'yargs'

var argv = yargs(process.argv.slice(2))
    .usage('Usage: $0 [options]')
    .example('$0 -u amqp://localhost -q hello -d', 
    'The publisher will connect to RabbitMQ, send a single message, then exit.')
    .alias('u', 'uri')
    .nargs('u', 1)
    .describe('u', 'RabbitMQ amqp uri.')
    .alias('q', 'queue')
    .nargs('q', 1)
    .describe('q', 'Name of the queue to send to.')
    .alias('m', 'message')
    .nargs('m', 1)
    .describe('m', 'Message to be sent.')
    .option('durable', {
      alias: 'd',
      type: 'boolean',
      description: 'Optionally the queue will survive the broker restart.'
    })
    .demandOption(['u', 'q', 'm'])
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
    channel.assertQueue(queueName, {
      durable: argv.durable
    })
    channel.sendToQueue(argv.queue, Buffer.from(argv.message))
    console.log(" [x] Sent %s", msg)

    setTimeout(() => {
      connection.close();
      process.exit(0)
      }, 500);
  });
})