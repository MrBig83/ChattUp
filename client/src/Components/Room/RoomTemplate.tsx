import { Key, useEffect, useState } from "react";
import { useSocket } from "../../Context/SocketContext/socketContext";
// import { io } from "socket.io-client";
// const socket = io()
import "./RoomTemplateStyle.css";

function RoomTemplate() {
  const {
    room,
    writeMessage,
    setwriteMessage,
    sendMessage,
    printMessage,
    username,
    changeRoom,
  } = useSocket();

  const [messageList, setMessageList] = useState<string[]>([]);

  useEffect(() => {
    if (printMessage) {
      setMessageList((prevList: string[]) => [...prevList, printMessage]);
    }
  }, [printMessage]);

  return (
    <div className="roomTemplate">
      <div className="header">
        <h1>
          Välkommen till: {room}, {username}
        </h1>
      </div>
      <button onClick={() => changeRoom("lobby")}>Lämna rum</button>
      <div className="chatWindow">
        <ul className="chatUl">
          {messageList.map((message: string, index: Key) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
      <div className="writeMessage">
        <input
          className="input"
          value={writeMessage}
          onChange={(e) => setwriteMessage(e.target.value)}
          type="text"
        />
        <button onClick={sendMessage}>Skicka</button>
      </div>
    </div>
  );
}

export default RoomTemplate;
