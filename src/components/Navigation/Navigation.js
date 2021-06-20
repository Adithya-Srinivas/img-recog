import React from 'react';


const Navigation = ({currentRoute, signOut}) => {
	return(
		<div className="f3 fw6 tr">
		   <nav 
		   className="underline link dim black pa3 pointer"
		   onClick = {signOut}
		   > Sign out </nav>
		</div>
		);
};

export default Navigation;