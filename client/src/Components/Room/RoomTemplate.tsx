import { useSocket } from "../../Context/SocketContext/socketContext"
import "./RoomTemplateStyle.css"

function RoomTemplate() {

    const {room} = useSocket()

    return (
        <div className="roomTemplate">
            <div className="header">
                <h1>Detta är RoomTemplate <br />Välkommen till: {room}</h1>
            </div>
            <div className="chatWindow">

            </div>
            <div className="writeMessage">
                <input type="text" />
                <button>Skicka</button>
            </div>
        </div>
    )
}

export default RoomTemplate