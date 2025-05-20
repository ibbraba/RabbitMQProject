// Chargement de la librairie amqplib
const amqplib = require('amqplib');

// Définition des informations de connexion
const rabbitmq_url = 'amqp://user:password@efrei20250519.hopto.org:5680'

const exchange = "IMDA-exchange"
const queue = "div_queue"



async function start_consumer() {
    const conn = await amqplib.connect(rabbitmq_url);

    // Créer un channel (connexion logique à RabbitMQ)
    channel = await conn.createChannel();

    // Assertion sur la queue
    await channel.assertQueue(queue, { durable: false });

    // Consommation des messages
    channel.consume(queue, consume, { noAck: true });

}

function consume(message) {

    const [n1, n2] = message.split(" ")

    if(parseInt(n2) === 0){
        throw new Error("Division by 0")
    }
    const result = parseInt(n1) / parseInt(n2)

    if (message != null) {

        res = JSON.stringify({ n1, n2, op: "div", result })
        console.log("result" + res);

        channel.sendToQueue(message.properties.replyTo, Buffer.from(res), {
            correlationId: message.properties.correlationId
        });

        channel.ack(message)
    }
}


start_consumer()