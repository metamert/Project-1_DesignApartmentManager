import React from 'react'
import Card from "../components/anounceCard"
import {Button, Grid} from "@material-ui/core"
import {Link} from "react-router-dom"
export default function Anounce() {
const [state, setstate] = React.useState([])
React.useEffect(() => {
   
fetchData()

}, [])

const fetchData=async ()=>{
    const res = await fetch(`http://localhost:5000/admin/announces`, {
        method: "GET",
       
      });
      const ann=await res.json()
      console.log("announces",ann)
      setstate(ann)
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
     <Grid container justify="center" alignItems="center" direction="column" style={{height:"100vh"}}>
         
      {state.map(an=><div className="shadow-card"><h4>{an.description}</h4><h6>{getFormattedDate(new Date(an.created_at))}</h6></div>)}
     </Grid>
    )
}
