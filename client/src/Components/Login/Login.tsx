import { useSocket } from "../../Context/SocketContext/socketContext";

function login() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { login, username, setUsername } = useSocket();

  return (
    <div>
      {/* //Användaren får välja eget visningsnamn */}
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
      />
      <button onClick={login}>Börja chatta</button>
    </div>
  );
}

export default login;
