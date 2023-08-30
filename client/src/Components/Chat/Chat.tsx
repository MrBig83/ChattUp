import { useSocket } from "../../Context/SocketContext/socketContext";
import RoomTemplate from "../Room/RoomTemplate";
import RoomList from "../RoomList/RoomList";
import "./Chat.css"; // Importera CSS-filen

function Chat() {
  const { username, changeRoom, setNewRoomName, newRoomName } = useSocket();

  return (
    <div className="chat-container">
      <header className="header">
        <img className="logo" src="/public/chatup_logo.png"></img>
        <p className="helloUser">Hej, {username}!</p>
      </header>
      <div className="content">
        <div className="room-options">
          <input
            className="new-room-input"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            placeholder=""
            type="text"
          />
          <button
            className="join-button"
            onClick={() => changeRoom(newRoomName)}
          >
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
