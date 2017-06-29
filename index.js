require('dotenv').load();

const http = require('http');
const path = require('path');
const express = require('express');
const tokenGenerator = require('./src/token_generator');
var randomstring = require("randomstring");

// Create Express webapp
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
  const identity = request.query.identity || 'identity';
  const room = request.query.room;
  response.send(tokenGenerator(identity, room));
});

app.get('/token', function(request, response) {
    var identity = randomstring.generate();

    const room = request.query.room;

    // Serialize the token to a JWT string and include it in a JSON response
    response.send({
        identity: identity,
        token: tokenGenerator(identity, room)
    });
});

// Create an http server and run it
const server = http.createServer(app);
const port = process.env.PORT || 3001;
server.listen(port, function() {
  console.log('Express server running on *:' + port);
});