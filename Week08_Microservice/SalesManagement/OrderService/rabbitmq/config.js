const amqp = require('amqplib');

const connectRabbitMQ = async () => {
    const connection = await amqp.connect('amqp://localhost'); // Đảm bảo URL đúng
    const channel = await connection.createChannel();
    return { connection, channel };
};

module.exports = { connectRabbitMQ };
