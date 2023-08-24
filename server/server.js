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

//TESTAR GENOM ATT SKAPA KLASSER
//CLASS USER
class User {
  constructor(id, username) {
    this.id = id;
    this.username = username;
    this.room = [];
  }
}
//CLASS ROOM
class Room {
  constructor(name) {
    this.name = name;
    this.users = [];
  }

  isEmpty() {
    return this.users.length === 0;
  }
}
const users = {};
const rooms = {};
const createdRooms = [];

io.on("connection", (socket) => {
  console.log("New user connected: ", socket.id);

  // Logga ut rummen med inputtade värdet
  socket.on("log_rooms", (inputValue) => {
    console.log(`Logging rooms with input value: ${inputValue}`);
    for (const roomInstance of createdRooms) {
      console.log(`Room: ${roomInstance.name}`);
      for (const userId of roomInstance.users) {
        const user = users[userId];
        if (user) {
          console.log(`  User: ${user.username}`);
        }
      }
    }
  });

  // Logga ut listan med användare
  socket.on("log_users", () => {
    for (const roomInstance of createdRooms) {
      console.log(`Room: ${roomInstance.name}`);
      for (const userId of roomInstance.users) {
        const user = users[userId];
        if (user) {
          console.log(`  User: ${user.username}`);
        }
      }
    }
  });

  socket.emit("createdRooms", createdRooms);
  //Skapa en ny användare för att spara denna
  socket.on("new_user_joined_chat", (username) => {
    const user = new User(socket.id, username);
    User.push(username);
    users[socket.id] = user;
    socket.join(username);
    console.log(user);
  });
  socket.on("log_rooms", () => {
    const roomInfoArray = [];

    for (const roomInstance of createdRooms) {
      const roomInfo = {
        roomName: roomInstance.name,
        users: [],
      };

      for (const userId of roomInstance.users) {
        const user = users[userId];
        if (user) {
          roomInfo.users.push(user.username);
        }
      }

      roomInfoArray.push(roomInfo);
    }

    console.log(roomInfoArray);
  });
  //Gå med i rum gammla
  // socket.on("join_room", (room) => {
  //   socket.join(room);
  //   console.log(io.sockets.adapter.rooms);
  // });
  // nya

  socket.on("join_room", (room) => {
    socket.join(room);

    // Find the corresponding room instance and add the user to it
    const roomInstance = createdRooms.find((r) => r.name === room);
    if (roomInstance) {
      roomInstance.users.push(socket.id);
    }

    console.log(io.sockets.adapter.rooms);
  });
  // Skapa rum===GAMMLA
  // socket.on("create_room", (newRoom) => {
  //   socket.join(newRoom);
  //   console.log(io.sockets.adapter.rooms);
  // });

  //NYA
  socket.on("create_room", (roomName) => {
    const newRoom = new Room(roomName);
    createdRooms.push(newRoom);
    io.emit("roomCreated", roomName);
    io.emit("createdRooms", createdRooms);
    io.emit("list_of_rooms", io.sockets.adapter.rooms);
    console.log(roomName);
    console.log(createdRooms);
  });
  //Lämna rum ==GAMMLA KODEN
  // socket.on("leave_room", (room) => {
  //   socket.leave(room);
  //   console.log(socket.rooms);
  //   console.log(`User left ${room}`);
  //   console.log(io.sockets.adapter.rooms);
  // });
  //Lämna rum nya
  socket.on("leave_room", (room) => {
    if (users[socket.id]) {
      const user = users[socket.id];
      const userRoom = user.room;

      if (rooms[userRoom]) {
        rooms[userRoom].users = rooms[userRoom].users.filter(
          (u) => u.id !== socket.id
        );

        if (rooms[userRoom].isEmpty()) {
          delete rooms[userRoom];
        }
      }
      user.room = null;

      socket.leave(userRoom);
      console.log(socket.rooms);
      console.log(`User left ${userRoom}`);
      console.log(io.sockets.adapter.rooms);
    }
  });
  //Skriva meddelande
  socket.on("write_message", (writeMessage, room) => {
    console.log(writeMessage); //Bara för att se om meddelandet existerar på servern

    // callback(writeMessage);
    io.to(room).emit("print_message", writeMessage);
  });
  socket.on("new_user_joined_chatm", (username) => {
    socket.join(username);
    console.log(username);
  });
  //SKicka ut en lista på alla rum
  socket.emit("createdRooms", Room);
  console.log(rooms);

  //Skapa nya tum
  socket.on("create_room", (roomName) => {
    const newRoom = new Room(roomName);
    createdRooms.push(newRoom);

    // io.emit("roomCreated", roomName);
    // io.emit("createdRooms", createdRooms);
    io.emit("list_of_rooms", createdRooms);
    console.log(roomName);
    console.log("Updated createdRooms:", createdRooms);
  });
  socket.to("roomCreated").emit("join_room");
});

server.listen(3000, () => console.log("Servern är igång..."));
