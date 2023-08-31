import { useSocket } from "../../Context/SocketContext/socketContext";
import { useState } from "react";
import "./Login.css";

function Login() {
  const { login, username, setUsername } = useSocket();
  const [validationMessage, setValidationMessage] = useState("");

  const handleLogin = () => {
    if (username.trim() === "") {
      setValidationMessage("Ange ett giltigt användarnamn");
      return;
    }

    login();
  };

  return (
    <div className="login-container">
      <img className="logo" src="/src/assets/chatup_logo.png"></img>

      <input
        className="input-field"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Ange ditt användarnamn"
      />
      <button className="login-button" onClick={handleLogin}>
        Börja chatta
      </button>
      {validationMessage && (
        <p className="validation-message">{validationMessage}</p>
      )}
    </div>
  );
}

export default Login;
