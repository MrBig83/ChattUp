
import Chat from "./Components/Chat/Chat"
import Login from "./Components/Login/Login"
import {useSocket} from "./Context/SocketContext/socketContext"


function App() {

  const { isLoggedIn } = useSocket()

  return (
    <div>
      {isLoggedIn ? <Chat /> : <Login />}
      
    </div>
  )
}

export default App