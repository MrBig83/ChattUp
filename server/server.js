const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

let translateList = {};
const activeRooms = new Map();

io.on("connection", (socket) => {
  socket.on("register_user", (socket, username) => {
    translateList[socket] = username; 
    io.emit("translate_list", translateList);
  });

  socket.on("join_room", (room) => {
    socket.emit("user_id", socket.id);
    socket.join(room);

    if (!activeRooms.has(room)) {
      activeRooms.set(room, new Set());
    }

    activeRooms.get(room).add(socket.id);
    updateRoomsList();
    updateUsersList(); 
  });

  socket.on("leave_room", (room) => {
    socket.leave(room);

    if (activeRooms.has(room)) {
      activeRooms.get(room).delete(socket.id);
      if (activeRooms.get(room).size === 0 && room !== "lobby") {
        activeRooms.delete(room);
      }
    }

    if (!activeRooms.has("lobby")) {
      activeRooms.set("lobby", new Set()); 
    }

    updateRoomsList();
    updateUsersList(); 
  });

  const updateUsersList = () => {
    const usersByRoom = {};
    activeRooms.forEach((users, room) => {
      usersByRoom[room] = Array.from(users);
    });
    io.emit("users_list", usersByRoom);
  };

  socket.on("write_message", async (message, room) => {
    if (message.startsWith("/gif")) {
      const searchQuery = message.replace("/gif", "").trim();

      try {
        const apiKey = "LdZuhft1NpT1pIDauY4C13pYpGXIQCGH";
        const apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${searchQuery}`;

        const response = await axios.get(apiUrl);
        const gifUrl = response.data.data.images.original.url;

        io.to(room).emit("print_message", "Här är en GIF: " + gifUrl);
      } catch (error) {
        console.error("Error fetching GIF:", error.message);
        io.to(room).emit(
          "print_message",
          "Kunde inte hämta GIF: " + searchQuery
        );
      }
    } else {
      io.to(room).emit("print_message", message);
    }
  });

  socket.on("typing", (username, room) => {
    io.emit("user_is_typing", username, room);
  });

  socket.on("write_message", (writeMessage, room) => {
    const gifMessage = writeMessage.replace("/gif", "").trim();
    io.to(room).emit("print_message", gifMessage);
  });

  function updateRoomsList() {
    const availableRooms = Array.from(activeRooms.keys());
    io.emit("rooms_list", availableRooms);
  }
});

server.listen(3000, () => console.log("Server is running..."));
