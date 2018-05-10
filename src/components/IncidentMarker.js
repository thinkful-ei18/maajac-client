import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import './css/marker.css';

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

  convert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
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
            <div className='marker-info'>
              <img src={this.markerImage(this.props.marker.incidentType)} alt=""/>
              <h1 className='marker-header'>{this.props.marker.incidentType}</h1>
              <p>
                <span className='marker-desc'>{this.props.marker.description}</span>
                <br/><span className='marker-date'>{this.props.marker.date}</span>
                <span className='marker-time'>{this.props.marker.time}</span>
              </p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  }
}
