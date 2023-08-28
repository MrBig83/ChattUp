import { useEffect, useRef } from "react";
import { useSocket } from "../../Context/SocketContext/socketContext";

// import { io } from "socket.io-client"
// const socket = io("http://localhost:3000", {autoConnect: false })

import "./RoomTemplateStyle.css";
function getRandomColor() {
  const colors = ["#FF5733", "#33FF77", "#3377FF", "#FF33A1", "#33FFC1"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

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
  // const chatUl = document.querySelector(".chatUl")

  useEffect(() => {
    if (printMessage) {
      const li = document.createElement("li");
      if (printMessage.startsWith("Här är en GIF:")) {
        const gifUrl = printMessage.replace("Här är en GIF: ", "");
        const img = document.createElement("img");
        img.src = gifUrl;
        img.alt = "GIF";
        li.appendChild(img);
      } else {
        const usernameColor = getRandomColor();
        const usernameSpan = document.createElement("span");
        usernameSpan.className = "username";
        usernameSpan.style.backgroundColor = usernameColor;
        usernameSpan.innerText = `${username}:`;

        const messageSpan = document.createElement("span");
        messageSpan.innerText = printMessage;

        li.appendChild(usernameSpan);
        li.appendChild(messageSpan);
      }
      chatUlRef.current?.appendChild(li);
    }
  }, [printMessage, username]);
  // useEffect(() => {
  //   if (printMessage) {
  //     const li = document.createElement("li");
  //     if (printMessage.startsWith("Här är en GIF:")) {
  //       const gifUrl = printMessage.replace("Här är en GIF: ", "");
  //       const img = document.createElement("img");
  //       img.src = gifUrl;
  //       img.alt = "GIF";
  //       li.appendChild(img);
  //     } else {
  //       const usernameColor = getRandomColor();
  //       const usernameSpan = document.createElement("span");
  //       usernameSpan.className = "username";
  //       usernameSpan.style.backgroundColor = usernameColor;
  //       usernameSpan.innerText = `${printMessage.username}:`;

  //       const messageSpan = document.createElement("span");
  //       messageSpan.innerText = printMessage.message;

  //       li.appendChild(usernameSpan);
  //       li.appendChild(messageSpan);
  //     }
  //     chatUlRef.current?.appendChild(li);
  //   }
  // }, [printMessage, username]);

  useEffect(() => {
    if (chatUlRef.current) {
      chatUlRef.current.innerHTML = ""; // Rensa tidigare meddelanden när rummet ändras
    }
  }, [room]);

  return (
    <div className="roomTemplate">
      <div className="header">
        <h1>
          Välkommen till: {room}, {username}
        </h1>
        {/* <p>{typing}</p> */}
      </div>

      {room == "lobby" ? (
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
        <button onClick={sendMessage}>Skicka</button>
      </div>
    </div>
  );
}

export default RoomTemplate;
