const express = require('express');
const app = express();
const http = require("http");

const ip = require("ip").address()

app.set("ip", ip);

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const session = require("express-session")({
    secret: "secret_key",
    resave: true,
    saveUninitialized: true
});
const sharedsession = require("express-socket.io-session");

app.use(session);

io.use(sharedsession(session, {
    autoSave: true
}));

app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/room/', (req, res) => {
    res.sendFile(__dirname + '/public/room.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("send-room-id", (room_id) => {
        console.log(room_id);
        socket.handshake.session.room_id = room_id;
        socket.handshake.session.save();
    });

    socket.on("join-new-room", () => {
        console.log("Joining room after changing site, " + socket.id);
        socket.join(socket.handshake.session.room_id);

        socket.to(socket.handshake.session.room_id).volatile.emit("new-user-joined");
    });
});

io.on('disconnected', (socket) => {
    console.log('a user disconnected');
});

io.of("/").adapter.on("create-room", (room) => {
    console.log(`room ${room} was created`);
});

io.of('/').adapter.on("join-room", (room, id) => {
    console.log(`Socket ${id} has joined room ${room}`);
});

io.of('/').adapter.on("leave-room", (room, id) => {
    console.log(`Socket ${id} has left room ${room}`);
});

server.listen(8000, () => {
    console.log(`Server is listening on ip ${ip}, on port 8000`);
});
