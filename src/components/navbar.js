
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
import {setCurrentUser,setAdmin} from "../redux/user/user.actions"

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


console.log(props.history)


  return (
    <div className={classes.root}>
      <AppBar position="static" color="#ff385c" style={{padding: "0 10%"}}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            
          </Typography>
          {props.cur_user&&<Link to="/mydues">
          <Button color="secondary" variant="contained" style={{marginRight:30}} >my dues</Button>
          </Link>
         
          }
        {!props.cur_user?<Link to="/login">
          <Button color="inherit" >User Login</Button>
          </Link>:
          <Link to="login">
           <Button color="inherit" onClick={()=>{
           props.del_user(null)
        


           }}> Logout</Button></Link>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

const stateto=(state)=>({
cur_user:state.user.currentUser,
admin:state.user.admin
})

const dispatchto=(dispatch)=>({
del_user:()=>dispatch(setCurrentUser(null))
})

export default connect(stateto,dispatchto)(ButtonAppBar)