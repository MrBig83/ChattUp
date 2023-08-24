export function updateRoomsData(
  roomUsersMap: Record<string, string[]>,
  roomName: string,
  username: string
): Record<string, string[]> {
  const updatedRoomUsersMap = { ...roomUsersMap };

  if (!updatedRoomUsersMap[roomName]) {
    updatedRoomUsersMap[roomName] = [];
  }

  if (!updatedRoomUsersMap[roomName].includes(username)) {
    updatedRoomUsersMap[roomName].push(username);
  }

  return updatedRoomUsersMap;
}
