const socket = io()

let form = document.getElementById("form");
let room_id = form.room_id.value;

function joinClientToRoom() {
    let room_id = document.getElementById("room_id").value;
    socket.emit("send-room-id", room_id);
}