const https = require('follow-redirects').https;

const options = {
   'method': 'POST',
   'hostname': 'api-futures.kucoin.com',
   'path': '/api/v1/bullet-public',
   'headers': {
   },
   'maxRedirects': 20
};

function getPublicToken() {
  const req = https.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        const body = Buffer.concat(chunks);
        const parsedData = JSON.parse(body);
        return parsedData.data.token;
    });

    res.on("error", function (error) {
        console.error(error);
    });
  });

  req.end();
}

module.exports = getPublicToken;