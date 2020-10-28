import logo from './logo.svg';
import './App.css';
import Navbar from "../src/components/navbar"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./pages/home"
import Due from "./components/Dues"
import Login from "./pages/login"
import Admin from "./pages/admin"

import Announce from "./pages/Announce";
function App() {
  return (
    <Router>
   <Navbar></Navbar>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/" exact component={Home}>
         
        </Route>
        <Route path="/dues" exact component={Due}>
         
        </Route>
        <Route path="/announce" exact component={Announce}>
      
        </Route>
        <Route path="/adminlogin" exact component={Login}>
      
      </Route>
        
        <Route path="/notfound" exact>
          </Route>
        <Route path="/admin" exact component={Admin}>
          
        </Route>
      </Switch>
   
  </Router>
  );
}

export default App;
