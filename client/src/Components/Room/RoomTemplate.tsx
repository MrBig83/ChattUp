import { useEffect, useRef } from "react"
import { useSocket } from "../../Context/SocketContext/socketContext"

// import { io } from "socket.io-client"
// const socket = io("http://localhost:3000", {autoConnect: false })

import "./RoomTemplateStyle.css"

function RoomTemplate() {

    const {room, writeMessage, setwriteMessage, sendMessage, printMessage, username, leaveRoom} = useSocket()
    const chatUlRef = useRef<HTMLUListElement | null>(null);
    // const chatUl = document.querySelector(".chatUl")
    
    
    useEffect(() => {
        if(printMessage){
            const li = document.createElement("li")
            li.innerText=(printMessage)
            chatUlRef.current?.appendChild(li);
        }
    }, [printMessage])



    

    return (
        <div className="roomTemplate">
            <div className="header">
                <h1>Välkommen till: {room}, {username}</h1>
                {/* <p>{typing}</p> */}
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