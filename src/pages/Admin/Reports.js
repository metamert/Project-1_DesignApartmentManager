import React,{useState} from "react";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import Modal from "../Modal2"
import ReportFlat from "./reportFlat"

function Reports({ admin }) {
  const [state, setstate] = React.useState([]);
  const [dues, setdues] = React.useState([]);
  const [open, setopen] = React.useState(false);
  const [selected, setselected] = useState(null)

  React.useEffect(() => {
    Update();
  }, []);

  const FindFlat = (flat) => {
      let a={state:false,user:""}
    state.map((user) => {
      if (user.flat_no === flat&& user.is_active) {
          console.log("girdi",flat)
        a= {state:true,user:user.user_name,flat_no:flat}
      }
    });
    return a
  };

  const AllDue = (id) => {
    const arr = [];
    dues.map((due) => {
      if (due.flat_no == id) {
        arr.push(due);
      }
    });

    return arr;
  };


  const Update = async () => {
    let arr = [];

    try {
      const res = await fetch(`http://localhost:5000/admin/`, {
        method: "GET",
        headers: { jwt_token: admin.token },
      });

      const dueResponse = await fetch(`http://localhost:5000/admin/dues`, {
        method: "GET",
        headers: { jwt_token: admin.token },
      });

    
      const dues = await dueResponse.json();
      console.log("dues", dues);
setdues(dues)


      console.log("env", process.env.domain);
      const parseRes = await res.json();
      
      setstate(parseRes);
    } catch (e) {
      console.log(e);
    }
  };

  const showFlat=(flat)=>{
      setopen(true)
      setselected({dues:AllDue(flat),flat_name:flat})


  }

  return (
    <Grid className="fullw flex" column justify="center" alignItems="center">
          <Modal
          selected={selected}
          open={open}
          cancel={() => setopen(false)}
          Content={
            <ReportFlat selected={selected}  cancel={() => setopen(false)} />
          }
        ></Modal>
      <Grid item className="Apartment">
        <Grid container row justify="center">
          <div onClick={()=>showFlat("A-1")} className={`flat ${FindFlat("A-1").state?"":"green"} `}><h2>A-1</h2><h6 style={{margin:5}}>{FindFlat("A-1")?.user}</h6></div>
          <div onClick={()=>showFlat("A-2")} className={`flat ${FindFlat("A-2").state?"":"green"} `}><h2>A-2</h2><h6 style={{margin:5}}>{FindFlat("A-2")?.user}</h6></div>
        </Grid>
        <Grid container row justify="center">
        <div onClick={()=>showFlat("B-1")} className={`flat ${FindFlat("B-1").state?"":"green"} `}><h2>B-1</h2><h6 style={{margin:5}}>{FindFlat("B-1")?.user}</h6></div>
          <div onClick={()=>showFlat("B-2")} className={`flat ${FindFlat("B-2").state?"":"green"} `}><h2>B-2</h2><h6 style={{margin:5}}>{FindFlat("B-2")?.user}</h6></div>
        </Grid>
        <Grid container row justify="center" >
        <div onClick={()=>showFlat("B-1")} className={`flat ${FindFlat("C-1").state?"":"green"} `}><h2>C-1</h2><h6 style={{margin:5}}>{FindFlat("C-1")?.user}</h6></div>
          <div onClick={()=>showFlat("B-2")} className={`flat ${FindFlat("C-2").state?"":"green"} `}><h2>C-2</h2><h6 style={{margin:5}}>{FindFlat("C-2")?.user}</h6></div>
        </Grid>
       
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  admin: state.user.admin,
});

export default connect(mapStateToProps)(Reports);
