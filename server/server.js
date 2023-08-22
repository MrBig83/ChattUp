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
const connectedUsers = {};
const rooms = {};
const createdRooms = [];
io.on("connection", (socket) => {
  console.log("New user connected: ", socket.id);
  //Gå med i rum
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(io.sockets.adapter.rooms);
  });
  // Skapa rum
  socket.on("create_room", (newRoom) => {
    socket.join(newRoom);
    console.log(io.sockets.adapter.rooms);
  });
  //Lämna rum
  socket.on("leave_room", (room) => {
    socket.leave(room);
    console.log(socket.rooms);
    console.log(`User left ${room}`);
    console.log(io.sockets.adapter.rooms);
  });
  //Skriva meddelande
  socket.on("write_message", (writeMessage, room) => {
    console.log(writeMessage); //Bara för att se om meddelandet existerar på servern

    //callback(writeMessage);
    io.to(room).emit("print_message", writeMessage);
  });
  socket.on("new_user_joined_chatm", (username) => {
    socket.join(username);
    console.log(username);
  });
  //SKicka ut en lista på alla rum
  socket.emit("createdRooms", createdRooms);
  //Skapa nya tum
  // socket.on("create_room", (roomName) => {
  //   createdRooms.push(roomName);
  //   io.emit("roomCreated", roomName);
  //   console.log(roomName);
  // });
});

server.listen(3000, () => console.log("Servern är igång..."));
