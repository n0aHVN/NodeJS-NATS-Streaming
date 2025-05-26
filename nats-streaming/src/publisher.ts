import nats from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
    console.log('Publisher connected to NATS');
    stan.publish("topic", "Hello World!", (err) =>{
      if (err) {
        console.error('Error publishing message:', err);
      }
    });
    stan.on('close', () => {
        console.log('NATS connection closed!');
        process.exit();
    });
});
