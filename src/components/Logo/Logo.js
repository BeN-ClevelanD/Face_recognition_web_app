import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './critThink96.png'
import brain2 from './brain64.png'

const Logo = () => {
    return (
       <div className="ma4 mt0" style={{  display: 'flex', justifyContent: "center", alignItems: 'center' }}>
<Tilt className = 'Tilt br2 shadow-2'  style={{ height: '250px', width: '400px', display: 'flex', justifyContent: "center", alignItems: 'center' }}>
      <div className = 'Tilt-inner pa3'><img src={brain2} style={{paddingTop: '5px'}} />
      </div>
    </Tilt>
       </div>
    )
}


export default Logo