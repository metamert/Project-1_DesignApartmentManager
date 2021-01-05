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
import Admin from "./pages/Admin/adminDashboard"
import AdminNavbar from "./components/AdminNavbar"
import Register from "./pages/register"
import { ToastContainer, toast } from 'react-toastify';
import Announce from "./pages/Announce";
import {connect} from "react-redux"
function App({user,admin}) {
  const [state, setstate] = React.useState("")
  console.log(user)
  return (
    <Router>
   
  

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
      <Route
            exact
            path="/"
            render={(props) =>
              false? (
                <Redirect to='/' />
              ) : ([<Navbar {...props}/>,
                <Home {...props}/>
              ]
               
              )
            }
          />
      





        <Route
            exact
            path="/announce"
            render={() =>
              !user ? (
                <Redirect to='/login' />
              ) : (
                <Announce />
              )
            }
          />
       
        <Route
            exact
            path="/admin"
            render={(props) =>
              !admin? (
                <Redirect to='/admin-login' />
              ) : (
                [<AdminNavbar {...props}/>, <Admin {...props} />]
              )
            }
          />

<Route
            exact
            path="/admin-login"
            render={(props) =>
              false? (
                <Redirect to='/admin' />
              ) : (
                [<AdminNavbar {...props}/>,<AdminLogin {...props} />]
              )
            }
          />


        



        <Route
            exact
            path='/login'
            render={(props) =>
              user ? (
                <Redirect to='/' />
              ) : ([<Navbar {...props}/>,
                <Login {...props}/>]
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
                [<Navbar {...props}/>,<Register  {...props} />]
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
