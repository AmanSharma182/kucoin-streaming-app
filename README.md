# KuCoin Streaming App

## PREREQUISITES
You should have Node.js version > 18, Docker and Docker Compose installed in your computer.

## Installation
Open the terminal and navigate to the app folder.

Install the dependencies.

```sh
npm install
```

Once dependencies are installed, run the following command:
This will start a container at the 2181 port.
```sh
docker run -p 2181:2181 zookeeper
```

##### Open new terminal and follow next steps.
Once the zookeeper container up and running, run the following commands all together.
This will start a container at the 9092.

##### Make sure to replace the <LOCALHOST_IP> with your ip address.
```sh
docker run -p 9092:9092 \
-e KAFKA_ZOOKEEPER_CONNECT=<LOCALHOST_IP>:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<LOCALHOST_IP>:9092 \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
confluentinc/cp-kafka
```

##### Open new terminal and follow next steps.
Once both container are up and running, run the following command.
This will start the consumer client in kafka
```sh
npm run start:consumer
```

##### Open new terminal and follow next steps
This will start the Node.js app to get the data from KuCoin.com
##### Please wait... It need some time to get the new public token. If it doesn't get the token, token from .env will be used
```sh
npm run start
```
Once your app starts, open the terminal in which you started the consumer.
##### You will see the trading data in the console for BTC-USDT.

If your token is expired and you get an error! Please get new public token from [here](https://www.kucoin.com/docs-new/websocket-api/base-info/get-public-token-spot-margin).
Open the .env file and replace the token of the KUCOIN_TOKEN variable and re-run the above command.
You should have the app running!
