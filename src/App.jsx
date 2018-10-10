import React, { Component } from "react";
import Map from "./components/Map";
import './App.css';


class App extends Component {
  state = {

}
  render() {
     return (
      <div>
       <Map google={window.google} />
    
      </div>
    );
  }
}

export default App;
