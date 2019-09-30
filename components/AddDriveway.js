import React from 'react'
import { StyleSheet, View, Text, TextInput, Button, Modal, Alert, KeyboardAvoidingView} from 'react-native';
const GOOGLE_APIKEY = 'AIzaSyDVhP2V3nCDh2w1XpCLl4YoP5KmtKod7k0';
import Geocoder from 'react-native-geocoding';
import * as firebase from 'firebase';
import { FirebaseWrapper } from '../firebase/firebase';

Geocoder.init(GOOGLE_APIKEY);

export default class AddDriveway extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            title: "",
            address: "",
            description: "",
            photoUrl: "",
            until: "",
            price: "",
            coordinates: ""

        };

        this.onSubmit = this.onSubmit.bind(this)
        this.onCancel = this.onCancel.bind(this)

    }

    componentDidMount() {
        //check to see if user is logged in

    }

    onSubmit() {
        //grab current user
        let user = firebase.auth().currentUser

        Geocoder.from(this.state.address)
            .then(json => {
                let location = json.results[0].geometry.location;
                this.setState({coordinates: location})
            }).then(() => {
                 FirebaseWrapper.GetInstance().CreateNewDocument('markers', {
                    address: this.state.address, 
                    title: this.state.title,
                    description: this.state.description,
                    price: this.state.price,
                    coordinates: this.state.coordinates,
                    photoUrl: this.state.photoUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/No_image_available_600_x_450.svg/600px-No_image_available_600_x_450.svg.png",
                    userDisplayName: user.displayName,
                    userPhotoUrl: user.photoURL,
                    userEmail: user.email,
                })
                this.props.closeDriveway()
            })
    }

    onCancel() {
        this.props.closeDriveway()

        }

    render () {
        return (
            <Modal
            animationType="slide"
            transparent={false}
            visible={this.props.isAddDrivewayVisible}
            >
                
            <KeyboardAvoidingView 
            style={styles.container}
            behavior='padding' >
            <View style={styles.container}>
                <Text style={styles.text}>Please Provide Driveway Information</Text>
                <View style={styles.inputContainer}>
                <TextInput style={styles.input}
                    value={this.state.title}
                    onChangeText={(text) => {this.setState({title: text})}}
                    placeholder={"Display Title..."}
            
                />
                </View>

                <View style={styles.inputContainer}>
                <TextInput style={styles.input}
                    value={this.state.address}
                    onChangeText={(text) => {this.setState({address: text})}}
                    placeholder={'Address...'}
                />
                </View>

                <View style={styles.inputContainer}>
                <TextInput style={styles.input}
                    value={this.state.price}
                    onChangeText={(text) => {this.setState({price: text})}}
                    placeholder={'Price...'}
                />
                <Text>/per Hour</Text>
                </View>

                <View style={styles.inputContainer}>
                <TextInput style={styles.input}
                    value={this.state.description}
                    onChangeText={(text) => {this.setState({description: text})}}
                    placeholder={'Special Instructions...'}
                />
                </View>

                <View style={styles.inputContainer}>
                <TextInput style={styles.input}
                    value={this.state.photoUrl}
                    onChangeText={(text) => {this.setState({photoUrl: text})}}
                    placeholder={'Photo...'}
                />
                </View>

                <View style={styles.inputContainer}>
                <TextInput style={styles.input}
                    value={this.state.until}
                    onChangeText={(text) => {this.setState({until: text})}}
                    placeholder={'Until...'}
                />
                </View>

                <Button title ="Submit" onPress={this.onSubmit} />
                <Button title='Cancel' onPress={this.onCancel} />

            </View>
            </KeyboardAvoidingView>
        </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#96C3CE',
        alignContent: 'center'
    },
    inputContainer :{
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        marginBottom: 20,
        marginLeft: 70,
        width:250,
        height:45,
        flexDirection: 'row',
        alignItems:'center'
    },
    input : {
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    text: {
        alignContent: 'center',
        fontWeight: '900',
        fontSize: 30,
        color: 'black',
        justifyContent: 'center',
        paddingLeft: 20
    }
})