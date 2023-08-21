import { useSocket } from "../../Context/SocketContext/socketContext"
import RoomTemplate from "../Room/RoomTemplate"

function Chat() {

    const { setRoom, username, room } = useSocket()
  return (
    <div>
        <p>Welcome to {room},  {username}! Please choose a chat room below:</p> 
        <button onClick={() => setRoom("123")} >Joina rum 123</button>
        <button onClick={() => setRoom("456")} >Joina rum 456</button>
        <hr/>
        <br/>
        <RoomTemplate />
    </div>
  )
}

export default Chat