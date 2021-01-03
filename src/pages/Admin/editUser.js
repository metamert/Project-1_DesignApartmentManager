import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import Radio from "@material-ui/core/Radio";
import MenuItem from "@material-ui/core/MenuItem";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";

import { ToastContainer, toast } from 'react-toastify';
import Select from "@material-ui/core/Select";
import {setCurrentUser} from "../../redux/user/user.actions"


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
    const top = 20;
    const left = 20 ;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
const useStyles = makeStyles((theme) => ({
    container: {
       
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      marginTop:20,
        alignSelf:"center",
        width:"100%",
        padding:20
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
    {
      user_id:"",
      created_at:"",
      user_name:"",
      user_email:"",
      phone_number:"",
      flat_status:"",
      flat_no:"",
      swimming_pool:"",
      fitness:"",
      is_active:"",
      moved_at:"",

    }


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
          value={data.phone_number}
          id="phone_number"
          label="phone_number "
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
            style={{ width: "46%" }}
            name="user_name"
            value={
              data.user_name
            }
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
            value={
              data.user_email
            }

            style={{ width: "45%" }}
            name="user_email"
            label="email"
            type="email"
            id="email"
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
        </Grid>

       

        <FormControl
          variant="filled"
          style={{ width: "100%", marginTop: 20, marginBottom: 10 }}
        >
          <InputLabel id="demo-simple-select-filled-label">Flat</InputLabel>
          <Select
           value={
            data.flat_no
          }
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            onChange={(e) => {
              onChange("flat_no", e.target.value);
            }}
          >
            <MenuItem value={"A-1"}>A-1</MenuItem>
            <MenuItem value={"A-2"}>A-2</MenuItem>
            <MenuItem value={"A-3"}>A-3</MenuItem>
            <MenuItem value={"B-1"}>B-1</MenuItem>
            <MenuItem value={"B-2"}>B-2</MenuItem>
            <MenuItem value={"B-3"}>B-3</MenuItem>
            <MenuItem value={"C-1"}>C-1</MenuItem>
            <MenuItem value={"C-2"}>C-2</MenuItem>
            <MenuItem value={"C-3"}>C-3</MenuItem>
          </Select>
        </FormControl>

        <RadioGroup
          aria-label="gender"
          name="flat_status"
          value={data.flat_status}
          onChange={(e) => {
            onChange("flat_status", e.target.value);
          }}
        >
          <Grid container row justify="space-evenly">
            <h4>Flat Status</h4>
            <FormControlLabel value="Owner" control={<Radio />} label="Owner" />
            <FormControlLabel
              value="Tenant"
              control={<Radio />}
              label="Tenant"
            />
          </Grid>
        </RadioGroup>


        <Grid container row justify="space-evenly">
        <h4>Exstra Services</h4>
       
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.fitness}
                  onChange={(e) => {
                    onChange("fitness", e.target.checked);
                  }}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              }
              label="Fitness service"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.swimming_pool}
                  onChange={(e) => {
                    onChange("swimming_pool", e.target.checked);
                  }}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              }
              label="Swimming pool"
            />
        
       
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
          </Grid>
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