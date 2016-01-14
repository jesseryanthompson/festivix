'use strict';

var Websocket = require('websocket');
var HTTP = require('http');
var clients = [];

class SocketManager {
  constructor(options) {
    this.clients = [];

    this.server = new Websocket.server({
        httpServer: HTTP.createServer().listen(1337)
    });

    this.server.on('request', this.onRequest.bind(this));
  }

  onRequest(request) {
    var self = this,
      connection = request.accept(null, request.origin),
      id = '"' + this.getClientID() + '"',
      newClient = {
        id: id,
        connection: connection,
        type: 'user',
        ready: false
    };

    this.clients.push(newClient);

    connection.send(JSON.stringify({
      "type": "register", "user": {
        "id": newClient.id
      }
    }));

    connection.on('close', function(connection) {
        console.log('connection closed for client', id);
        self.removeClientByID(id);
    });
  }

  getClientID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
  }

  getClientByID(id) {
    for(var i = 0;i < clients.length;i++) {
        if(clients[i].id === id) {
          return clients[i];
        }
    };
  }

  removeClientByID(id) {
      for(var i = 0;i < this.clients.length;i++) {
          if(this.clients[i].id == id) {
              this.clients.splice(this.clients.indexOf(this.clients[i]),1);
              return;
          }
      }
  }

  send(data, clientID) {
    var client = this.getClientByID(clientID);

    if(client) {
      client.connection.sendUTF(JSON.stringify(data));
    }
  }

  broadcast(data) {
      for(var i = 0;i < this.clients.length;i++) {
          this.clients[i].connection.sendUTF(JSON.stringify(data));
      };
  }

  handleMessage() {

  }
}

module.exports = SocketManager;
