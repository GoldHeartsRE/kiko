import React from 'react'
import { Image, StyleSheet } from 'react-native'

/**
 * @method LogoHeader
 * @memberof MainComponents.LogoHeader
 * @async
 * @description LogoHeader für die MainComponents, setzt für den Header das Logo fest
 */

export default function LogoHeader () {
  return (
    <Image
      source={require('../../assets/logo-kiko.png')}
      style={styles.image}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50
  }
})
