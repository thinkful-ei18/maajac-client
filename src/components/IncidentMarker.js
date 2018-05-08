import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import thief from '../images/burglar.svg';

export default class IncidentMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  onToggleOpen() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Marker
        key={this.props.index}
        icon={{
          url:
            this.props.marker.incidentType === 'theft'
              ? thief
              : this.props.marker.icon,
          scaledSize: { width: 50, height: 50 }
        }}
        position={{
          lat: this.props.marker.location.lat,
          lng: this.props.marker.location.lng
        }}
        onClick={() => this.onToggleOpen()}
      >
        {this.state.isOpen && (
          <InfoWindow onCloseClick={() => this.onToggleOpen()}>
            <div>
              <p>{this.props.marker.incidentType}</p>
              <p>{this.props.marker.description}</p>
              <p>{this.props.marker.time}</p>
              <p>{this.props.marker.date}</p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  }
}
