import { Button, Grid } from "@material-ui/core";
import React ,{useEffect,useState}from "react";
import {connect} from "react-redux"

 function Dues({dues}) {









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
{due.is_paid?<h3 style={{color:"green"}}>paid !</h3>:<h3 style={{color:"red"}}>not paid yet!</h3>}

        </div>
      )}
     
    </Grid>
  );
}


const stateto=(state)=>({
    user:state.user.currentUser.user,
    
    })

    export default connect(stateto)(Dues)