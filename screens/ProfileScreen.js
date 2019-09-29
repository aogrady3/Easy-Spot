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
    <ScrollView style={styles.container}>
      <View>
        <Text>Profile Infromation</Text>
        <Text>Email: {user.email}</Text>
        <Text>Name: {user.displayName} </Text>
        <Image 
          style={{width: 70, height: 70, borderColor: 'green', borderWidth: 5, borderRadius: 25}}
          source={{uri: user.photoURL}}
          />
        
      </View>
    </ScrollView>
  );
}
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
