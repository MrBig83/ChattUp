import { useSocket } from "../../Context/SocketContext/socketContext"

function Chat() {

    const { setRoom, username } = useSocket()
  return (
    <div>
        <p>Welcome {username}! Please choose a chat room below:</p> 
        <button onClick={() => setRoom("123")} >Joina rum 123</button>
        <button onClick={() => setRoom("456")} >Joina rum 456</button>
    </div>
  )
}

export default Chat