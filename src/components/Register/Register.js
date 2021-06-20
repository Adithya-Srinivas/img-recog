import React from 'react';

class Register extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      email : '',
      password: '',
      name: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({email : event.target.value})
  }
  
  onPasswordChange = (event) => {
    this.setState({password : event.target.value})
  }

  onNameChange = (event) => {
    this.setState({name : event.target.value})
  }
  
  onRegister = (event) => {
    fetch('https://image-facerecog.herokuapp.com/register', {
      method : 'post',
      headers : {'Content-Type':'application/json' },
      body : JSON.stringify({
        email : this.state.email,
        password : this.state.password,
        name : this.state.name
      })
    })
      .then(response => response.json())
      .then(user => {
         if (user.id){
          this.props.loadUser(user);
          this.props.currentRoute(false);
         }
        })
    }

  render(){
  const {currentRoute} = this.props
	return(
   <article className="center shadow-5 br4 ba dark-gray b--black-10 mv6 w-100 w-50-m w-25-l mw7">
    <main className="pa2 black-80">
      <form className="measure">
       <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
         <legend className="center f3 fw6 ph0 mh0">Register</legend>
        <div className="mt1">
         <label className="db fw6 lh-copy f4" htmlFor="email-address">Name</label>
         <input className="f3 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
         type="text" 
         name="name" 
         id="name"
         onChange = {this.onNameChange}
         />
        </div>
        <div className="mt1">
         <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
         <input className="f3 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
         type="email" 
         name="email-address" 
         id="email-address"
         onChange = {this.onEmailChange}
         />
        </div>
        <div className="mv2">
         <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
         <input className="f3 b input-reset ba bg-transparent hover-bg-black hover-white w-100" 
         type="password" 
         name="password"  
         id="password"
         onChange = {this.onPasswordChange}
         />
        </div>
      </fieldset>
      <div className="center">
       <input 
       onClick = {this.onRegister}
       className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
       type="button" 
       value="Register"/>
      </div>
      <div 
        onClick = {() => currentRoute(false)}
        className="center lh-copy pointer">
        <p className="mt2 f6 link dim black db">Sign Up</p>
      </div>
      </form>
   </main>
  </article> 
		);
  }
};

export default Register;