import amqp from "amqplib";


// depois coloco no .env...
const QUEUE_NAME = "warning_queue";

async function sendDataToQueue(data) {
  let connection;

  try {
    // Parte de conexão, acho interessante colocar no rabbitmq.config
    connection = await amqp.connect("amqp://user:pass@localhost:5672");
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });

    const message = JSON.stringify(data);
    channel.sendToQueue(QUEUE_NAME, Buffer.from(message));

    console.log("Sending to RabbitMQ:", message);
  } catch (error) {
    console.error("Erro when sending message", error);
  } finally {
    if (connection) setTimeout(() => connection.close(), 500);
  }
}

export default sendDataToQueue;
