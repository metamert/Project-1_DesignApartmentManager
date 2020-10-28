import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import {Link} from "react-router-dom"
export default function Searchinput({props}) {

    const handleKeypress = e => {
        console.log(e)
        //it triggers by pressing the enter key
      if (e.key ==="Enter") {
        props.history.push("/dues")
      }
    };

    return (<div className="searchContainer">
 <h2 className="wh bold fs-lg">Search your apartment dues  </h2>
 
   <div className="searchParent"> 
   <input onKeyPress={handleKeypress} className="searchInput">
            
            </input>
<Link to="/dues">
   <div className="circle">

<SearchIcon className="searchIcon" color="white"></SearchIcon>
</div>
</Link>
   </div>
      
        </div>
    )
}
