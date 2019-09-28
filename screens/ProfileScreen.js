import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text>PLACEHOLDER PROFILE INFORMATION</Text>
      </View>
    </ScrollView>
  );
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
