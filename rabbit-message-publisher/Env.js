import { Log } from './Log.js'

export const Env = {
  /* RabbitMQ amqp uri */
  uri: process.env.RABBIT_MQ_URI,
  /* The name to be set for the rabbitmq connection (optional) */
  connectionName: process.env.CONNECTION_NAME || 'rabbit-message-publisher',
  /* Topic exchange to which the message is sent */
  exchange: process.env.EXCHANGE,
  /* The type of the exchange (direct, topic, fanout, match). */
  exchangeType: process.env.EXCHANGE_TYPE,
  /* Routing key */
  routingKey: process.env.ROUTING_KEY,
  /* The JSON message to be sent. */
  message: process.env.MESSAGE,
  /* The exchange will survive the broker restart. False by default. */
  durable: process.env.DURABLE || false,
}
/**
 * Checks if all ENV variables are present and exits if not.
 */
export const assertEnv = () => {
  let missingEnv = false
  for (const [key, value] of Object.entries(Env)) {
    if (!value) {
      Log.error(`A required environment variable is missing or empty: ${key}`)
      missingEnv = true
    }
  }
  if (missingEnv) {
    process.exit(9)
  }
}
