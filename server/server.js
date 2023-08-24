const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
const myUsersArray = [];
const roomUsers = {};

io.on("connection", (socket) => {
  console.log("New user connected: ", socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
    socket.emit("user_id", socket.id);
    filterRooms(io.sockets.adapter.rooms);
    // socket.emit("whoIs")
    if (!roomUsers[room]) {
      roomUsers[room] = [];
    }
    roomUsers[room].push(socket.id);
    console.log("Alla använder i detta rummet", roomUsers);
    io.to(room).emit("updated_room_users", roomUsers[room]);
  });

  socket.on("leave_room", (room) => {
    if (roomUsers[room]) {
      roomUsers[room] = roomUsers[room].filter(
        (userId) => userId !== socket.id
      );
    }

    socket.leave(room);
    console.log(`User left ${room}`);
    //Is last user?
    filterRooms(io.sockets.adapter.rooms);
  });

  socket.on("write_message", (writeMessage, room) => {
    // console.log(writeMessage); //Bara för att se om meddelandet existerar på servern
    io.to(room).emit("print_message", writeMessage);
  });

  function filterRooms(theSocket) {
    const listOfIDs = Array.from(theSocket.values()).map((set) =>
      Array.from(set)
    );
    for (const socketID of listOfIDs) {
      myUsersArray.push(socketID[0]);
    }
    const setOfUsers = new Set(myUsersArray);
    const uniqueUsersArray = Array.from(setOfUsers);
    let listOfSocketKeys = []; //Tömmer arrayen för varje varv.
    for (const socketKey of theSocket.keys()) {
      listOfSocketKeys.push(socketKey);
    }
    const setOfSocketKeys = new Set(listOfSocketKeys);
    listOfRooms = Array.from(setOfSocketKeys);

    for (const socketID of uniqueUsersArray) {
      const index = listOfRooms.indexOf(socketID);
      if (index > -1) {
        listOfRooms.splice(index, 1);
      }
    }
    console.log("En lista med rum: ", listOfRooms);
    io.emit("rooms_list", listOfRooms);
  }

  // function isLastUserOut(room){
  //     const clients = io.sockets.adapter.rooms.get(room);
  //     if(!clients){
  //         const roomNumber = avaliableRooms.indexOf(room)
  //         if (roomNumber > -1){
  //             console.log("No users left - Deleting room: ", room);
  //             avaliableRooms.splice(roomNumber, 1)
  //             console.log("Tillgängliga rum (del room): ", avaliableRooms);
  //             regenerateRoomsList(avaliableRooms)
  //             // return (avaliableRooms);
  //         }
  //     } else {
  //         console.log("Tillgängliga rum (keep room): ", avaliableRooms);
  //         regenerateRoomsList(avaliableRooms)
  //         // return (avaliableRooms);
  //     }
  // }
});

server.listen(3000, () => console.log("Servern är igång..."));
