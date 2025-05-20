const amqp = require('amqplib');

const operations = ['add', 'sub', 'mul', 'div', 'all'];
const rabbitmq_url = 'amqp://user:password@efrei20250519.hopto.org:5680';
const exchange = 'IMDA-exchange';
const queue_response = "queue_response"
async function produce() {
    const conn = await amqp.connect(rabbitmq_url);
    const ch = await conn.createChannel();
    await ch.assertExchange(exchange, 'direct', { durable: false });

    setInterval(() => {
        const n1 = Math.floor(Math.random() * 100);
        const op = operations[Math.floor(Math.random() * operations.length)];
        const n2 = Math.floor(Math.random() * 100);
        const msg = `${n1} ${n2}`
        if (n2 !== 0 && op !== 'div') {
            ch.publish(exchange, "sub", Buffer.from(msg), {
                replyTo: queue_response,
                correlationId: generateUuid()
            });
            console.log(` [x] Sent: ${msg} (${op})`);
        }
    }, 5000);
}
function generateUuid() {
    return Math.random().toString() + Math.random().toString() + Math.random().toString();
}

produce().catch(console.error);
