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
import {CircularProgress} from "@material-ui/core"
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

function Rates({  history, admin,add_admin}) {
  const classes = useStyles();
  const [data, set_data] = React.useState({
    fitness_fee: 20,
    other_fee: 30,
    swimming_pool_fee: 20
  });

const [loading, set_loading] = React.useState(true)
  const [error, seterror] = React.useState("");
  const [modalStyle] = React.useState(getModalStyle);

 

  const check = () => {
   
    

    if (!data.fitness_fee) {
      return "fitness fee cannot be empty";
    }
    if (!data.swimming_pool_fee) {
      return "swimming fee cannot be empty";
    }
    if (!data.other_fee) {
        return "please enter all inputs";
      }


    return false;
  };

  const Submit = async () => {
    console.log(check());
    if (!check()) {
      try {
        const body = data;
        const myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("jwt_token", admin.token);

        const response = await fetch(
          `http://localhost:5000/admin/rates`,

          {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(data),
          }
         
        );
        const parseRes = await response.json();
     
  
        
         
         console.log(parseRes)


            set_data(parseRes)


          toast.success("Saved Successfully");
       
      } catch (err) {
      
        toast.error("server error");
      }
    } else {
      toast.error(check());
    }
  };

React.useEffect(() => {
   fetchRates()
}, [])


const fetchRates=async ()=>{
    

  set_loading(true)
        const response = await fetch(
          `http://localhost:5000/admin/rates`,
          {
            method: "GET",
            headers: { jwt_token: admin.token },
            
          }
        );
        const parseRes = await response.json();
        console.log(parseRes)
        set_data(parseRes[0])
        set_loading(false)

}


  const onChange = (name, value) => {
    set_data({ ...data, [name]: value });
  };
if(!loading)
  return (
    <Grid container justify="center" style={{marginTop:50}}>
      
      <div className="form-responsive" noValidate>
        <h1>Monthly Rates</h1>
       
      
         
          <TextField
            variant="outlined"
            margin="normal"
            required
            type="number"
       fullWidth
       value={data.swimming_pool_fee}
            name="swimming_pool_fee"
            label="Swimming pool rate"
           
            id="Swimming pool rate"
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
       
       <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={data.fitness_fee}
          type="number"
          id="fitness_fee"
          label="fitness fee "
          name="fitness_fee"
          autoComplete="fitness_fee"
          autoFocus
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={data.other_fee}
          type="number"
          id="other fees"
          label="Security , Cleaning etc .. "
          name="other_fee"
          autoComplete="other fees"
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
          Save
        </Button>
       
      </div>
    </Grid>
  )
  else return(<CircularProgress></CircularProgress>)
}

const mapStateToProps = (state) => ({
  cur_user: state.user.user,
  admin: state.user.admin,
});

const mapDispatchToState=(dispatch)=>({
add_admin:(payload)=> dispatch(setAdmin(payload))
})

export default connect(mapStateToProps)(Rates);