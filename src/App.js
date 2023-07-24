import React, {Component} from 'react';
import  Navigation from './components/Navigation/Navigation.js';
import  FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import  Logo from './components/Logo/Logo.js';
import  Signin from './components/Signin/Signin.js';
import  Register from './components/Register/Register.js';
import Tilt from 'react-parallax-tilt';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import ParticlesBg from 'particles-bg'

import './App.css';

class App extends Component {
constructor() {
  super();
  this.state = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false
  }
}

calculateFaceLocation = (data) => {

  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  
  //const clarifaiFace = data
  const image = document.getElementById('inputImage');
  const width = Number(image.width);
  const height = Number(image.height);
  console.log(width, height, data.outputs);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}

displayFaceBox = (box) => {

  this.setState({box:box});
}

onInputChange = (event) => {
  this.setState({input: event.target.value})
}

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input});

  const USER_ID = 'psq16az28pjx';
  const PAT = '21228be0f78145f381a8270f71c7b9ed';
  const APP_ID = 'aef8a6834d9044e08326d4614b828c05';
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';    
  const IMAGE_URL = this.state.input;

  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };



  fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
      .catch(error => console.log('error', error));

}

onRouteChange = (route) => {
  if(route=== 'signout') {
    this.setState({isSignedIn: false})
  }
  else if(route === 'home')
  {
    this.setState({isSignedIn:true})
  }
  this.setState({route: route})
}

  render(){
    const {isSignedIn, imageUrl, route, box} = this.state;
  return (
    <div className="App">
       <>
        <div>...</div>
        <ParticlesBg type="cobweb" bg={true} className="particles" num={300} color='#FFFFFF'/>
      </>
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      { route=== 'home' 
       ?  <div>
            <Logo />

            <Rank />
     
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
     
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
       
       : (

        route === 'signin' 
        ? <Signin onRouteChange={this.onRouteChange}/>
        : <Register onRouteChange={this.onRouteChange}/>


       )
       
       
       
      }
    </div>
  );}
}

export default App;
