import { useEffect } from "react";
import { useSocket } from "../../Context/SocketContext/socketContext";
import { updateRoomsData } from "../helpers/helpers";


function RoomList() {
  const { changeRoom, listOfRooms, username, roomUsersMap, setRoomUsersMap } = useSocket();

  const handleUserJoin = (roomName: string) => {
    const updatedRoomUsersMap = updateRoomsData(roomUsersMap, roomName, username);
    setRoomUsersMap(updatedRoomUsersMap);
  };

  // Effekt som loggar roomUsersMap när det ändras
  useEffect(() => {
    console.log("roomUsersMap in RoomList:", roomUsersMap);
  }, [roomUsersMap]);

  return (
    <div className="roomList">
      <h1 className="roomTitle">Tillgängliga rum:</h1>
      <ul>
        {listOfRooms.map((roomName) => (
          <li key={roomName}>
            <div className="roomItem" onClick={() => {
              changeRoom(roomName);
              handleUserJoin(roomName);
            }}>
              Join {roomName} ({roomUsersMap[roomName]?.length || 0} användare)
            </div>
            {roomUsersMap[roomName] && (
              <div className="userList">
                <p>Användare i rummet:</p>
                <ul>
                  {roomUsersMap[roomName].map((user) => (
                    <li key={user} className="userItem">{user}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomList;
