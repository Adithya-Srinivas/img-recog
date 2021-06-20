import React from 'react';
import Tilt from 'react-parallax-tilt';
import logo from './logo.png'

const Logo = () => {
	return(
		<div className= 'ma3 mt0 pa3' >
		 <Tilt tiltMaxAngleX={3}
          tiltMaxAngleY={3}
          perspective={900}
          transitionSpeed={1500}
          scale={1.0}
          gyroscope={true}>
           <div className='br2 shadow-2 pa3'style={{ height: '140px', width: '140px', background: 'linear-gradient(to right, #ba5370, #f4e2d8)' }}>
             <img style={{ paddingTop : '3px' }} alt= 'logo' src={logo}></img>
           </div>
         </Tilt>
		</div>
		);
};

export default Logo;