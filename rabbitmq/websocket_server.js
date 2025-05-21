const amqp = require('amqplib');
const WebSocket = require('ws');
const express = require('express');
const app = express();
const PORT = 3001;

const wss = new WebSocket.Server({ noServer: true });
const queue = 'queue_response';

app.use(express.static('public'));

const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

server.on('upgrade', (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
    });
});




// Définition des informations de connexion
const rabbitmq_url = process.env.RABBITMQ_URL || 'amqp://user:password@efrei20250519.hopto.org:5680'

async function start_consumer() {

    setTimeout(async () => {
        const conn = await amqp.connect(rabbitmq_url);
        channel = await conn.createChannel();
        channel.prefetch(1)
        await channel.assertQueue(queue, { durable: false });

        console.log(`Waiting for messages in ${queue}`);

        channel.consume(queue, consume, { noAck: false })
    }, 30000)
    
}

function consume(message) {

    console.log(`Message reçu : ${message.content.toString()}`);


    // Broadcast to all WebSocket clients
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            console.log("Sending response to client ...");
            client.send(message.content.toString());
        }
    });

    channel.ack(message);
}

start_consumer().catch(console.error);