// import { useEffect } from "react"
// import { useSocket } from "../../Context/SocketContext/socketContext"
// import { io } from "socket.io-client";
// const socket = io()

// import "./RoomListStyle.css"

function RoomList() {
    // const {userId, uniqueRooms} = useSocket()

    
    // for (const room of uniqueRooms){
    //     console.log(room);
        
    // }


    // const whoAmI = userId
    // console.log(whoAmI);
    
    // useEffect(() => {
    //     socket.emit("give_rooms", (ans:unknown)=>{
    //         const rooms = ans;
    //         console.log(rooms);
            
    //     })
    //     console.log("Asked for rooms list...");
        
    // }, [])
    // socket.on("give_rooms", (ans)=>{
    //     console.log(ans);
        
    // }) 

    // const {room} = useSocket()
    // console.log("socket");

    
    
    
    

    return (
        <div className="roomList">
            <h1>Tillgängliga rum:</h1>
            
        </div>
    )
}

export default RoomList