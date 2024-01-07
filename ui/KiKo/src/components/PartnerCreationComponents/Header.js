import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

/**
 * @method Header
 * @memberof PartnerCreationComponent
 * @async
 * @description Header für die PartnerCreationComponent, setzt den Header für Profilerstellung fest
 */

export default function Header ({ mode, style, ...props }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text} {...props} />
      <Image
        source={require('../../assets/logo-kiko.png')}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    marginTop: -40,
    alignSelf: 'flex-end'
  },
  container: {
    width: '100%',
    maxHeight: 60,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    top: -173
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 15
  }
})
