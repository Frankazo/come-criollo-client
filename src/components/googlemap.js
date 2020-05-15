import React, { Component } from 'react'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'
import Spinner from './Spinner'
import Geocode from 'react-geocode'

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey('AIzaSyAAS4VmqUXQay77bE1eTtbJf3Gmzk7CqVo')

// set response language. Defaults to english.
Geocode.setLanguage('en')

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion('es')

// Enable or disable logs. Its optional.
Geocode.enableDebug()

const mapStyles = {
  width: '75%',
  height: '75%'
}

export class MapContainer extends Component {
  state = {
    // Hides or the shows the infoWindow
    showingInfoWindow: false,
    // Shows the active marker upon click
    activeMarker: {},
    // Shows the infoWindow to the selected place upon a marker
    selectedPlace: {},
    lati: null,
    lngi: null
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  componentDidMount () {
    // Get latidude & longitude from address.
    Geocode.fromAddress(this.props.address)
      .then(response => {
        const { lat, lng } = response.results[0].geometry.location
        this.setState({
          lati: lat,
          lngi: lng
        })
      },
      error => {
        console.error(error)
      }
      )
  }

  render () {
    const { lati, lngi } = this.state

    let jsx
    if (!lati) {
      jsx = <Spinner />
    } else {
      jsx = (
        <Map
          google={this.props.google}
          zoom={15}
          style={mapStyles}
          initialCenter={{
            lat: lati,
            lng: lngi
          }}
        >
          <Marker
            onClick={this.onMarkerClick}
            name={'Park St'}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
      )
    }

    return (jsx)
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAAS4VmqUXQay77bE1eTtbJf3Gmzk7CqVo'
})(MapContainer)
