import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

export default function HeaderLogo() {
  return ( 
    <View style={styles.header}>
  <Image source={require('../../assets/logo-kiko.png')} style={styles.image} />
  </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
  },
})