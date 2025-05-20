const amqp = require('amqplib');

const operations = ['add', 'sub', 'mul', 'div', 'all'];
const rabbitmq_url = 'amqp://user:password@efrei20250519.hopto.org:5680';
const exchange = 'IMDA-exchange';

async function produce() {
    const conn = await amqp.connect(rabbitmq_url);
    const ch = await conn.createChannel();
    await ch.assertExchange(exchange, 'direct', { durable: false });

    let interval;
    interval = Math.floor(Math.random() * (15000 - 5000 + 1) + 5000);
    setInterval(() => {
        const n1 = Math.floor(Math.random() * 100);
        const n2 = Math.floor(Math.random() * 100);
        const op = operations[Math.floor(Math.random() * operations.length)];
        const msg = JSON.stringify({ n1, n2 });
        ch.publish(exchange, op, Buffer.from(msg));
        console.log(` [x] Sent: ${msg}`);
    }, interval);
}

produce().catch(console.error);
