const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'mzeQZMwgW6M29jojHQH11ntn1OlnM5qcVxjDTi3ezI6aaPGNKVGjKdI9LH0EpqXNzaVyvDSqG1M1PNL5I147ZYeQCaHOi5zdIcHbEwRg2QO0Hx6qkxoN5XMqcsbu3JQEg0fF1JBZsPjU6a4xESn67AdB04t89/1O/w1cDnyilFU=',
  channelSecret: '83af773491ed930dbdb392c7122db7a2'
};

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

app.listen(3000);