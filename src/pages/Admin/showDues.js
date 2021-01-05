import { Button, Grid } from "@material-ui/core";
import React ,{useEffect,useState}from "react";
import {connect} from "react-redux"
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"
 function Dues({dues,admin,update}) {






  const makePayment=async (id)=>{
    try {
      await axios({
        url: 'http://localhost:5000/dues/manual-payment',
        method: 'post',
        data: {
          
          token: admin.token,
          id:id
        }
      })
      toast.success("payment is done !")
      update()
    } catch (error) {
      toast.error("error")
    }
    
    }
    



function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }
console.log(dues)

  return (
    <Grid container column className="modalCt" justify="center" alignItems="center" >
     {dues?.map(due=> 
        <div className="shadow-card">
            <h4 style={{position:"absolute",top:30,left:40,color:"#f50057"}}>{getFormattedDate(new Date(due.created_at))}</h4>
<h1 style={{fontSize:50}}>{due.swimming_pool+due.fitness+due.amount}$</h1>
<Grid container row justify="center">
<h4 style={{margin:20,fontWeight:500}}> Fitness  : {due.fitness} $</h4>
<h4 style={{margin:20,fontWeight:500}}> Swimming  : {due.swimming_pool} $</h4>
<h4 style={{margin:20,fontWeight:500,marginBottom:40}}> Other services: {due.amount} $</h4>


</Grid>
{due.is_paid?<h3 style={{color:"green"}}>paid !</h3>:<Button variant="contained" color="secondary" onClick={()=>makePayment(due.due_id)} >Mark as paid</Button>}

        </div>
      )}
     
    </Grid>
  );
}


const stateto=(state)=>({
   
    admin:state.user.admin,
    
    })

    export default connect(stateto)(Dues)