import { useEffect } from "react";
import { useSocket } from "../../Context/SocketContext/socketContext";
import { updateRoomsData } from "../helpers/helpers";
import "./RoomList.css"

function RoomList() {
  const { changeRoom, listOfRooms, username, roomUsersMap, setRoomUsersMap, translateList } = useSocket();

  const handleUserJoin = (roomName: string) => {
    const updatedRoomUsersMap = updateRoomsData(roomUsersMap, roomName, username);
    setRoomUsersMap(updatedRoomUsersMap);
  };


  useEffect(() => {
    console.log("roomUsersMap in RoomList:", roomUsersMap);
  }, [roomUsersMap]);

  return (
    <div className="roomList">
      <h1 className="roomTitle">Rum:</h1>
      <ul>
        {listOfRooms.map((roomName) => (
          <li key={roomName}>
            <div className="roomItem" onClick={() => {
              changeRoom(roomName);
              handleUserJoin(roomName);
              }}> Join {roomName} 
              ({roomUsersMap[roomName]?.length || 0}) {roomUsersMap[roomName] && (
              <div className="userList">
                  {roomUsersMap[roomName].map((user) => (
                    <li key={user} className="userItem">{translateList[user]}</li>
                  ))}
              </div>
            )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomList;