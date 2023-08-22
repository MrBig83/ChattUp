const express = require("express")
const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors")


const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

app.use(cors());
const connectedUsers = {};
// const rooms = [];
// const uniqeRooms = new Set()
const myArray = []

io.on("connection", (socket) => {
    console.log("New user connected: ", socket.id);

    socket.on("join_room", (room) => {
        socket.join(room);
        socket.emit("user_id", socket.id)
        socket.emit("whoIs")

        console.log("sids");
        // console.log(io.sockets.adapter.rooms)
        console.log(io.sockets.adapter.rooms)

    })

    socket.on("leave_room", (room) => {
        socket.leave(room);
        console.log(`User left ${room}`);

    })

    socket.on("write_message", (writeMessage, room) => { 
        console.log(writeMessage); //Bara för att se om meddelandet existerar på servern 
        io.to(room).emit("print_message", writeMessage);
    })

    socket.on("this_user", (thisUser)=>{
        console.log(thisUser);
    })

});

server.listen(3000, () => 
    console.log("Servern är igång...")
)