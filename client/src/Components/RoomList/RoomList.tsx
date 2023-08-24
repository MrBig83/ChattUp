// import { useEffect } from "react"
// import { useRef } from "react";
// import { useSocket } from "../../Context/SocketContext/socketContext"
// import { io } from "socket.io-client";
// const socket = io()

import { useSocket } from "../../Context/SocketContext/socketContext";

// import "./RoomListStyle.css"
// interface RoomListProps {
//     listOfRooms: string[];
//     joinRoom: (roomName:string) => void;
// }

// function joinRoom(roomName){
//     console.log(roomName);

// }

function RoomList() {
  const { changeRoom, listOfRooms } = useSocket();
  // const {listOfRooms} = useSocket()
  // console.log(listOfRooms);

  // const roomListRef = useRef<HTMLUListElement | null>(null);
  // roomListRef.current?.innerHTML = ("");

  // for(const room of listOfRooms){
  //     //TÖM listan innan man appendar igen!!! ====================================================
  //     const li = document.createElement("li")
  //     li.innerText=(room)
  //     roomListRef.current?.appendChild(li);
  // }

  return (
    <div className="roomList">
      <h1>Tillgängliga rum:</h1>
      {/* <ul className="roomlist" ref={roomListRef}></ul> */}
      <ul>
        {listOfRooms.map((roomName) => (
          <li key={roomName}>
            <p onClick={() => changeRoom(roomName)}>Join {roomName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomList;
