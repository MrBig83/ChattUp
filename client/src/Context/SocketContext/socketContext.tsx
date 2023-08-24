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
    listOfRooms: string[]
    setlistOfRooms: React.Dispatch<React.SetStateAction<string[]>>
    setRoom: React.Dispatch<React.SetStateAction<string>>
    setUserId: React.Dispatch<React.SetStateAction<string>>
    setUsername: React.Dispatch<React.SetStateAction<string>>
    setwriteMessage: React.Dispatch<React.SetStateAction<string>>
    setNewRoomName: React.Dispatch<React.SetStateAction<string>>
    login: () => void
    sendMessage: () => void
    changeRoom: (newRoom: string) => void
    leaveRoom: () => void
    roomUsersMap: Record<string, string[]>;
    setRoomUsersMap: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;

    
}

const defaultValues = {
    isLoggedIn: false, 
    username: "",
    room: "",
    writeMessage: "",
    printMessage: "", 
    newRoomName: "",
    userId: "",
    listOfRooms: [],
    setlistOfRooms: () => {},
    setRoom: () => {},
    setUsername: () => {},
    setwriteMessage: () => {},
    setNewRoomName: () => {},
    setUserId: () => {},
    login: () => {},
    sendMessage: () => {},
    changeRoom: () => {},
    leaveRoom: () => {},
    roomUsersMap: {},
    setRoomUsersMap: () => {},
    
}

const SocketContext = createContext<ISocketContext>(defaultValues) //BALLAR UR PGA FEL TYPNING
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
    const [listOfRooms, setlistOfRooms] = useState<string[]>([]);
    const [roomUsersMap, setRoomUsersMap] = useState<{ [room: string]: string[] }>({});
    
    
    // let translateList: {[ID:string]: string} //DETTA ÄR ETT EXPERIMENT
    
    const login = () => {
        socket.connect()
        setIsLoggedIn(true)
        socket.on('connect', () => {
            socket.emit("log_rooms", socket.id, username);
        });
        setRoom("lobby")
    }
    
    useEffect(() => {
        if(room){
            socket.emit("join_room", room)
        }
    }, [room])

    useEffect(() => {
        const handleUsersList = (usersByRoom: { [room: string]: string[] }) => {
          setRoomUsersMap(usersByRoom);
        };
    
        socket.on("users_list", handleUsersList);
    
        return () => {
          socket.off("users_list", handleUsersList);
        };
      }, []);

    const sendMessage = () => {
        socket.emit("write_message", writeMessage, room)
        setPrintMessage(writeMessage);
        setwriteMessage("");
    }
    const leaveRoom = () => {
        socket.emit("leave_room", room)
        setRoom("lobby")
        
    }

    const changeRoom = (newRoom: string) => {
        setRoom(newRoom); 
        socket.emit('join_room', newRoom);
        socket.emit("leave_room", room)
        setNewRoomName("")
    }

    socket.on("print_message", (arg) => {
        setPrintMessage(arg)
    })

    socket.on("user_id", (userId) => {
        setUserId(userId)       
    })

    socket.on("rooms_list", (listOfRooms) => {
        setlistOfRooms(listOfRooms)
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
            leaveRoom, 
            newRoomName, 
            setNewRoomName, 
            userId, 
            setUserId, 
            listOfRooms, 
            setlistOfRooms,
            roomUsersMap,
            setRoomUsersMap, 
            
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider