const app = require("express")();
const http = require("http");

const ip = require("ip").address()

app.set("ip", ip);

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/join_room', (req, res) => {
    // let client_name = req.body.client_name;
    // let room_id = rq.body.client_name;
    res.sendFile(__dirname + '/public/room.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(8000, () => {
    console.log('Server is listening on port 8000');
});
