import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image} from 'react-native';
import * as firebase from 'firebase';

export default class ProfileScreen extends React.Component {

  componentDidMount() {
    

  }

  render () {
    let user = firebase.auth().currentUser
    console.log('HERE is USER', user)

  return (
    <ScrollView >
      <View style={styles.userInfo}>
        <View style={styles.usercontainer}>
      <Image 
          style={{width: 150, height: 150, borderColor: 'black', borderWidth: 3, borderRadius: 75, alignSelf: 'center', paddingBottom: 5}}
          source={{uri: user.photoURL}}
          />
        <Text style={styles.displayName}>{user.displayName.toUpperCase()} </Text>
        <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
      <View style={styles.spotContainer}>
        <Text style={styles.spotInfo}>Your rent history</Text>
      </View>
    </ScrollView>
  );
}
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

const styles = StyleSheet.create({
  userInfo: {
    flex: 1,
    height: 250,
    backgroundColor: 'lightblue',
    justifyContent: "center"
    },
    usercontainer: {
      justifyContent: 'center'
    },
  spotInfo: {
    fontWeight: 'bold',
    paddingBottom: 5,
    fontSize: 20,
    alignSelf: 'center'
  },
  displayName: {
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingBottom: 5,
    fontSize: 20
  },
  email: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'gray'
  },
  spotContainer: {
    flex: 1,
    backgroundColor: 'lightgray',
    height: 900
  }
});
