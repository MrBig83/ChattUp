import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import SocketProvider from './Context/SocketContext/socketContext.tsx'
// import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  // <BrowserRouter>
    <SocketProvider>
      <App />
    </SocketProvider>
  // </BrowserRouter>
    
  // </React.StrictMode>,
)
