import {useEffect } from "react";
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
      <h1>Tillgängliga rum:</h1>
      <ul>
        {listOfRooms.map((roomName) => (
          <li key={roomName}>
            <p onClick={() => {
              // Byt rum och hantera användarens anslutning till rummet
              changeRoom(roomName);
              handleUserJoin(roomName);
            }}>
              Join {roomName} ({roomUsersMap[roomName]?.length || 0} användare)
            </p>
            {roomUsersMap[roomName] && (
              <div>
                <p>Användare i rummet:</p>
                <ul>
                  {/* Loopa igenom och visa användarna i rummet */}
                  {roomUsersMap[roomName].map((user) => (
                    <li key={user}>{user}</li>
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