import React from 'react'
import Card from "../components/anounceCard"
import {Grid} from "@material-ui/core"
export default function Anounce() {

    return (
     <Grid container justify="center" alignContent="center">
         <Grid item className="marg"><Card></Card></Grid>
         <Grid item className="marg"><Card></Card></Grid>
     </Grid>
    )
}
