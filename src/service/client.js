const { Kafka } = require("kafkajs");
const ip = require('ip');

const localhostIPAddress = ip.address();

const client = new Kafka({
  clientId: "kucoin-app",
  brokers: [`${localhostIPAddress}:9092`],
});

module.exports = client;