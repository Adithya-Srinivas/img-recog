import React from 'react';

const Rank = ({name, entries}) => {
	function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    }
	return(
		<div className='center'>
		  <div className= 'f3 white'>
		   {`Welcome ${capitalizeFirstLetter(name)}, your number of entries are -`}
		  </div>
		  <div className='ph3 f3 fw8 white'>
		    {entries}
		  </div>
		</div>
		);
};

export default Rank;