import React, { Component } from "react";
import Marker from "../containers/Marker";
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
import { Link } from "react-router-dom";
import storage from "../helpers/storage";

const API_KEY = "AIzaSyBzurElGwFmO1TWtI6JASEKNPXfdBZx214";


class Map extends Component {
  state = {
    name: "",
    newsLetter: "",
    location: "",
    locationValue: "",
    destination: "",
    destinationValue: "",
    destinationCode: null,
    locationCode: null
  };

  handleNameInput = (e) => {
    this.setState({
      name: e.target.value
    }); 
  };

  handleNewsletter = e => {
    this.setState({
      newsLetter: e.target.value
    });
  };
  submitNewsLetter = e => {
    const newsLetter = this.state
    alert(`succesful ${newsLetter}`)
  }
  handleLocationSuggest = (geocodedPrediction, originalPrediction) => {
    this.setState({
      location: geocodedPrediction.formatted_address,
      locationValue: geocodedPrediction.formatted_address,
      locationCode: geocodedPrediction.geometry.location
    });
  };

  handleDestinationSuggest = (geocodedPrediction, originalPrediction) => {
    this.setState(
      {
        destination: geocodedPrediction.formatted_address,
        destinationValue: geocodedPrediction.formatted_address,
        destinationCode: geocodedPrediction.geometry.location
      },
      () => this.saveHistory()
    );
  };

  static defaultProps = {
    center: {
      lat: -34.397,
      lng: 150.644
    },

    zoom: 10
  };

  saveHistory = () => {
    const { name, destination, location } = this.state;
    const value = {
      name,
      destination,
      location,
      date: new Date()
    };

    storage.saveHistory(value);
 
  };

  render() {
    const { name, newsLetter, location, destination } = this.state;
    return (
      <div className="container">
        <ReactGoogleMapLoader
          params={{
            key: API_KEY,
            libraries: "places,geocode,geometry"
          }}
          render={googleMaps =>
            googleMaps && (
              <div className="row map-form">
                <div className="col-md-3 google-form">
                  <h2 className="my-3 text-center">
                   Track your way
                   </h2>
                    <div >
                      <input 
                      className="input-style form-control my-3"
                      type="text"
                      value={name} 
                      placeholder="Enter name"
                      onInput={this.handleNameInput}
                      onChange={e =>
                      this.setState({
                        name: e.target.value})  
                      }
                      />
                    </div>
                  <ReactGooglePlacesSuggest
                    googleMaps={googleMaps}
                    autocompletionRequest={{
                      input: location
                    }}
                    onSelectSuggest={this.handleLocationSuggest}
                  >
                    <input
                      className="form-control input-style mb-3"
                      type="text"
                      value={location}
                      placeholder="Enter location"
                      onChange={e =>
                        this.setState({ location: e.target.value })
                      }
                    />
                  </ReactGooglePlacesSuggest>
                  <ReactGooglePlacesSuggest
                    googleMaps={googleMaps}
                    autocompletionRequest={{
                      input: destination
                    }}
                    onSelectSuggest={this.handleDestinationSuggest}
                  >
                    <input
                      className="form-control input-style"
                      type="text"
                      value={destination}
                      placeholder="Enter destination"
                      onChange={e =>
                        this.setState({ destination: e.target.value })
                      }
                    />
                  </ReactGooglePlacesSuggest>
                  <div  className="history-button">
                  <button className="history-btn">
                    <Link className="link" to="/history">view history</Link>
                  </button>
                  </div>
                  <div className="newsletter">
                    <div className="newsletter-text">
                      <h6>Subscribe for latest updates and newsletters</h6>
                    </div>
                    <div>
                      <input className="form-control"
                      type="text" 
                      placeholder="someone@gmail.com"
                      value= {newsLetter}
                      onInput={this.handleNewsletter} 
                      onchange={e =>
                      this.setState({
                        newsLetter: e.target.value
                      })}
                      />
                    </div>
                      <div className="newsletter-button my-2">
                        <button className="newsletter-btn btn btn-primary"
                        onSubmit={this.submitNewsLetter}>
                        Subscribe
                        </button>
                      </div>
                  </div>
                </div>

                <div className="col-md-9">
                  {this.state.destinationCode && (
                    <Marker
                      source={this.state.locationCode}
                      destination={this.state.destinationCode}
                    />
                  )}
                </div>
              </div>
            )
          }
        />
      </div>
    );
  }
}

export default Map;
