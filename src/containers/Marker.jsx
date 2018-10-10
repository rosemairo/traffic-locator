import React from "react";
import { compose, withStateHandlers, lifecycle } from "recompose";
import {
  KmlLayer,
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  Polyline,
  TrafficLayer,
  BicyclingLayer,
  DirectionsRenderer
} from "react-google-maps";

const Map = compose(
  withStateHandlers(
    () => ({
      isMarkerShown: false,
      markerPosition: null,
      isOpen: false,
    }),  
  ),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const google = window.google;
      const DirectionsService = new google.maps.DirectionsService();
      const DistanceMatrixService = new google.maps.DistanceMatrixService();

      DirectionsService.route({
        origin: this.props.source,
        destination: this.props.destination,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
 
      DistanceMatrixService.getDistanceMatrix({
          origins: [{ lat: this.props.source.lat(), lng: this.props.source.lng() }],
          destinations: [{ lat: this.props.destination.lat(), lng: this.props.destination.lng() }],
          travelMode: window.google.maps.TravelMode.DRIVING,
          avoidHighways: false,
          avoidTolls: false,
          unitSystem: window.google.maps.UnitSystem.IMPERIAL
        },(response, status) => {
          console.log (response);
          console.log(status);
        }
    );
        
    }
  })
)(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={props.destination && { lat: props.destination.lat(), lng: props.destination.lng() }}
    onClick={props.onMapClick}
  >
    {props.source && <Marker position={{ lat: props.source.lat(), lng: props.source.lng() }} />}
    {props.destination && <Marker position={{ lat: props.destination.lat(), lng: props.destination.lng() }} />}
    <Polyline 
        path={[
          { lat: props.source.lat(), lng: props.source.lng() },
          { lat: props.destination.lat(), lng: props.destination.lng() }
        ]} 
        geodesic={true} 
        options={{ 
                  strokeColor: '#ff2527',
                  strokeOpacity: 0.0,
                  strokeWeight: 2,
                  
                }}
    />
    <KmlLayer
      url="http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml"
      options={{ preserveViewport: true }}
    />
    <TrafficLayer autoUpdate />
    <BicyclingLayer autoUpdate />
    {props.directions && <DirectionsRenderer directions={props.directions} />}
          
  </GoogleMap>
));

export default class MapContainer extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {

  }

  render() {
    
    return (
      <div className="fullscreen">
        <Map
          source={this.props.source}
          destination={this.props.destination}
          googleMapURL="https://maps.googleapis.com/maps/api/js/directions/outputformat?key=AIzaSyBzurElGwFmO1TWtI6JASEKNPXfdBZx214"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `600px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
