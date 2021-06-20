import React from 'react';


class SignUp extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      signInEmail : '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail : event.target.value})
  }
  
  onPasswordChange = (event) => {
    this.setState({signInPassword : event.target.value})
  }
  
  onSignIn = (event) => {
    fetch('https://image-facerecog.herokuapp.com/signin', {
      method : 'post',
      headers : {'Content-Type':'application/json' },
      body : JSON.stringify({
        email : this.state.signInEmail,
        password : this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
         if(user.id){ 
          this.props.loadUser(user);
          this.props.currentRoute('home');
         }
        })
    }

  render(){
  const {currentRoute} = this.props
	return(
   <div>
   <h1 className="center f2 ph1 mh1"> A web app to detect face </h1>
   <article className="center shadow-5 br4 ba dark-gray b--black-10 mv6 w-100 w-50-m w-25-l mw7">
    <main className="pa2 black-80">
      <form className="measure">
       <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
         <legend className="center f2 fw6 ph0 mh0">Sign In</legend>
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
       onClick = {this.onSignIn}
       className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
       type="button" 
       value="Sign in"/>
      </div>
      <div className="center lh-copy">
        <p 
        onClick = {() => currentRoute('register')}
        className="pointer mt2 f6 link dim black db">Register</p>
      </div>
      </form>
   </main>
  </article> 
 </div>
		);
  };
};

export default SignUp;