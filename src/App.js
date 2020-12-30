import logo from './logo.svg';
import React from "react"
import './App.css';
import Navbar from "../src/components/navbar"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import Home from "./pages/home"
import Due from "./components/Dues"
import AdminLogin from "./pages/Admin/adminLogin"
import Login from "./pages/login"
import AdminAddUser from "./pages/Admin/addUser"
import Admin from "./pages/Admin/admin"
import Register from "./pages/register"
import { ToastContainer, toast } from 'react-toastify';
import Announce from "./pages/Announce";
import {connect} from "react-redux"
function App({user,admin}) {
  const [state, setstate] = React.useState("")
  console.log(user)
  return (
    <Router>
   <Navbar  user={state} set={(a)=>setstate(a)} ></Navbar>
  

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/" exact component={Home}>
         
        </Route>
      
        <Route
            exact
            path="/mydues"
            render={() =>
              admin ? (
                <Redirect to='/mydues' />
              ) : (
                <Login />
              )
            }
          />
       
        <Route
            exact
            path="/admin"
            render={(props) =>
              admin ? (
                <Redirect to='/admin' />
              ) : (
                <Admin {...props} />
              )
            }
          />



        <Route
            exact
            path="/admin-adduser"
            render={(props) =>
              admin ? (
                <Redirect to='/admin-adduser' />
              ) : (
                <AdminAddUser {...props}/>
              )
            }
          />




        <Route
            exact
            path='/login'
            render={(props) =>
              user ? (
                <Redirect to='/' />
              ) : (
                <Login {...props}/>
              )
            }
          />

<Route
            exact
            path='/register'
            render={(props) =>
              user ? (
                <Redirect to='/' />
              ) : (
                <Register  {...props} />
              )
            }
          />
     
      </Switch>
      <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
  </Router>
  );
}


const stateTo=(state)=>({
user:state.user.currentUser,
admin:state.user.admin
})

export default connect(stateTo)(App);
