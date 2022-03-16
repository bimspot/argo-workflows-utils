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
  await channel.assertExchange(Env.exchange, Env.type, {
    durable: Env.durable,
  })
  channel.publish(Env.exchange, Env.routingKey, Buffer.from(Env.message))
  await setTimeout(500)
  await connection.close()
  process.exit(0)
} catch (e) {
  Log.error('An error occurred', e)
  process.exit(9)
}
