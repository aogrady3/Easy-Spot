import React from 'react';
import { StyleSheet, Text, View, Modal, Dimensions, TouchableOpacity, Image, Button} from 'react-native';
import { SearchBar } from 'react-native-elements'
import MapView from "react-native-maps";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

import GOOGLE_MAPS_APIKEY from "../constants/googleApI"

import MapViewDirections from 'react-native-maps-directions';
import SpotDetails from './SpotDetails'
import { FirebaseWrapper } from '../firebase/firebase';
import AddDriveway from './AddDriveway'


const { width, height } = Dimensions.get('screen')


class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        isModalVisible: false,
        isAddDrivewayVisible: false,
        latitude: 0,
        longitude: 0,
        desLatitude: null,
        desLongitude: null, 
        selectedDriveway: {},
        markers: []
    }
    this.handleOnPress = this.handleOnPress.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.closeDriveway = this.closeDriveway.bind(this)
    this.confirmPurchase = this.confirmPurchase.bind(this)
  }

  //Get A Users Location!
  async componentDidMount() {
      this._getLocationAsync();
      await FirebaseWrapper.GetInstance().SetupCollectionListener('markers', (markers) => this.setState({markers: markers}))
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
    this.setState({ isModalVisible: true, selectedDriveway: marker})

  }

  closeModal () {
    this.setState({isModalVisible: false})
  }

  closeDriveway () {
    this.setState({isAddDrivewayVisible: false})
  }

  confirmPurchase(marker) {
      this.setState({desLatitude: marker.coordinates.lat, desLongitude: marker.coordinates.lng, isModalVisible: false})

  }
  
  render() {
    //Origin variable
    const origin = {latitude: this.state.latitude, longitude: this.state.longitude};
    const destination = {latitude: this.state.desLatitude, longitude: this.state.desLongitude};

    //Needed for color assignment
    let user = firebase.auth().currentUser

      return (
        //Render MapVIew
        <View style={styles.container}>
        <MapView 
          style={styles.map}
          provider="google"
          region = {{
            longitudeDelta: 0.04,
            latitudeDelta: 0.05,
            latitude: this.state.latitude,
            longitude: this.state.longitude
          }}
          showsUserLocation={true}
        >

        <View style={{justifyContent: 'center'}}>
        <SearchBar 
            lightTheme
            containerStyle={{justifyContent: 'flex-end', width: 0, height: 0}}
            inputStyle={{justifyContent: 'flex-end'}}
            inputContainerStyle={{backgroundColor: 'white', width: width, justifyContent: 'center'}}
            placeholder={'Search for your next spot...'}
        />

        </View>
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
            //process color
            let color = "red"
            if(user.email === marker.userEmail) color ="blue"

           return (
             <MapView.Marker 
              key={marker.docid}
              coordinate={{latitude: marker.coordinates.lat, longitude: marker.coordinates.lng}}
              title={marker.titile}
              onPress={() => this.handleOnPress(marker)}
              pinColor={color}
             />
           )
         })}
        </MapView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.setState({isAddDrivewayVisible: true})}
            style={styles.button} >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

         <View style={styles.modal}>
          <SpotDetails isModalVisible={this.state.isModalVisible} 
            closeModal={() => this.closeModal()} 
            selectedDriveway ={this.state.selectedDriveway}
            confirmPurchase={this.confirmPurchase}
            />
         </View>

         <View style={styles.modal}>
          <AddDriveway isAddDrivewayVisible={this.state.isAddDrivewayVisible} 
          closeDriveway={() => this.closeDriveway()}
          />
         </View>

        </View>

        
    );
    }
  
    }

    export default Map;
   

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
    }, 
      button: {
        width: 20,
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 25,
        alignItems: 'center',
      },
      buttonContainer: {
        flexDirection: 'row',
        width: 50,
        height: 50,
        position: 'absolute',
        bottom:10,
        right:10,
        justifyContent: 'center'
      },
      buttonText: {
        fontSize: 50,
      }
    });
