import { Button, Grid } from "@material-ui/core";
import React ,{useEffect,useState}from "react";
import {connect} from "react-redux"

 function Flat({selected}) {


const calculate=()=>{
let fitness=0
let swimming=0
let other=0
let users=[]

selected.dues?.map(due=>{
fitness=fitness+due.fitness
swimming=swimming+due.swimming_pool
other=other+due.amount
if(!users.includes(due.user_id)){
    users.push(due.user_id)
}
})
let obj={fitness,swimming,other,total:fitness+swimming+other,users:users.length}
console.log("obj",obj)
return obj


}






function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }


  return (
    <Grid container column className="modalCt" justify="center" alignItems="center" >
     
        <div className="shadow-card">
            
<h3 style={{fontSize:30}}>Revenue from {selected.flat_name}</h3>
<Grid container row justify="center">
<h4 style={{margin:20,fontWeight:500}}> Fitness  : {calculate().fitness} $</h4>
<h4 style={{margin:20,fontWeight:500}}> Swimming  : {calculate().swimming} $</h4>
<h4 style={{margin:20,fontWeight:500,marginBottom:40}}>other services : {calculate().other} $</h4>
<h4 style={{margin:20,fontWeight:500,marginBottom:40}}>Total : {calculate().total} $</h4>


</Grid>
{<h3 style={{color:"red"}}>how many users moved from this flat : {calculate().users}</h3>}

        </div>
    
     
    </Grid>
  );
}




    export default Flat