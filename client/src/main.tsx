import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import SocketProvider from "./Context/SocketContext/socketContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SocketProvider>
    <App />
  </SocketProvider>
);
