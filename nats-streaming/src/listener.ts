import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

// Create a unique client ID
const clientId = randomBytes(4).toString('hex');

// Connect to NATS Streaming server
const stan = nats.connect('ticketing', clientId, {
  url: 'http://localhost:4222',
});
//Replay all the messages
const options = stan.subscriptionOptions()
  .setDeliverAllAvailable();

// Wait until the connection is established
stan.on('connect', () => {
  console.log('Listener connected to NATS Streaming');

  // Set up graceful shutdown
  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  // Subscribe to a topic
  const subscription = stan.subscribe('topic', options);

  subscription.on('message', (msg) => {
    const data = msg.getData();
    console.log(`Received a message [${msg.getSequence()}]: ${data}`);
  });
});

// Capture termination signals
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
