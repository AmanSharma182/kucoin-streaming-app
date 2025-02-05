const { WebSocket } = require("ws");
const client = require("./src/service/client");
const dotenv = require('dotenv'); 
const { Partitioners } = require("kafkajs");
const getPublicToken = require("./src/utils/getPublicToken");
const refreshConnection = require("./src/utils/refreshConnection");

// Set path to .env file 
dotenv.config({ path: './.env' });

// please wait... getPublicToken need some time to get the token
// if it doesn't get the token, token from env will be used
const token = process.env.KUCOIN_TOKEN || getPublicToken();
const kucoinUrl = process.env.KUCOIN_PUBLIC_WEBSOCKET_URL;

// created a producer client
const producer = client.producer({ createPartitioner: Partitioners.LegacyPartitioner });
producer.connect();

// created a websocket connection to KuCoin
function connectWebSocket() {
    console.log("token", token);
    const ws = new WebSocket(`${kucoinUrl}?token=${token}&connectId=${18298}`);

    ws.on('open', () => {
        console.log('WebSocket connected to KuCoin');
        ws.send(JSON.stringify({
            type: 'subscribe',
            topic: `/market/ticker:BTC-USDT`,
            response: true,
        }));

        setInterval(() => refreshConnection(ws), 18000);
    });

    ws.on('message', async (data) => {
        await producer.send({
            topic: "kucoin-data",
            messages: [{
              key: "trading-data",
              value: data
            }]
          })
    });

    ws.on('error', (err) => console.error('WebSocket error:', err));

    ws.on('close', () => {
        console.log('WebSocket closed. Reconnecting...');
        setTimeout(() => connectWebSocket(), 3000);
    });
}

connectWebSocket();