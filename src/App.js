import React, {Component} from 'react';
import Particles from 'react-particles-js';
import './App.css'
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignUp from './components/SignUp/SignUp';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import InputImage from './components/InputImage/InputImage';

const properties = {
	"particles": {
    "number": {
      "value": 10,
      "density": {
        "enable": true,
        "value_area": 150
      }
    }
   }  
};


const intialState = {
      input : '',
      imgUrl: '',
      box : {},
      route : false,
      user : {
       id : '',
       name : '',
       email : '',
       password : '',
       entries : 0,
       joined : ''
      }
}



class App extends Component {
  constructor(){
    super()
    this.state = intialState;
  }
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width-(clarifaiFace.right_col * width),
      bottomRow: height-(clarifaiFace.bottom_row * height)  
    }
  };
  
  currentRoute = (route) => {
    this.setState({route : route})
  }

  loadUser = (data) => {
    this.setState({user : {
      id : data.id,
      name : data.name,
      email : data.email,
      password : data.password,
      entries : data.entries,
      joined : data.joined
    }})
  }

  displayBox = (box) => {
    this.setState({box: box});
  }
  
  signOut = (route) => {
    this.setState(intialState)
  }

  onSearchChange = (event) => {
     this.setState({input:event.target.value})
  };

  onSubmit = () => {
    this.setState({imgUrl: this.state.input});
      fetch('https://image-facerecog.herokuapp.com/imageUrl',{
        method : 'post',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify({
          input : this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response){
          fetch('https://image-facerecog.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
              this.setState(Object.assign(this.state.user,{entries: count}))
          })
        }
        this.displayBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  render(){
    return(
    <div>
    <Particles className='particles'
      params={properties} />
    { this.state.route === false
    ? <SignUp loadUser = {this.loadUser} currentRoute = {this.currentRoute}/>
    : (this.state.route === 'register' ? <Register loadUser = {this.loadUser} currentRoute = {this.currentRoute} />
      :
      <div>
       <Navigation currentRoute={this.currentRoute} signOut={this.signOut}/>
       <Logo />
       <Rank name={this.state.user.name} entries={this.state.user.entries} />
       <InputImage searchChange ={this.onSearchChange} submit = {this.onSubmit}/>
       <FaceRecognition box = {this.state.box} image = {this.state.imgUrl}/>
      </div>)
    }
    </div>
    );
  };
};

export default App;



