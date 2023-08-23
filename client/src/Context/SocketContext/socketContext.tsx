import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import { io } from "socket.io-client"


interface ISocketContext {
    isLoggedIn: boolean
    username: string
    room: string
    writeMessage: string
    printMessage: string
    newRoomName: string
    userId: string
    avaliableRooms: string
    setavaliableRooms: React.Dispatch<React.SetStateAction<string>>
    setRoom: React.Dispatch<React.SetStateAction<string>>
    setUserId: React.Dispatch<React.SetStateAction<string>>
    setUsername: React.Dispatch<React.SetStateAction<string>>
    setwriteMessage: React.Dispatch<React.SetStateAction<string>>
    setNewRoomName: React.Dispatch<React.SetStateAction<string>>
    login: () => void
    sendMessage: () => void
    changeRoom: (newRoom: string) => void
    leaveRoom: () => void

}

const defaultValues = {
    isLoggedIn: false, 
    username: "",
    room: "",
    writeMessage: "",
    printMessage: "", 
    newRoomName: "",
    userId: "",
    avaliableRooms: "",
    setavaliableRooms: () => {},
    setRoom: () => {},
    setUsername: () => {},
    setwriteMessage: () => {},
    setNewRoomName: () => {},
    setUserId: () => {},
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
    const [newRoomName, setNewRoomName] = useState("");
    const [userId, setUserId] = useState("");
    const [avaliableRooms, setavaliableRooms] = useState("")

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
        setNewRoomName("")
    }
    
    socket.on("print_message", (arg) => {
        setPrintMessage(arg)
    })

    socket.on("user_id", (userId) => {
        setUserId(userId)       
    })

    socket.on("rooms_list", (avaliableRooms) => {
        console.log("avaliableRooms");
        console.log(avaliableRooms);
        
        setavaliableRooms(avaliableRooms)
    })

    // socket.on("whoIs", () =>{
    //     const thisUser = {
    //         username: username, 
    //         userID: userId
    //     }
    //     // console.log(thisUser);   
    //     socket.emit("this_user", (thisUser)) 
    // })
   
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
            leaveRoom, 
            newRoomName, 
            setNewRoomName, 
            userId, 
            setUserId, 
            avaliableRooms, 
            setavaliableRooms
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider