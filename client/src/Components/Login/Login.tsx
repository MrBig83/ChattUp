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

    // Fortsätt med inloggningsprocessen
    login();
  };

  return (
    <div className="login-container">
      <img className="logo" src="/public/chatup_logo.png"></img>
      <h2>Välkommen till Chattrummet</h2>
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
