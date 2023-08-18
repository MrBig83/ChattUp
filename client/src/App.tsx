
import Chat from "./Chat"
import Login from "./Login"
import {useSocket} from "./socketContext"


function App() {

  const { isLoggedIn } = useSocket()

  return (
    <div>
      {isLoggedIn ? <Chat /> : <Login />}
      
    </div>
  )
}

export default App