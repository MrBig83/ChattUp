// import { useEffect } from "react"
// import { useRef } from "react";
// import { useSocket } from "../../Context/SocketContext/socketContext"
// import { io } from "socket.io-client";
// const socket = io()

import { useSocket } from "../../Context/SocketContext/socketContext"

// import "./RoomListStyle.css"




function RoomList() {
    const { changeRoom, listOfRooms } = useSocket()

    
    return (
        <div className="roomList" >
            <h1>Tillgängliga rum:</h1>
            {/* <ul className="roomlist" ref={roomListRef}></ul> */}
        <ul>
            {listOfRooms.map((roomName) => (
                <li key={roomName}>
                    <p onClick={() => changeRoom(roomName)}>
                      Join {roomName}     
                    </p>
                </li>
            ))}
        </ul>


        </div>
    )
}

export default RoomList