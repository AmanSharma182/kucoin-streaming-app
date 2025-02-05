const WebSocket = require('ws');

function refreshConnection(ws) {
  if (ws.readyState === WebSocket.OPEN) {
      const pingMessage = {
        id: "1545910590801",
        type: "ping"
      };
      ws.send(JSON.stringify(pingMessage));
      console.log("Sent:", pingMessage);
  } else {
      console.log("WebSocket not open. Unable to send ping.");
  }
}

module.exports = refreshConnection;