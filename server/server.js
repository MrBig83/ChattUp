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


let translateList = {}
// Håller koll på aktiva rum och deras användare
const activeRooms = new Map();

io.on("connection", (socket) => {
  console.log("New user connected: ", socket.id);
  
    socket.on("register_user", (socket, username) => {
        translateList[socket] = username //Kanske är dum??
        console.log("Translate-listan: ", translateList); //Kanske är dum?
        io.emit("translate_list", translateList)
        // console.log(translateList[socket]);
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

  socket.on("write_message", async (message, room) => {
    if (message.startsWith("/gif")) {
      const searchQuery = message.replace("/gif", "").trim();
  
      try {
        // Anropar Giphy API för att hämta en slumpmässig GIF baserat på sökordet
        const apiKey = "LdZuhft1NpT1pIDauY4C13pYpGXIQCGH";
        const apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${searchQuery}`;
        
        const response = await axios.get(apiUrl);
        const gifUrl = response.data.data.images.original.url;
  
        // Skicka GIF:en till rummet
        io.to(room).emit("print_message", "Här är en GIF: " + gifUrl);
      } catch (error) {
        console.error("Error fetching GIF:", error.message);
        io.to(room).emit("print_message", "Kunde inte hämta GIF: " + searchQuery);
      }
    } else {
      // Skicka vanligt meddelande
      io.to(room).emit("print_message", message);

    }
  });


  socket.on("typing", (username, room) => {
    // console.log(`${username} is typing in ${room}`);
    
    io.emit("user_is_typing", username, room)
  })

  socket.on("write_message", (writeMessage, room) => {
    io.to(room).emit("print_message", writeMessage);

  });

  function updateRoomsList() {
    const availableRooms = Array.from(activeRooms.keys());
    io.emit("rooms_list", availableRooms);
  }
});

server.listen(3000, () => console.log("Server is running..."));