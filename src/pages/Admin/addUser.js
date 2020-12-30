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

function AddUser({ cancel, updatePage, create, history, cur_user }) {
  const classes = useStyles();
  const [data, set_data] = React.useState({
    phone_number: "",
    user_name: "",
    user_password: "",
    flat_no: "",
    user_email: "",
    is_active: true,
    swimming_pool: false,
    fitness: false,
    flat_status: "Owner",
  });

  const [error, seterror] = React.useState("");
  const [modalStyle] = React.useState(getModalStyle);

  React.useEffect(() => {
    if (!cur_user) {
      history.push("/login");
    }
  }, []);

  const check = () => {
    var phoneno = /^\d{10}$/;
    if (!data.phone_number) {
      return "phone number  cannot be empty";
    }

    if (!data.phone_number.match(phoneno)) {
      return "phone number format is not correct";
    }

    if (!data.user_name) {
      return "name cannot be empty";
    }
    if (!data.user_email) {
      return "email cannot be empty";
    }

    if (!data.flat_no) {
      return "flat_no cannot be empty";
    }
    if (!data.user_password) {
      return "password cannot be empty";
    }

    return false;
  };

  const Submit = async () => {
    console.log(check());
    if (!check()) {
      try {
        let response = await axios.post(
          "http://localhost:5000/authentication/register",
          data
        );
        console.log(response);
        if (response.data.status) {
          history.push("/admin");
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
    <Grid container justify="center" style={{marginTop:50}}>
       <ArrowBackIosIcon
          type="submit"
          variant="contained"
          color="primary"
          className="back needHover"
       
          onClick={() => history.push("/admin")}
        >
        
        </ArrowBackIosIcon>
      <div className="form-responsive" noValidate>
        <h1>Add User</h1>
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
            style={{ width: "46%" }}
            name="user_name"
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
            style={{ width: "45%" }}
            name="user_email"
            label="email"
            type="email"
            id="email"
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
        </Grid>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          id="user_password"
          label="user_password "
          name="user_password"
          autoComplete="user_password"
          autoFocus
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />


        <FormControl
          variant="filled"
          style={{ width: "100%", marginTop: 20, marginBottom: 10 }}
        >
          <InputLabel id="demo-simple-select-filled-label">Flat</InputLabel>
          <Select
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
        
        </Grid>



        <Button
          type="submit"
          style={{ marginRight: 20 }}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={Submit}
        >
          Add User
        </Button>
       
      </div>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  cur_user: state.user.user,
});

export default connect(mapStateToProps)(AddUser);
