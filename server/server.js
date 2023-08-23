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
const myUsersArray = []
let avaliableRooms = []

io.on("connection", (socket) => {
    console.log("New user connected: ", socket.id);

    socket.on("join_room", (room) => {
        socket.join(room);
        socket.emit("user_id", socket.id)
        socket.emit("rooms_list", avaliableRooms)
        // socket.emit("whoIs")
        const theMap = io.sockets.adapter.rooms
        avaliableRooms = generateRoomList(theMap)
        // console.log(avaliableRooms);
    })

    socket.on("leave_room", (room) => {
        socket.leave(room);
        console.log(`User left ${room}`); 

        const clients = io.sockets.adapter.rooms.get(room);
        if(!clients){
            lastUserOut(room)
        } else {
            console.log("Användare i rummet: ", clients);
        }

    })

    socket.on("write_message", (writeMessage, room) => { 
        // console.log(writeMessage); //Bara för att se om meddelandet existerar på servern   
        io.to(room).emit("print_message", writeMessage);
    })

    function generateRoomList(theMap) {        
        const valuesArray = Array.from(theMap.values()).map(set => Array.from(set));
        for(const test of valuesArray){
            myUsersArray.push(test[0]) 
        }

        const setOfUsers = new Set (myUsersArray)
        const uniqueUsersArray = Array.from(setOfUsers)

        for (const myRoom of theMap.keys()) {
            myArray.push(myRoom)
        }

        const setArray = new Set(myArray)
        uniqueArray = Array.from(setArray)
        
        for(const test of uniqueUsersArray){
            const index = uniqueArray.indexOf(test)
            if (index > -1) {
                uniqueArray.splice(index, 1)
            }
        }

        // console.log("Detta är en array med bara rum:");
        console.log("Gen room list: ", uniqueArray);
        
        return uniqueArray
    }

    function lastUserOut(room){
        const roomNumber = avaliableRooms.indexOf(room)
        console.log("roomNumber", roomNumber);
        
        if (roomNumber > -1){
            avaliableRooms.splice(roomNumber, 1)
        }
        console.log("Tillgängliga rum (del room): ", avaliableRooms);
        return (avaliableRooms);
    
        //Pseudokod!!!
        // uniqueArray.remove(room)  

    }
    // console.log("Rumsfanskap", avaliableRooms);
    // socket.on("this_user", (thisUser)=>{
    //     console.log(thisUser);
    // })

});

server.listen(3000, () => 
    console.log("Servern är igång...")
)