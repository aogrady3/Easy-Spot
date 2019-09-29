import React from 'react';
import { StyleSheet, Text, View, Modal, Dimensions} from 'react-native';
import { SearchBar } from 'react-native-elements'
import MapView from "react-native-maps";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Header from './Header'
const GOOGLE_MAPS_APIKEY = 'AIzaSyDVhP2V3nCDh2w1XpCLl4YoP5KmtKod7k0';
import MapViewDirections from 'react-native-maps-directions';
import SpotDetails from './SpotDetails'
import { FirebaseWrapper } from '../firebase/firebase';


const { width, height } = Dimensions.get('screen')


export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        isModalVisible: false,
        latitude: 0,
        longitude: 0,
        desLatitude: null,
        desLongitude: null, 
        markers: []
        
        // markers: [{
        //   id: 2,
        //   title: 'hello',
        //   coordinates: {
        //     latitude: 40.730610,
        //     longitude: -74.0060,
        //   },
        // }, {
        //   id: 5,
        //   title: 'New Spot!',
        //   coordinates: {
        //     latitude: 37,
        //     longitude: -122
        //   }
        // }, {
        //     id: 6,
        //     title: 'Newer Spot!',
        //     coordinates: {
        //       latitude: 37.11,
        //       longitude: -121
        //     }
          
        // }]    
    }
    this.handleOnPress = this.handleOnPress.bind(this)
    this.closeModal = this.closeModal.bind(this)
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
    this.setState({ desLatitude: marker.coordinates._lat, desLongitude: marker.coordinates._long, isModalVisible: true})
  }

  closeModal () {
    this.setState({isModalVisible: false})
  }

  
  render() {
    //Origin variable
    const origin = {latitude: this.state.latitude, longitude: this.state.longitude};
    const destination = {latitude: this.state.desLatitude, longitude: this.state.desLongitude};

    console.log('HERE IS STATE', this.state.markers)


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
             console.log('HERE IS ONE MARKERRR FROM MAP', marker)
           return (
             <MapView.Marker 
              key={marker.docid}
              coordinate={marker.coordinates}
              title={marker.titile}
              onPress={() => this.handleOnPress(marker)}
             />
           )
         })}

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
