import "./App.css";
import Login from "./components/login";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ChatRoom from "./components/char-room";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact component={Login} path="/" />
        <Route component={ChatRoom} path="/chat-room" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
