// import { useEffect } from "react"
import { useRef } from "react";
import { useSocket } from "../../Context/SocketContext/socketContext"
// import { io } from "socket.io-client";
// const socket = io()

// import "./RoomListStyle.css"

function RoomList() {
    const {listOfRooms} = useSocket()
    console.log(listOfRooms);
    
    const roomListRef = useRef<HTMLUListElement | null>(null);
    // roomListRef.current?.innerHTML = ("");

    for(const room of listOfRooms){
        //TÖM listan innan man appendar igen!!! ====================================================
        const li = document.createElement("li")
        li.innerText=(room)
        roomListRef.current?.appendChild(li);
    }
    
    return (
        <div className="roomList" >
            <h1>Tillgängliga rum:</h1>
            <ul className="roomlist" ref={roomListRef}></ul>
        </div>
    )
}

export default RoomList