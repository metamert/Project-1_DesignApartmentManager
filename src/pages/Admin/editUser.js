import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Paper} from "@material-ui/core"
import Select from '@material-ui/core/Select';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      
        alignSelf:"center",
        width:"100%",
        padding:100
      },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:"white",
    alignSelf:"center",
    width:"50%",
    padding:100
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
      backgroundColor:"white",
    width: '60%', // Fix IE 11 issue.
    padding:40,
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({cancel,updatePage,selectedUser,edit}) {
  const classes = useStyles();
  const [data,set_data]=React.useState(
    {"password":"","user_role":"user_a","email":"","name":""}


  )

  const [modalStyle] = React.useState(getModalStyle);
const Submit=()=>{
  edit(data)
  cancel()

}

  const onChange=(name,value)=>{
set_data({...data,[name]:value})
  }

React.useEffect(() => {
 
set_data(selectedUser)

}, [selectedUser])



  console.log(data)
  return (
 
<div    className={classes.container}>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={data["email"]}
            autoComplete="email"
            autoFocus
            onChange={(e)=>onChange(e.target.name,e.target.value)}
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="name"
            value={data["name"]}
            label="name"
            type="name"
            id="name"
            autoComplete="name"
            onChange={(e)=>onChange(e.target.name,e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={data["due"]}
            name="due"
            label="due"
            type="due"
            id="due"
           
            onChange={(e)=>onChange(e.target.name,e.target.value)}
          />
            <Select
          native
          style={{width:"100%",marginTop:30,marginBottom:20}}
          value={data.user_role}
          onChange={(e)=>onChange("user_role",e.target.value)}
          inputProps={{
            name: 'user_role',
            id: 'filled-age-native-simple',
          }}
        >
        
          <option value={"user_a"}>type A</option>
          <option value={"user_b"}>type B</option>
          <option value={"admin"}>Admin</option>
        </Select>
       
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={Submit}
          >
          Save 
          </Button>
          <Grid container>
            
            <Grid item>
           <Button onClick={()=>cancel()} variant="contained" color="primary">
           Cancel

           </Button>
               
           
            </Grid>
          </Grid>
    </div>
    
    </div>
    
  );
}