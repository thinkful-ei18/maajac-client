import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import thief from '../images/burglar.svg';
import accident from '../images/accident.svg';
import crime from '../images/flasher.svg';
import other from '../images/warning.svg';
import traffic from '../images/traffic.svg';
import construction from '../images/steamroller.svg';

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
  markerImage(type) {
    if (type === 'theft') {
      return thief;
    } else if (type === 'accident') {
      return accident;
    } else if (type === 'crime') {
      return crime;
    } else if (type === 'other') {
      return other;
    } else if (type === 'traffic') {
      return traffic;
    } else if (type === 'roadconstruction') {
      return construction;
    }
  }
  render() {
    return (
      <Marker
        key={this.props.index}
        icon={{
          url: this.markerImage(this.props.marker.incidentType),
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
