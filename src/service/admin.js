const client = require("./client");

async function createAdmin() {
  const admin = client.admin();

  admin.connect();
  console.log("Admin connected");

  await admin.createTopics({
    topics: [
      {
        topic: "kucoin-data",
        numPartitions: 1,
      },
    ],
  });

  await admin.disconnect();
}

createAdmin();
