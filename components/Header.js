import React from 'react'
import { StyleSheet, Text, View } from 'react-native';


const Header = (props) => {
    return (
    <View style={styles.header}>
        <Text style={styles.text}>{props.title}</Text>
    </View>
    )
}

export default Header


const styles = StyleSheet.create({
    header: {
      color: 'white',
      backgroundColor: 'lightblue',
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',

    }, 
    text: {
        color: 'white',
        fontSize: 28,
        fontWeight: '900'
    }
  });