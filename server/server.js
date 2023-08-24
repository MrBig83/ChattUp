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

// Håller koll på aktiva rum och deras användare
const activeRooms = new Map();

io.on("connection", (socket) => {
  console.log("New user connected: ", socket.id);

  socket.on("log_rooms", (inputValue) => {
    console.log(`Logging rooms with input value: ${inputValue}`);
  })



  socket.on("join_room", (room) => {
    socket.emit("user_id", socket.id)
    console.log(`User ${socket.id} joining room ${room}`);
    socket.join(room);

    if (!activeRooms.has(room)) {
      console.log(`Creating new set of users for room: ${room}`);
      activeRooms.set(room, new Set());
    }

    activeRooms.get(room).add(socket.id);
    console.log("Active rooms after joining:", activeRooms);
    updateRoomsList();
    updateUsersList(); // Utlösa uppdatering av användarlistan
  });

  socket.on("leave_room", (room) => {
    console.log(`User ${socket.id} leaving room ${room}`);
    socket.leave(room);

    if (activeRooms.has(room)) {
      activeRooms.get(room).delete(socket.id);
      if (activeRooms.get(room).size === 0) {
        activeRooms.delete(room);
        console.log(`Removing empty room: ${room}`);
      }
    }

    console.log("Active rooms after leaving:", activeRooms);
    updateRoomsList();
    updateUsersList(); // Utlösa uppdatering av användarlistan
  });

  // Funktion för att uppdatera användarlistan i rummen
  const updateUsersList = () => {
    const usersByRoom = {};
    activeRooms.forEach((users, room) => {
      usersByRoom[room] = Array.from(users);
    });
    console.log("Updated usersByRoom:", usersByRoom);
    io.emit("users_list", usersByRoom);
  };

  socket.on("write_message", (writeMessage, room) => {
    io.to(room).emit("print_message", writeMessage);
  });

  function updateRoomsList() {
    const availableRooms = Array.from(activeRooms.keys());
    io.emit("rooms_list", availableRooms);
  }
});

server.listen(3000, () => console.log("Server is running..."));
