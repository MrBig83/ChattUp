import { useSocket } from "../../Context/SocketContext/socketContext";
import { updateRoomsData } from "../helpers/helpers";
import "./RoomList.css";

function RoomList() {
  const { changeRoom, listOfRooms, username, roomUsersMap, setRoomUsersMap, translateList, typing, room } = useSocket();

  const handleUserJoin = (roomName: string) => {
    const updatedRoomUsersMap = updateRoomsData(roomUsersMap, roomName, username);
    setRoomUsersMap(updatedRoomUsersMap);
  };
  
  return (
    <div className="roomList">
      <h1 className="roomTitle">Rum:</h1>
      <ul>
        {listOfRooms.map((roomName) => (
          <li key={roomName}>
            <div className="roomItem" onClick={() => {
              if(room != roomName){
                changeRoom(roomName);
                handleUserJoin(roomName)
              }
            }}> 
              Join {roomName} 
              ({roomUsersMap[roomName]?.length || 0}) 
              {roomUsersMap[roomName] && (
                <div className="userList">
                  {roomUsersMap[roomName].map((user) => (
                    <div key={user} className="userItem">{translateList[user]}
                    
                    {translateList[user] == typing ?<p>Skriver...</p> : <p></p>}

                    </div>
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