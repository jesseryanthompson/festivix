var ws = require('websocket'),
    http = require('http');

var WebSocketClient = require('websocket').client;

var wsClient = new WebSocketClient();
var connection = null;

var server = ws.server,
    clients = [],
    socket;

socket = new server({
    maxReceivedFrameSize:10000000,
    maxReceivedMessageSize:10000000,
    httpServer: http.createServer().listen(1337)
});

var Twitter = require('twitter');

var twitterClient = new Twitter({
    consumer_key: '3NSkvvVP6iQAjoTfWHLH2Wo9Z',
    consumer_secret: '7tyQjkGoE5crEBylrq01SlsApMA5t7nCCWDShg5W3lqqHv88Pc',
    access_token_key: '4306468393-9JEXyOECvYMdWbvOBnLyeajHbJtCoBUQSqUrIfF',
    access_token_secret: '0EEGzJz16QmNdyDMm6GpEVv4MNSyeE3pWJnLvQqJruVNg'
});

var tweets = [];sen
var params = {};
var currentTweet;

twitterClient.stream('statuses/filter', {track: 'hello'}, function(stream) {
    stream.on('data', function(tweet) {
        // put it in a queue
        tweets.push(tweet);
    });

    stream.on('error', function(error) {
        throw error;
    });
});

setInterval(function() {

    if (tweets[0]) {
        currentTweet = tweets[0];

        tweets.splice(0, 1);

        sendMsg({
            tweet: currentTweet
        });

        // send a ws message to clients
        // run saw
    }

}, 2000);

socket.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    var id = '"' + guid() + '"';

    var newClient = {
        id: id,
        connection: connection,
        type: 'user',
        ready: false
    };

    clients.push(newClient);

    connection.send(JSON.stringify({"type": "register", "user":{"id": newClient.id}}));

    connection.on('message', handleMessage);

    connection.on('close', function(connection) {
        console.log('connection closed for client', id);
        removeClient(id);
    });
});

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function getClient(id) {
    for(var i = 0;i < clients.length;i++) {
        if(clients[i].id == id) {
            return clients[i];
        }
    }
}

function removeClient(id) {
    for(var i = 0;i < clients.length;i++) {
        if(clients[i].id == id) {
            clients.splice(clients.indexOf(clients[i]),1);
            return;
        }
    }
}

function broadcastMsg(data) {
    for(var i = 0;i < clients.length;i++) {
        clients[i].connection.sendUTF(JSON.stringify(data));
    };
}
fkF
function handleMessage() {

}