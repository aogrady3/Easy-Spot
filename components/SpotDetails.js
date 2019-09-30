import React, { Component } from 'react';
import { Modal, View, ScrollView, Image, StyleSheet, Button, Text } from 'react-native';
import * as firebase from 'firebase'

export default class SpotDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  render() {
      const selectedDriveway = this.props.selectedDriveway
      let user = firebase.auth().currentUser

    return (
    <View styles={styles.modal}>
      <Modal
        style ={styles.modal}
        animationType="slide"
        transparent={false}
        visible={this.props.isModalVisible}
      >
        <View style={{ marginTop: 25 }}>
        <ScrollView >
            <View style={styles.userInfo}>
                <View style={styles.usercontainer}>
                    <Image 
                        style={{width: 150, height: 150, borderColor: 'black', borderWidth: 3, borderRadius: 75, alignSelf: 'center', paddingBottom: 5}}
                        source={{uri: selectedDriveway.userPhotoUrl}}
                        />
                    <Text style={styles.header}>{selectedDriveway.userDisplayName} </Text>
                    <Text style={styles.subHeader}>{selectedDriveway.userEmail}</Text>
                </View>
            </View>
            <View style={styles.spotContainer}>
            <Text style={styles.spotInfo}>Driveway Details</Text>
                <Image 
                        style={{width: 150, height: 150, borderColor: 'black', borderWidth: 1, alignSelf: 'center', paddingBottom: 5}}
                        source={{uri: selectedDriveway.photoUrl}}
                        />
                    <Text style={styles.header}>{selectedDriveway.title} </Text>
                    <Text style={styles.header}>{selectedDriveway.address} </Text>
                    <Text style={styles.subHeader}>{selectedDriveway.description}</Text>
                    <Text style={styles.subHeader}>{selectedDriveway.price}$ per/hour</Text>
            
            {(selectedDriveway.userEmail === user.email) ? <View></View> : 
            <Button title="Confirm Purchase" onPress={() => this.props.confirmPurchase(this.props.selectedDriveway)}/> }
            <Button title="Cancel" onPress={() => {this.props.closeModal()}} />

            </View>
        </ScrollView>

        </View>


      </Modal>
      </View>
    )
  }
}


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
    header: {
      fontWeight: 'bold',
      alignSelf: 'center',
      paddingBottom: 5,
      fontSize: 20
    },
    subHeader: {
      fontSize: 15,
      alignSelf: 'center',
      color: 'gray'
    },
    spotContainer: {
      flex: 1,
      backgroundColor: 'lightgray',
      height: 600
    }
  });
  