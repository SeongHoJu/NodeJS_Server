var WebSocketServerPort = 8080;

var WebSocketServer = require('websocket').server;
var http = require('http');
var Clients = [];
var ChatHistory = [];

var uuid = require('uuid');

var server = http.createServer(function(request, response) { });
server.listen(WebSocketServerPort, function () {
    console.log((new Date()) + ' Listening Port ' + WebSocketServerPort);
});

var WebServer = new WebSocketServer({
    httpServer : server
});

WebServer.on('request', function (request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
    
    var connection = request.accept('connection', request.origin);
    console.log((new Date()) + ' Connection is Accepted ');
    
    Clients.push(connection);
    
    connection.on('message', function (message) {
        if (message.type === 'utf8') { // accept only text
            
            var Packet = JSON.parse(message.utf8Data);

            if (Packet.Protocol == 'request_login') {
                var ReturnPacket = { "Protocol": Packet.Protocol, "Packets": [Packet.Packets[0],uuid.v1()] };  // request_login:protocol/userid:Pakcet[0]/usernumber:Pakcet[1]
                var JsonPacket = JSON.stringify(ReturnPacket);
                connection.sendUTF(JsonPacket);
            }

            else if (Packet.Protocol == 'request_chat') {
                var ReturnPacket = { "Protocol": Packet.Protocol, "Packets": [Packet.Packets[0],Packet.Packets[1]] };  // request_chat:protocol/userid:Packet[0]/ChatData:Packet[1]
                var JsonPacket = JSON.stringify(ReturnPacket);
                BroadCastAllClients(JsonPacket);
            }
        }
    });
    
    connection.on('close', function (connection) {
        console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
    });
});


function BroadCastAllClients(BroadcastMessage) {
    for (var ClientIdx = 0; ClientIdx < Clients.length; ClientIdx++) {
        Clients[ClientIdx].sendUTF(BroadcastMessage);
    }
}