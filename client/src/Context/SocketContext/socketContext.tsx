import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import { io } from "socket.io-client"

interface ISocketContext {
    isLoggedIn: boolean
    username: string
    room: string
    writtenMessage: string
    setRoom: React.Dispatch<React.SetStateAction<string>>
    setUsername: React.Dispatch<React.SetStateAction<string>>
    setWrittenMessage: React.Dispatch<React.SetStateAction<string>>
    login: () => void

}

const defaultValues = {
    isLoggedIn: false, 
    username: "",
    room: "",
    writtenMessage: "",
    setRoom: () => {},
    setUsername: () => {},
    login: () => {},
    setWrittenMessage: () => {}
}

const SocketContext = createContext<ISocketContext>(defaultValues)
// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => useContext(SocketContext)

const socket = io("http://localhost:3000", {autoConnect: false })

const SocketProvider = ({children}: PropsWithChildren) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [writtenMessage, setWrittenMessage] = useState("");

    useEffect(() => {
        if(room){
            socket.emit("join_room", room)
        }
    }, [room])

    const login = () => {
        socket.connect()
        setIsLoggedIn(true)
        setRoom("lobby")
    }

    return (
        <SocketContext.Provider 
        value={{
            username, 
            isLoggedIn, 
            login, 
            setUsername, 
            room, 
            setRoom, 
            writtenMessage, 
            setWrittenMessage
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider