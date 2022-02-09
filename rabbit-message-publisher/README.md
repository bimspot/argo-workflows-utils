
# Rabbit-message-publisher

The script is used for publishing RabbitMQ message from the provided arguments.


## Usage

Usage: publisher.js [options]

Options:
      --version  Show version number                                   [boolean]
  -u, --uri      RabbitMQ amqp uri.                                   [required]
  -q, --queue    Name of the queue to send to.                        [required]
  -m, --message  Message to be sent.                                  [required]
  -d, --durable  Optionally the queue will survive the broker restart. [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  publisher.js -u amqp://localhost -q hell o -d

  The publisher will connect to RabbitMQ, send a single message, then exit.