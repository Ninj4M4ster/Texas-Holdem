const countRooms = (rooms) => {
    let counter = 0;
    for(room of rooms) {
        counter ++;
        console.log("dupa");
    }
    return counter;
}

exports.countRooms = countRooms;