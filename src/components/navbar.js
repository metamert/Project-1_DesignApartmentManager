
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {deleteUser} from "../_actions/user_actions"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

 function ButtonAppBar(props) {
  const [state, setstate] = React.useState("")
  const classes = useStyles();


console.log(props)


  return (
    <div className={classes.root}>
      <AppBar position="static" color="#ff385c">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            
          </Typography>
          <Link to="announce"> 
          <Button color="secondary" variant="contained" className="mr-4">Announcements</Button>
          </Link>  
        {!props.cur_user?<Link to="login">
          <Button color="inherit" >Admin Login</Button>
          </Link>:
          <Link to="login">
           <Button color="inherit" onClick={()=>{
            localStorage.setItem("user","")
            props.del_user("")


           }}> Logout</Button></Link>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

const stateto=(state)=>({
cur_user:state.user.user
})

const dispatchto=(dispatch)=>({
del_user:()=>dispatch(deleteUser())
})

export default connect(stateto,dispatchto)(ButtonAppBar)