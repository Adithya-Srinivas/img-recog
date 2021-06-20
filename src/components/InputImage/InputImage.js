import React from 'react';
import './styleImage.css';

const InputImage = ({searchChange, submit}) => {
	return(
		<div>
		<p className='f3 center'> {'Please give your image link here: '} </p>
		  <div className='background pa4 br4 shadow-5 w-60 center'>
		    <input className='f5 pa2 w-70' type= 'tex' onChange = {searchChange}/>
            <button className = 'w-30 grow f4 fw2 link ph1 pv1 dib white bg-light-purple pointer'
            onClick = {submit}> Detect </button>
		  </div>
		</div>
		);
};

export default InputImage;