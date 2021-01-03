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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InputLabel from "@material-ui/core/InputLabel";
import FormGroup from "@material-ui/core/FormGroup";

import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Select from "@material-ui/core/Select";
import {setAdmin} from "../../redux/user/user.actions"

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
    // Fix IE 11 issue.
    padding: 40,
    marginTop: 10,
    position: "relative",
    height: 600,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AddAdmin({  history, cur_admin,add_admin }) {
  const classes = useStyles();
  const [data, set_data] = React.useState({
    admin_email:"",
    admin_password: "",
 
  });

  const [error, seterror] = React.useState("");
  const [modalStyle] = React.useState(getModalStyle);

 

  const check = () => {
   
    

    if (!data.admin_email) {
      return "email cannot be empty";
    }
    if (!data.admin_password) {
      return "password cannot be empty";
    }

    return false;
  };

  const Submit = async () => {
    console.log(check());
    if (!check()) {
      try {
        const body = data;
        const response = await fetch(
          "http://localhost:5000/authentication/new-admin",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(body)
          }
        );
        const parseRes = await response.json();
     
  
        if ( parseRes.status) {
         
         console.log(parseRes)



add_admin(parseRes)

          toast.success("Admin added Successfully");
        } else {
         
          toast.error(parseRes);
        }
      } catch (err) {
      
        toast.error("server error");
      }
    } else {
      toast.error(check());
    }
  };

  const onChange = (name, value) => {
    set_data({ ...data, [name]: value });
  };
  console.log(data);
  return (
    <Grid container justify="center" style={{marginTop:50}}>
      
      <div className="form-responsive" noValidate>
        <h1>New Admin</h1>
       
      
         
          <TextField
            variant="outlined"
            margin="normal"
            required
       fullWidth
            name="admin_email"
            label="email"
            type="email"
            id="email"
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
       

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          id="admin_password"
          label="admin_password "
          name="admin_password"
          autoComplete="admin_password"
          autoFocus
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />


        <Button
          type="submit"
          style={{ marginRight: 20 }}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={Submit}
        >
          New Admin
        </Button>
       
      </div>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  cur_user: state.user.user,
});

const mapDispatchToState=(dispatch)=>({
add_admin:(payload)=> dispatch(setAdmin(payload))
})

export default connect(mapStateToProps,mapDispatchToState)(AddAdmin);