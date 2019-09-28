import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import Map from '../components/Map'

import { MonoText } from '../components/StyledText';

export default function HomeScreen() {
  return (
    <View style={styles.container} >
      <Map />
    </View>
   
  )
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
  }
})

