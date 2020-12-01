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
import Radio from "@material-ui/core/Radio";
import MenuItem from "@material-ui/core/MenuItem";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { makeStyles } from "@material-ui/core/styles";

import InputLabel from '@material-ui/core/InputLabel';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

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
    top: `20%`,
    left: `40%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  container: {
   
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    alignSelf: "center",
    width: "100%",
  },
  paper: {
    marginTop: 20,
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
    marginTop: 10,
    position:"relative",
    height:600
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
    flat_status: "",
    gender: "Male",
    last_name:""
  });

  const [error, seterror] = React.useState("");
  const [modalStyle] = React.useState(getModalStyle);

  const check = () => {
    var phoneno = /^\d{10}$/;
    if (!data.phone_number) {
      return "phone number  cannot be empty";
    }

    if (!data.phone_number.match(phoneno)) {
      return "phone number format is not correct";
    }

    if (!data.name) {
      return "name cannot be empty";
    }
    if (!data.last_name) {
      return "last name cannot be empty";
    }
 

    if (!data.debt) {
      return "debt cannot be empty";
    }
    if (!data.flat_no) {
      return "flat no cannot be empty";
    }
    if (!data.flat_status) {
      return "flat status cannot be empty";
    }

    return false;
  };

  const Submit = async () => {
    console.log(check());
    if (!check()) {
      try {
        let response = await axios.post(
          "https://localhost/api/createuser.php",
          data
        );
        console.log(response);
        if (response.data.status) {
          cancel();
          updatePage();
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert("error");
      }
    } else {
      alert(check());
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

<Grid container row justify="space-between">
      <TextField
          variant="outlined"
          margin="normal"
          required
        style={{width:"46%"}}
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
          style={{width:"45%"}}
          name="last_name"
          label="last name"
          type="last name"
          id="last name"
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />

      </Grid>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="debt"
          label="debt"
          type="debt"
          id="debt"
          autoComplete="name"
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />

       

     
         <FormControl variant="filled" style={{width:"100%",marginTop:20,marginBottom:10}}>
        <InputLabel id="demo-simple-select-filled-label">Flat</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          onChange={(e) => {onChange("flat_no",e.target.value)}}
        >
          <MenuItem value={"A-1"}>A-1</MenuItem>
          <MenuItem value={"A-2"}>A-2</MenuItem>
          <MenuItem value={"A-3"}>A-3</MenuItem>
          <MenuItem value={"B-1"}>B-1</MenuItem>
          <MenuItem value={"B-2"}>B-2</MenuItem>
          <MenuItem value={"B-3"}>B-3</MenuItem>
          <MenuItem value={"B-1"}>C-1</MenuItem>
          <MenuItem value={"B-2"}>C-2</MenuItem>
          <MenuItem value={"B-3"}>C-3</MenuItem>
        </Select>
        </FormControl>

        <FormControl variant="filled" style={{width:"100%",marginTop:20,marginBottom:10}}>
        <InputLabel id="demo-simple-select-filled-label">flat status</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          onChange={(e) => {onChange("flat_status",e.target.value)}}
        >
          <MenuItem value={"Owner"}>Owner</MenuItem>
          <MenuItem value={"Tenant"}>Tenant</MenuItem>
          
        </Select>
        </FormControl>




        <RadioGroup
          aria-label="gender"
          name="gender"
          value={data.gender}
          onChange={(e)=>{onChange("gender",e.target.value)}}
        >
         <Grid container row justify="space-evenly">
           <h4 >gender:</h4>
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
          </Grid>
        </RadioGroup>

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
     
            <BackspaceIcon
            className="needHover"
            style={{position:"absolute",top:20,right:20}}
              onClick={() => cancel()}
              variant="contained"
              color="primary"
            >
              
            </BackspaceIcon>
        
      </div>
    </div>
  );
}
