import { useState } from "react";
import { useSocket } from "../../Context/SocketContext/socketContext";
import RoomTemplate from "../Room/RoomTemplate";
import RoomList from "../RoomList/RoomList";

function Chat() {
  const { setRoom, username, changeRoom, setCreatedRooms, createdRooms } =
    useSocket();
  const [newRoomName, setNewRoomName] = useState("");

  const handleJoinRoom = (roomName: string) => {
    setRoom(roomName);
    changeRoom(roomName);
  };
  const handleCreateRoom = () => {
    if (newRoomName.trim() !== "") {
      setCreatedRooms((prevRooms) => [...prevRooms, newRoomName]);
      handleJoinRoom(newRoomName);
      setNewRoomName("");
    }
  };

  return (
    <div>
      <p>Welcome to {username}! Please choose a chat room below:</p>

      <input
        type="text"
        value={newRoomName}
        onChange={(e) => setNewRoomName(e.target.value)}
        placeholder="Enter room name"
      />
      <button onClick={() => handleCreateRoom()}>Create and join room</button>
      <button onClick={() => handleJoinRoom("lobby")}>Join Lobby</button>

      <hr />
      <br />

      <RoomList createdRooms={createdRooms} handleJoinRoom={handleJoinRoom} />

      <hr />
      <br />

      <RoomTemplate />
    </div>
  );
}

export default Chat;

// import React, { useState } from "react";
// import { useSocket } from "../../Context/SocketContext/socketContext";
// import RoomTemplate from "../Room/RoomTemplate";
// import RoomList from "../RoomList/RoomList";

// function Chat() {
//   const { setRoom, username, changeRoom } = useSocket();
//   const [newRoomName, setNewRoomName] = useState("");
//   const [createdRooms, setCreatedRooms] = useState<string[]>([]);

//   const handleJoinRoom = (roomName: React.SetStateAction<string>) => {
//     setRoom(roomName);

//     changeRoom(newRoomName);
//   };

//   const handleCreateRoom = () => {
//     if (newRoomName.trim() !== "") {
//       setCreatedRooms((prevRooms) => [...prevRooms, newRoomName]);
//       handleJoinRoom(newRoomName);
//     }
//   };

//   return (
//     <div>
//       <p>Welcome to {username}! Please choose a chat room below:</p>

//       <input
//         type="text"
//         value={newRoomName}
//         onChange={(e) => setNewRoomName(e.target.value)}
//         placeholder="Enter room name"
//       />
//       <button onClick={() => handleCreateRoom()}>Create and join room</button>
//       <button onClick={() => handleJoinRoom("lobby")}>Join Lobby</button>

//       <hr />
//       <br />
//       <div>
//         <h2>Skapade rum:</h2>

//         <ul>
//           {createdRooms.map((roomName) => (
//             <li key={roomName}>
//               <button onClick={() => handleJoinRoom(roomName)}>
//                 Join {roomName}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <hr />
//       <br />

//       <RoomTemplate />
//       <RoomList />
//     </div>
//   );
// }

// export default Chat;
