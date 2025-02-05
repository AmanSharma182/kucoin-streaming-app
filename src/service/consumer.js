const client = require("./client");

async function createConsumer() {
  const consumer = client.consumer({ groupId: 'kucoin-group' });
  await consumer.connect();
  await consumer.subscribe({ topic: "kucoin-data", fromBeginning: true });
  await consumer.run({
      eachMessage: async ({ message }) => {
          const tradeData = message.value.toString();
          console.log('Consumed:', JSON.parse(tradeData));
      }
  });
}

createConsumer();