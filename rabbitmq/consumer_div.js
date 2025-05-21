// Chargement de la librairie amqplib
const amqplib = require('amqplib');

// Définition des informations de connexion
const rabbitmq_url = process.env.RABBITMQ_URL || 'amqp://user:password@efrei20250519.hopto.org:5680'

const exchange = "IMDA-exchange"
const queue = "queue_div"



async function start_consumer() {

    //Retarde la connexion pour lancer le serveur RabbitMQ
    setTimeout(async () => {
        const conn = await amqplib.connect(rabbitmq_url);
        // Créer un channel (connexion logique à RabbitMQ)
        channel = await conn.createChannel();
        channel.prefetch(1)
        // Assertion sur la queue
        await channel.assertQueue(queue, { durable: false });

        // Consommation des messages
        console.log("Starting ...");
        channel.consume(queue, consume, { noAck: false });
    }, 30000)



}

function consume(message) {

    console.log(`Message reçu : ${message.content.toString()}`);
    const [n1, n2] = message.content.toString().split(" ")

    if (parseInt(n2) === 0) {
        throw new Error("Division by 0")
    }
    const result = parseInt(n1) / parseInt(n2)

    if (message != null) {

        res = JSON.stringify({ n1, n2, op: "div", result })
        console.log("result" + res);

        //Valeur entre 5000 et 15000
        const timer = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;

        setTimeout(() => {
            channel.sendToQueue(message.properties.replyTo, Buffer.from(res), {
                correlationId: message.properties.correlationId
            });

            channel.ack(message)
        }, timer)


    }
}


start_consumer()


