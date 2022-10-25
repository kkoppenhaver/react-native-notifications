const http = require('http');
const express = require('express');
const path = require('path');
const app = express();

const OneSignal = require('onesignal-node');

app.use(express.json());

app.use(express.static("express"));

// default URL for website
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname+'/express/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/notify', function(req,res){
  // Update your APP_ID and API_KEY from OneSignal here
  const client = new OneSignal.Client(APP_ID, API_KEY);

  // This is where we will make our call to OneSignal
  const notification = {
    headings: {
      'en': 'Hello from OneSignal!'
    },
    contents: {
      'en': 'This is a notification triggered from our Node app and pushed into React Native.',
    },
    included_segments: ['Subscribed Users']
  };

  client.createNotification(notification)
  .then(response => {console.log(response)})
  .catch(e => {console.log(e)});

  res.send('Notification request sent to OneSignal.');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);