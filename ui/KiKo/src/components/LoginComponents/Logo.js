import React from 'react'
import { Image, StyleSheet } from 'react-native'

/**
 * @method Logo
 * @memberof LoginComponents
 * @async
 * @description Logo für die LoginComponents, größer gescaled
 */

export default function Logo () {
  return (
    <Image
      source={require('../../assets/logo-kiko.png')}
      style={styles.image}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    marginBottom: 35,
    zIndex: 100
  }
})
