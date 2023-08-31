import { useSocket } from "../../Context/SocketContext/socketContext";
import RoomTemplate from "../Room/RoomTemplate";
import RoomList from "../RoomList/RoomList";
import "./Chat.css";

function Chat() {
  const { changeRoom, setNewRoomName, newRoomName } = useSocket();

  return (
    <div className="chat-container">
      <img className="logo" src="/src/assets/chatup_logo.png"></img>
      <div className="content">
        <div className="room-options">
          <input
            className="new-room-input"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            placeholder=""
            type="text"
          />
          {newRoomName ? (
            <button
              className="join-button"
              onClick={() => changeRoom(newRoomName)}
            >
              Join Room
            </button>
          ) : (
            <button className="join-button">Join Room</button>
          )}
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
