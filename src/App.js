import logo from './logo.svg';
import React from "react"
import './App.css';
import Navbar from "../src/components/navbar"
import AddUser from "./pages/addUser"
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
import Register from "./pages/register"
import Announce from "./pages/Announce";
function App() {
  const [state, setstate] = React.useState("")
  return (
    <Router>
   <Navbar  user={state} set={(a)=>setstate(a)} ></Navbar>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/" exact component={Home}>
         
        </Route>
        <Route path="/dues" exact component={Due}>
         
        </Route>
        <Route path="/announce" exact component={Announce}>
      
        </Route>
        <Route path="/register" exact component={(props)=><Register user={state} set={(a)=>setstate(a)} {...props}></Register>}>
        </Route>
        <Route path="/login" exact component={(props)=><Login user={state} set={(a)=>setstate(a)} {...props}></Login>}>
      
      </Route>
        
        <Route path="/notfound" exact>
          </Route>
        <Route path="/admin" exact component={Admin}>
     
          
        </Route>
        <Route path="/admin-adduser" exact component={(props)=><AddUser user={state} set={(a)=>setstate(a)} {...props}></AddUser>}/>
      </Switch>
   
  </Router>
  );
}

export default App;
