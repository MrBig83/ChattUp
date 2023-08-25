import { useSocket } from "../../Context/SocketContext/socketContext";
import RoomTemplate from "../Room/RoomTemplate";
import RoomList from "../RoomList/RoomList";
import "./Chat.css"; // Importera CSS-filen


function Chat() {
  const { username, changeRoom, setNewRoomName, newRoomName } = useSocket();

  return (
    <div className="chat-container">
      <header className="header">
        <h1>Chat App</h1>
        <p>Hej, {username}!</p>
      </header>
      <div className="content">
        <div className="room-options">
          <input
            className="new-room-input"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            placeholder="Enter room name"
            type="text"
          />
          <button className="join-button" onClick={() => changeRoom(newRoomName)}>
            Join Room
          </button>
        </div>
        <div className="rooms">
          <RoomTemplate />
          <RoomList />
        </div>
      </div>
    </div>
  );
}

export default Chat;