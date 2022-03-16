const socket = io()

const form = document.getElementById("form");

async function joinClientToRoom(event) {

    let room_id = document.getElementById("room_id").value;
    let nickname = document.getElementById("client_name").value;
    if(nickname) {
        if(room_id) {
            socket.emit("send-name-and-roomid-to-server", room_id, nickname);
        } else {
            event.preventDefault();
            await new Promise((resolve, reject) => {
                socket.on('get-rooms-count', (room) => {
                    room_id = `room_${room}`;
                    resolve();
                })
                socket.emit("ask-for-rooms-count")
            })
            .then(() => {
                document.getElementById("room_id").setAttribute('value', room_id);
                socket.emit("send-name-and-roomid-to-server", room_id, nickname);
                form.submit();
            })
        }
    } else {
        alert("You need to input your nickname!");
        event.preventDefault();
    }
}