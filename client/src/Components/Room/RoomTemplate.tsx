import { useEffect, useRef } from "react";
import { useSocket } from "../../Context/SocketContext/socketContext";

import "./RoomTemplateStyle.css";

function RoomTemplate() {
  const {
    room,
    writeMessage,
    setwriteMessage,
    sendMessage,
    printMessage,
    username,
    leaveRoom,
  } = useSocket();
  const chatUlRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (printMessage) {
      const li = document.createElement("li");
      const messageContainer = document.createElement("div");

      if (printMessage.startsWith("Här är en GIF:")) {
        const gifUrl = printMessage.replace("Här är en GIF: ", "");
        const img = document.createElement("img");
        img.src = gifUrl;
        img.alt = "GIF";
        li.appendChild(img);
      } else {
        messageContainer.innerText = printMessage;
      }

      // const chatWindow = chatUlRef.current; if (chatWindow) { // Rulla ner till det senaste meddelandet 
      //   chatWindow.scrollTop = chatWindow.scrollHeight; }

      messageContainer.className = printMessage.startsWith(username + ":")
        ? "sentMessage"
        : "receivedMessage";

      li.appendChild(messageContainer);

      chatUlRef.current?.appendChild(li);
    }
  }, [printMessage, username]);

  useEffect(() => {
    if (chatUlRef.current) {
      chatUlRef.current.innerHTML = "";
    }
  }, [room]);

  // useEffect(() => { 
  //   const chatWindow = chatUlRef.current; if (chatWindow) { // Rulla ner till det senaste meddelandet 
  //     chatWindow.scrollTop = chatWindow.scrollHeight; 
  //   } }, [printMessage]);

  return (
    <div className="roomTemplate">
      <div className="header">
        <h1>
          Välkommen till: {room}, {username}
        </h1>
        {/* <p>{typing}</p> */}
      </div>
      {room == "Lobby" ? (
        <button className="disabledBtn">Till Lobby</button>
      ) : (
        <button className="leave-room-btn" onClick={leaveRoom}>
          Till Lobby
        </button>
      )}
      {/* <button onClick={() => changeRoom("lobby")} >Lämna rum</button> */}

      <div className="chatWindow">
        <ul className="chatUl" ref={chatUlRef}></ul>
      </div>

      <div className="writeMessage">
        <input
          className="input"
          value={writeMessage}
          onChange={(e) => setwriteMessage(e.target.value)}
          type="text"
        />
        {writeMessage != ""? (
        <button onClick={sendMessage}>Skicka</button>) : (
        <button>Skicka</button> )}
      </div>
    </div>
  );
}

export default RoomTemplate;
