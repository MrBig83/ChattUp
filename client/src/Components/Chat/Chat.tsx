import React, { useState } from "react";
import { useSocket } from "../../Context/SocketContext/socketContext";
import RoomTemplate from "../Room/RoomTemplate";

function Chat() {
  const { setRoom, username, changeRoom } = useSocket();
  const [newRoomName, setNewRoomName] = useState("");
  const [createdRooms, setCreatedRooms] = useState<string[]>([]);

  const handleJoinRoom = (roomName: React.SetStateAction<string>) => {
    setRoom(roomName);
    changeRoom("");
  };

  const handleCreateRoom = () => {
    if (newRoomName.trim() !== "") {
      setCreatedRooms((prevRooms) => [...prevRooms, newRoomName]);
      handleJoinRoom(newRoomName);
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
      <div>
        <h2>Skapade rum:</h2>
        <ul>
          {createdRooms.map((roomName) => (
            <li key={roomName}>
              <button onClick={() => handleJoinRoom(roomName)}>
                Join {roomName}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <br />

      <RoomTemplate />
    </div>
  );
}

export default Chat;
