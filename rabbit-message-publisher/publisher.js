const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (error, connection) => {
  if (error) {
    throw error;
  }
  connection.createChannel((error, channel) => {});
})