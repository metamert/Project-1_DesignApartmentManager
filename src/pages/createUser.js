import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import Select from "@material-ui/core/Select";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
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
    top: `40%`,
    left: `40%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    alignSelf: "center",
    width: "100%",
   
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    alignSelf: "center",
    width: "50%",
   
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    backgroundColor: "white",
    width: "60%", // Fix IE 11 issue.
    padding: 40,
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({ cancel, updatePage, create }) {
  const classes = useStyles();
  const [data, set_data] = React.useState({
    flat_no: "",
    phone_number: "",
    name: "",
    debt: "",
  });

  const [error, seterror] = React.useState("")
  const [modalStyle] = React.useState(getModalStyle);

  const check=()=>{
    var phoneno = /^\d{10}$/
    if(!data.phone_number){
      return "phone number  cannot be empty"
     }


    if(!data.phone_number.match(phoneno)){
      return "phone number format is not correct"
    }


  
     
    if(!data.name){
      return ("name cannot be empty")
    }
    if(!data.flat_no){
return ("flat no cannot be empty")
    }
   

    if(!data.debt){
      return ("debt cannot be empty")

    }
    
    return false
    }



  const Submit=async () => {
console.log(check())
  if(!check()){

    try {
      let response = await axios.post("https://localhost/api/createuser.php", data);
      console.log(response)
      if(response.data.status){
       
cancel()
updatePage()

        }else{
          alert(response.data.message)
        }
    } catch (error) {
      alert("error")
    }
   

  }else{
    alert(check())
  }

  };

  const onChange = (name, value) => {
    set_data({ ...data, [name]: value });
  };
  console.log(data);
  return (
    <div className={classes.container}>
      <div className={classes.form} noValidate>
     <h1>Create User</h1>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="phone_number"
          label="phone_number ex. 5111511412"
          name="phone_number"
          autoComplete="phone_number"
          autoFocus
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="name"
          label="name"
          type="name"
          id="name"
          autoComplete="name"
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />

<TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="flat_no"
          label="flat_no"
          type="flat_no"
          id="flat_no"
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
      

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="debt"
          label="debt"
          type="debt"
          id="debt"
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
      

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={Submit}
        >
          Create User
        </Button>
        <Grid container>
          <Grid item>
            <Button
              onClick={() => cancel()}
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
