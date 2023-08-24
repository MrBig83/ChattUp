import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { io } from "socket.io-client";

interface ISocketContext {
  isLoggedIn: boolean;
  username: string;
  room: string;
  writeMessage: string;
  printMessage: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setwriteMessage: React.Dispatch<React.SetStateAction<string>>;
  login: () => void;
  sendMessage: () => void;
  changeRoom: (newRoom: string) => void;
  createdRooms: string[];
  setCreatedRooms: React.Dispatch<React.SetStateAction<string[]>>;
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
  createdRooms: [],
  setCreatedRooms: () => {},
};

const SocketContext = createContext<ISocketContext>(defaultValues);
// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => useContext(SocketContext);

const socket = io("http://localhost:3000", { autoConnect: false });

const SocketProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [writeMessage, setwriteMessage] = useState("");
  const [printMessage, setPrintMessage] = useState("");
  const [createdRooms, setCreatedRooms] = useState<string[]>([]);

  const login = () => {
    socket.connect();
    setIsLoggedIn(true);
    setRoom("lobby");
    socket.emit("log_rooms", username);
  };

  useEffect(() => {
    if (room) {
      socket.emit("join_room", room);
    }
  }, [room]);

  useEffect(() => {
    socket.on("list_of_rooms", (roomList) => {
      setCreatedRooms(roomList);
    });

    return () => {
      socket.off("list_of_rooms");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("write_message", writeMessage, room);
    setPrintMessage(writeMessage);
    console.log(room);
  };

  const changeRoom = (newRoom: string) => {
    socket.emit("leave_room");
    setRoom(newRoom);
    socket.emit("join_room", newRoom);
  };

  socket.on("print_message", (arg) => {
    setPrintMessage(arg);
  });

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
        createdRooms,
        setCreatedRooms,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
