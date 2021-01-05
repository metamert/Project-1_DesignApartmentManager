import React from 'react'
import Card from "../components/anounceCard"
import {Button, Grid} from "@material-ui/core"
import {Link} from "react-router-dom"
export default function Anounce() {

    return (
     <Grid container justify="center" alignItems="center" direction="column" style={{height:"100vh"}}>
      <h1>User Logged in, please try Admin panel</h1>
      <Link to="admin"><Button variant="contained" color="secondary">Admin</Button></Link>
     </Grid>
    )
}
