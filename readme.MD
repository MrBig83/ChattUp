# ChattUp
En ganska enkel chatt-app 
Inlämningsuppgift i kursen "Systemstöd och intergration med 3:e parts system". 

## Installation
* Börja med att forka ner repot
  
### Installera och starta Backend
* Navigera till <där du har lagt projektet>/chattup/server med hjälp av valfri terminal
* Kör kommandot `npm install` för att installera alla dependencies för backend (lista över dependencies finns nedan)
* kör kommandot `npm run dev`för att starta webservern

### Installera front end
* Starta ytterligare en terminal
* Navigera till <där du har lagt projektet>/chattup/client med den nya terminalen
* Kör kommandot `npm install` för att installera alla dependencies för front end (lista över dependencies finns nedan)
* Kör kommandot `npm run dev` för att starta utvecklarläget för front end
* Klocka på länken som kommer fram i din termina.

### Backend dependencies
    "axios": "^1.5.0",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "nodemon": "^3.0.1",
    "socket.io": "^4.7.2"

### Front end dependencies
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router": "^6.15.0",
    "react-router-dom": "^6.15.0",
    "socket.io-client": "^4.7.2"

### Front end dev dependencies 
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.3",
    "eslint": "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
