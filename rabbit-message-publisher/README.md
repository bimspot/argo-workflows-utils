
# Rabbit-message-publisher

The script is used for publishing RabbitMQ message from the provided arguments.


## Usage

Usage: publisher.js [options]

Options:
      --version   Show version number                                  [boolean]
  -u, --uri       RabbitMQ amqp uri.                                  [required]
  -e, --exchange  Topic exchange to which the message is sent.        [required]
  -k, --key       Routing key.                                        [required]
  -m, --message   Message to be sent.                                 [required]
  -d, --durable   Optionally the queue will survive the broker restart.[boolean]
  -h, --help      Show help                                            [boolean]

Examples:
  publisher.js -u amqp://localhost -e file -k file.event.created -m {} -d