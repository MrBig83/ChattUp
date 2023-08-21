import { useEffect } from "react"
import { useSocket } from "../../Context/SocketContext/socketContext"
// import { io } from "socket.io-client";
// const socket = io()
import "./RoomTemplateStyle.css"
const chatUl = document.querySelector(".chatUl")

function RoomTemplate() {

    const {room, writeMessage, setwriteMessage, sendMessage, printMessage, username} = useSocket()

    //Kan man ha två useeffect? - Japp
    // useEffect(() => {
    //     console.log(
    //         "OJ, vilken överraskning!"
    //     );
    // }, [])     

    useEffect(() => {
        if(printMessage){
            const li = document.createElement("li")
            li.innerText=(printMessage)
            chatUl?.appendChild(li)
        }
    }, [printMessage])  

    return (
        <div className="roomTemplate">
            <div className="header">
                <h1>Välkommen till: {room}, {username}</h1>
            </div>
            <div className="chatWindow">
                {/* <p>{printMessage}</p> */} 

                <ul className="chatUl"></ul>
                
            </div>
            <div className="writeMessage">
                <input className="input" value={writeMessage} onChange={(e) => setwriteMessage(e.target.value)} type="text" />
                <button onClick={sendMessage} >Skicka</button>
            </div>
        </div>
    )
}

export default RoomTemplate