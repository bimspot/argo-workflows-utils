import { setTimeout } from 'timers/promises'
import * as amqp from 'amqplib'
import { assertEnv, Env } from './Env.js'
import { Log } from './Log.js'

try {
  assertEnv()
  const connection = await amqp.connect(Env.uri, {
    clientProperties: { connection_name: Env.connectionName },
  })
  const channel = await connection.createChannel()
  Log.debug(
    `Asserting exchange ${Env.exchange}, ` +
      `type: ${Env.exchangeType}, durable: ${Env.durable}`,
  )
  await channel.assertExchange(Env.exchange, Env.exchangeType, {
    durable: Env.durable,
  })
  Log.debug(
    `Publishing message to ${Env.exchange}, ${Env.routingKey}`,
    Env.message,
  )
  channel.publish(Env.exchange, Env.routingKey, Buffer.from(Env.message))
  await setTimeout(500)
  await connection.close()
  process.exit(0)
} catch (e) {
  Log.error('An error occurred', e)
  process.exit(9)
}
