import { useSocket } from "../../Context/SocketContext/socketContext";
import RoomTemplate from "../Room/RoomTemplate";
import RoomList from "../RoomList/RoomList";
import "./Chat.css"; // Importera CSS-filen


function Chat() {
  const { username, changeRoom, setNewRoomName, newRoomName } = useSocket();

  return (
    <div className="chat-container">
      <header className="header">
        <h1 className="title">Chat <span>App</span></h1>
        <br></br>
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