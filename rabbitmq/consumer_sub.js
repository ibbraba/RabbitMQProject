// Chargement de la librairie amqplib
const amqplib = require('amqplib');

// Définition des informations de connexion
const rabbitmq_url = 'amqp://user:password@efrei20250519.hopto.org:5680'

const exchange = "IMDA-exchange"
const queue = "queue_sub"



async function start_consumer() {
    const conn = await amqplib.connect(rabbitmq_url);

    // Créer un channel (connexion logique à RabbitMQ)
    channel = await conn.createChannel();
    channel.prefetch(1)
    // Assertion sur la queue
    await channel.assertQueue(queue, { durable: false });

    console.log("Starting ...");
    // Consommation des messages
    channel.consume(queue, consume, { noAck: false });

}

function consume(message) {

    console.log(`Message reçu : ${message.content.toString()}`);
    const [n1, n2] = message.content.toString().split(" ")

    const result = parseInt(n1) - parseInt(n2)

    if (message != null) {

        res = JSON.stringify({ n1, n2, op: "sub", result })
        console.log("Reply to :" + message.properties.replyTo)
        console.log("CorrelationId:" + message.properties.correlationId)
        console.log("result" + res);
       
        setTimeout(() => {
            channel.sendToQueue(message.properties.replyTo, Buffer.from(res), {
            correlationId: message.properties.correlationId
        });

        channel.ack(message)
        }, 10000)
    }
}


start_consumer()