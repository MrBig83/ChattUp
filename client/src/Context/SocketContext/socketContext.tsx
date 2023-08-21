import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import { io } from "socket.io-client"


interface ISocketContext {
    isLoggedIn: boolean
    username: string
    room: string
    writeMessage: string
    printMessage: string
    setRoom: React.Dispatch<React.SetStateAction<string>>
    setUsername: React.Dispatch<React.SetStateAction<string>>
    setwriteMessage: React.Dispatch<React.SetStateAction<string>>
    login: () => void
    sendMessage: () => void
    changeRoom: (newRoom: string) => void;
    leaveRoom: () => void

}

const defaultValues = {
    isLoggedIn: false, 
    username: "",
    room: "",
    writeMessage: "",
    printMessage: "", 
    setRoom: () => {},
    setUsername: () => {},
    setwriteMessage: () => {},
    login: () => {},
    sendMessage: () => {},
    changeRoom: () => {},
    leaveRoom: () => {}
}

const SocketContext = createContext<ISocketContext>(defaultValues)
// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => useContext(SocketContext)

const socket = io("http://localhost:3000", {autoConnect: false })

const SocketProvider = ({children}: PropsWithChildren) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [writeMessage, setwriteMessage] = useState("");
    const [printMessage, setPrintMessage] = useState("");

    const login = () => {
        socket.connect()
        setIsLoggedIn(true)
        setRoom("lobby")
    }
    
    useEffect(() => {
        if(room){
            socket.emit("join_room", room)
        }
    }, [room])

    const sendMessage = () => {
        socket.emit("write_message", writeMessage, room)
        setPrintMessage(writeMessage);
        setwriteMessage("");
    }
    const leaveRoom = () => {
        socket.emit("leave_room", room)
        setRoom("lobby")
        
        // socket.leave(room)
    }

    const changeRoom = (newRoom: string) => {
        socket.emit("leave_room", room)
        setRoom(newRoom); 
        socket.emit('join_room', newRoom);
    }
    
    socket.on("print_message", (arg) => {
        setPrintMessage(arg)
    })


    return (
        <SocketContext.Provider 
        value={{
            username, 
            isLoggedIn, 
            login, 
            setUsername, 
            room, 
            setRoom, 
            writeMessage, 
            setwriteMessage, 
            sendMessage, 
            printMessage, 
            changeRoom, 
            leaveRoom
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider