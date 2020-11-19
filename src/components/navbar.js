
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom"

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

export default function ButtonAppBar(props) {
  const [state, setstate] = React.useState("")
  const classes = useStyles();



const user=localStorage.getItem("user")
console.log(user)
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
        {!props.user?<Link to="login">
          <Button color="inherit" > Login</Button>
          </Link>:
          <Link to="login">
           <Button color="inherit" onClick={()=>{
            localStorage.setItem("user","")
            props.set("")


           }}> Logout</Button></Link>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}