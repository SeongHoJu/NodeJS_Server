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

// Mongo DB ------------------------------------------ Begin ------------------------------------------ 
var mongoose = require('mongoose');

var DBConnectionAddress = 'mongodb://localhost/Database';
mongoose.connect(DBConnectionAddress);

var DB = mongoose.connection;
DB.on('error', console.error.bind(console, 'connection error:'));
DB.once('open', function callback() {
    console.log('connection Success to DB :' + DBConnectionAddress);
});

var userSchema = mongoose.Schema({ userid: 'string', password: 'string' });
var user = mongoose.model('user', userSchema);

var userlist = [];
userlist.push(new user({ userid: 'smap8711', password:'password_1' }));
userlist.push(new user({ userid: 'junno1', password: 'password_2' }));
userlist.push(new user({ userid: 'sshioi', password: 'password_3' }));

for (var userindex in userlist) {
    var DBUser = userlist[userindex];
    DBUser.save(function (err, DBUser) {
        if (err)
            console.log(DBUser.userid + ' push db is failed');
    });
};

// Mongo DB ------------------------------------------- End ------------------------------------------- 

function UserValidCheck(Client_UserID, Client_Password)
{
    user.find({ userid: Client_UserID, password: Client_Password }, function(err, ValidUser) {
        if (err) { // Send an Login Fail Protocol
            console.log('User Id is not Exist or Password is wrong');
            return null;
        }

        return ValidUser;
    });

    return null;
}


WebServer.on('request', function (request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
    
    var connection = request.accept('connection', request.origin);
    console.log((new Date()) + ' Connection is Accepted ');
    
    Clients.push(connection);
    
    connection.on('message', function (message) {
        if (message.type === 'utf8') { // accept only text
            
            var Packet = JSON.parse(message.utf8Data);

            if (Packet.Protocol == 'request_login') {   // request_login:protocol/userid:Packet[0]/password:Packet[1]
                
                var UserID = Packet.Packets[0]; 
                var Password = Packet.Packets[1];

                var UserObject = UserValidCheck(UserID, Password);
                
                var UserNumber;
                if (UserObject != null)
                    UserNumber = uuid.v1();
                else UserNumber = 'Login Failed';
                        
                var ReturnPacket = { "Protocol": Packet.Protocol, "Packets": [Packet.Packets[0], UserNumber] };  // request_login:protocol/userid:Pakcet[0]/usernumber:Pakcet[1]
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