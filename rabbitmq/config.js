// Chargement de la librairie amqplib
const amqplib = require('amqplib');

const rabbitmq_url = 'amqp://user:password@efrei20250519.hopto.org:5680'

const exchange = "IMDA-exchange"

// Nom des queues
const queue_add = 'queue_add';
const queue_sub = 'queue_sub';
const queue_mul = 'queue_mul';
const queue_div = 'queue_div';
const queue_all = 'queue_all'
const queue_response = 'queue_response'

// Fonction de configuration
async function configure() {
    // Connexion à RabbitMQ
    const conn = await amqplib.connect(rabbitmq_url);

    // Créer un channel (connexion logique à RabbitMQ)
    const channel = await conn.createChannel();

    // Création de l'exchange
    await channel.assertExchange(exchange, 'direct', { durable: false });

    // Assertion sur les queues
    await channel.assertQueue(queue_add, { durable: false });
    await channel.assertQueue(queue_sub, { durable: false });
    await channel.assertQueue(queue_mul, { durable: false });
    await channel.assertQueue(queue_div, { durable: false });
    await channel.assertQueue(queue_all, { durable: false });
    await channel.assertQueue(queue_response, { durable: false });
    

    // Règles de routage
    await channel.bindQueue(queue_add, exchange, 'add');
    await channel.bindQueue(queue_sub, exchange, 'sub');
    await channel.bindQueue(queue_mul, exchange, 'mul');
    await channel.bindQueue(queue_div, exchange, 'div');
    
    
    await channel.bindQueue(queue_add, exchange, 'all')
    await channel.bindQueue(queue_sub, exchange, 'all')
    await channel.bindQueue(queue_mul, exchange, 'all')
    await channel.bindQueue(queue_div, exchange, 'all')

    


    console.log("[✓] Configuration OK");

    // Arrêt
    setTimeout(() => {
        conn.close();
        process.exit(0);
    }, 500);
}

configure();