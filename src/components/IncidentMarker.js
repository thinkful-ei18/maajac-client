import React from 'react';

import { Marker, InfoWindow } from 'react-google-maps';

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
        icon={this.props.marker.icon}
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
