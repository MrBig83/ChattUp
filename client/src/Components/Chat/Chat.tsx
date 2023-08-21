// import { Routes } from "react-router"
import { useSocket } from "../../Context/SocketContext/socketContext"

import RoomTemplate from "../Room/RoomTemplate"
import RoomList from "../RoomList/RoomList"

function Chat() {

    const { username, room, changeRoom, setNewRoomName, newRoomName } = useSocket()

  return (
    <div>
        <p>Welcome to {room},  {username}! Please choose a chat room below:</p> 
        <input className="newRoomName" value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)} type="text" />
        <button onClick={() => changeRoom(newRoomName)} >Joina</button>

        {/* <button onClick={() => changeRoom("123")} >Joina rum 123</button> */}
        {/* <button onClick={() => setRoom("456")} >Joina rum 456</button> */}
        
        <hr/>
        <br/>
        
          <RoomTemplate />
          <RoomList />
        
    </div>
  )
}

export default Chat