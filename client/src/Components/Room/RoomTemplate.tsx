import { useEffect, useRef } from "react"
import { useSocket } from "../../Context/SocketContext/socketContext"
import "./RoomTemplateStyle.css"

function RoomTemplate() {

    const {room, writeMessage, setwriteMessage, sendMessage, printMessage, username, leaveRoom} = useSocket()
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
            li.innerText = printMessage;
          }
          chatUlRef.current?.appendChild(li);
        }
      }, [printMessage]);

    

    return (
        <div className="roomTemplate">
            <div className="header">
                <h1>Välkommen till: {room}, {username}</h1>
            </div>

            {room == "lobby" ?<button className="disabledBtn" >Till Lobby</button>:
            <button className="leave-room-btn" onClick={leaveRoom} >Till Lobby</button>}
            {/* <button onClick={() => changeRoom("lobby")} >Lämna rum</button> */}

            <div className="chatWindow">
                <ul className="chatUl" ref={chatUlRef}></ul>
            </div>

            <div className="writeMessage">
                <input className="input" value={writeMessage} onChange={(e) => setwriteMessage(e.target.value)} type="text" />
                <button onClick={sendMessage} >Skicka</button>
            </div>
        </div>
    )
}

export default RoomTemplate