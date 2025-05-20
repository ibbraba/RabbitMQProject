// Chargement de la librairie amqplib
const amqplib = require('amqplib');

// Définition des informations de connexion
const rabbitmq_url = 'amqp://user:password@efrei20250519.hopto.org:5680'

const exchange = "IMDA-exchange"
const queue = "queue_all"

const queue_add = "queue_add"
const queue_sub = "queue_sub"
const queue_mul = "queue_mul"
const queue_div = "queue_div"

const operations_queues = [queue_add, queue_sub, queue_mul, queue_div]

async function start_consumer(params) {

    const conn = await amqplib.connect(rabbitmq_url);

    // Créer un channel (connexion logique à RabbitMQ)
    channel = await conn.createChannel();

    channel.prefetch(1);
    // Assertion sur la queue
    await channel.assertQueue(queue, { durable: false });

    console.log("Starting ...");

    // Consommation des messages
    channel.consume(queue, consume, { noAck: false });
}

function consume(message) {

    console.log(`Message reçu : ${message.content.toString()}`);
    const [n1, n2] = message.content.toString().split(" ")

    operations_queues.forEach((queue) => {
        channel.sendToQueue(queue, Buffer.from(message.content.toString()), {
            replyTo: message.properties.replyTo,
            correlationId: message.properties.correlationId
        });
    })

}


start_consumer()