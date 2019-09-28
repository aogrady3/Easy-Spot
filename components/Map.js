import React from 'react';
import { StyleSheet, Text, View, Modal, Dimensions} from 'react-native';
import MapView from "react-native-maps";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Header from './Header'
const GOOGLE_MAPS_APIKEY = 'AIzaSyDVhP2V3nCDh2w1XpCLl4YoP5KmtKod7k0';
import MapViewDirections from 'react-native-maps-directions';
import SpotDetails from './SpotDetails'

const { width, height } = Dimensions.get('screen')


export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        isModalVisible: true,
        latitude: 0,
        longitude: 0,
        desLatitude: null,
        desLongitude: null, 
        markers: [{
          id: 2,
          title: 'hello',
          coordinates: {
            latitude: 40.730610,
            longitude: -74.0060,
          },
        }, {
          id: 5,
          title: 'New Spot!',
          coordinates: {
            latitude: 37,
            longitude: -122
          }
        }, {
            id: 6,
            title: 'Newer Spot!',
            coordinates: {
              latitude: 37.11,
              longitude: -121
            }
          
        }]    
    }
    this.handleOnPress = this.handleOnPress.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  //Get A Users Location!
  componentDidMount() {
      this._getLocationAsync();

      this.setState({
        desLatitude: 37,
        desLongitude: -122
      })
  }

  //Ask User for Current Location!
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    //Set State to Current Location!
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    
  };

  handleOnPress = (marker) => {
    this.setState({ desLatitude: marker.coordinates.latitude, desLongitude: marker.coordinates.longitude})
  }

  closeModal () {
    this.setState({isModalVisible: false})
  }
  
  render() {
    //Origin variable
    const origin = {latitude: this.state.latitude, longitude: this.state.longitude};
    const destination = {latitude: this.state.desLatitude, longitude: this.state.desLongitude};

      return (
        //Render MapVIew
        <View style={styles.container}>
        <MapView 
          style={styles.map}
          provider="google"
          region = {{
            longitudeDelta: 10,
            latitudeDelta: 10,
            latitude: this.state.latitude,
            longitude: this.state.longitude
          }}
          showsUserLocation={true}
        >
         <Header title={"Hello! Click Below to Find a Spot!"} />

         {(destination.latitude) ?  
         <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor={"red"}
          /> : 
          <View></View>
          }

         {this.state.markers.map(marker => {
           return (
             <MapView.Marker 
              key={marker.id}
              coordinate={marker.coordinates}
              title={marker.titile}
              onPress={() => this.handleOnPress(marker)}
             />
           )
         })}
        

        <View 
        style ={{
          flex: 1,
          width: width,
          height: height * 0.25,
          alignSelf: 'center',
          position: 'absolute',
          bottom: height * 0.01,
          backgroundColor: 'white'
        }}> 
        </View>
        </MapView>
         <View style={styles.modal}>
          <SpotDetails isModalVisible={this.state.isModalVisible} closeModal={() => this.closeModal()}/>
         </View>
        </View>
    );
    }
  
    }
   

    const styles = StyleSheet.create({
      container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      modal: {
        width: 2,
        height: 2,
        marginTop: 10
    }
    });
