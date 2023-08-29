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
  newRoomName: string;
  userId: string;
  listOfRooms: string[];
  setlistOfRooms: React.Dispatch<React.SetStateAction<string[]>>;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setwriteMessage: React.Dispatch<React.SetStateAction<string>>;
  setNewRoomName: React.Dispatch<React.SetStateAction<string>>;
  login: () => void;
  sendMessage: () => void;
  changeRoom: (newRoom: string) => void;
  leaveRoom: () => void;
  roomUsersMap: Record<string, string[]>;
  setRoomUsersMap: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  translateList: { [key: string]: string };
  typing: string;
  // setTyping: React.Dispatch<React.SetStateAction<string>>
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
  translateList: {},
  typing: "",
  // setTyping: () => {}
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
  const [newRoomName, setNewRoomName] = useState("");
  const [userId, setUserId] = useState("");
  const [listOfRooms, setlistOfRooms] = useState<string[]>([]);
  const [roomUsersMap, setRoomUsersMap] = useState<{
    [room: string]: string[];
  }>({});
  const [translateList, settranslateList] = useState({});
  const [typing, setTyping] = useState("");

  const login = () => {
    socket.connect();
    setIsLoggedIn(true);
    socket.on("connect", () => {
      socket.emit("register_user", socket.id, username);
    });
    setRoom("Lobby");
  };

  useEffect(() => {
    if (room) {
      socket.emit("join_room", room);
    }
  }, [room]);

  socket.on("translate_list", (translateList: object) => {
    settranslateList(translateList);
  });

  useEffect(() => {
    const handleUsersList = (usersByRoom: { [room: string]: string[] }) => {
      setRoomUsersMap(usersByRoom);
    };

    socket.on("users_list", handleUsersList);

    return () => {
      socket.off("users_list", handleUsersList);
    };
  }, []);

  useEffect(() => {
    socket.emit("typing", username, room);
  }, [writeMessage]);

  socket.on("user_is_typing", (username) => {
    if (username) {
      setTyping(username);
      //Behöver nån timer-grej som funkar som den ska....
    }
    setTimeout(() => {
      setTyping("");
    }, 2000);
  });

  const sendMessage = () => {
    let messageToSend = writeMessage;

    if (writeMessage.startsWith("/gif")) {
      const searchQuery = writeMessage.replace("/gif", "").trim();
      // messageToSend = `Här är en GIF: ${searchQuery}`;
      messageToSend = `/gif${username}: ${searchQuery}`;
    } else {
      messageToSend = `${username}: ${writeMessage}`; // Lägger till användarens namn
    }

    const completeMessage = `${messageToSend}`;

    socket.emit("write_message", completeMessage, room);
    // setPrintMessage(completeMessage);
    setwriteMessage("");
  };

  const leaveRoom = () => {
    socket.emit("leave_room", room);
    setRoom("Lobby");
  };

  const changeRoom = (newRoom: string) => {
    setRoom(newRoom);
    socket.emit("join_room", newRoom);
    socket.emit("leave_room", room);
    setNewRoomName("");
  };

  socket.on("send_translateList", (arg) => {
    console.log(arg);
  });

  socket.on("print_message", (msg) => {
    console.log(msg);

    if (msg.startsWith("/gif")) {
      setPrintMessage("");
    }
    setPrintMessage(msg); //Här måste vi bygga ett objekt. Tror jag.
  });

  socket.on("user_id", (userId) => {
    setUserId(userId);
  });

  socket.on("rooms_list", (listOfRooms) => {
    setlistOfRooms(listOfRooms);
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
        leaveRoom,
        newRoomName,
        setNewRoomName,
        userId,
        setUserId,
        listOfRooms,
        setlistOfRooms,
        roomUsersMap,
        setRoomUsersMap,
        translateList,
        typing,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
