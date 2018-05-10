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
  markerImage(type) {
    if (type === 'Theft') {
      return 'http://res.cloudinary.com/dw6hemcpj/image/upload/v1525883157/map_icon_theft.png';
    } else if (type === 'Accident') {
      return 'http://res.cloudinary.com/dw6hemcpj/image/upload/v1525883156/map_icon_accident.png';
    } else if (type === 'Crime') {
      return 'http://res.cloudinary.com/dw6hemcpj/image/upload/v1525883156/map_icon_crime.png';
    } else if (type === 'Other') {
      return 'http://res.cloudinary.com/dw6hemcpj/image/upload/v1525883157/map_icon_other.png';
    } else if (type === 'Road-Construction') {
      return 'http://res.cloudinary.com/dw6hemcpj/image/upload/v1525883156/map_icon_traffic_construction.png';
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
