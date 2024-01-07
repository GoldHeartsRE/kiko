import React from 'react'
import { Image, StyleSheet } from 'react-native'

/**
 * Indexiert alle Komponeten für KitaCreationComponents
 * @namespace KitaCreationComponents
 */

/**
 * @method Logo
 * @memberof KitaCreationComponents
 * @async
 * @description Logo Komponente für die KitaCreationComponents, ist das gerescalede Logo des Projekts
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
    width: 150,
    height: 150,
    marginBottom: 30
  }
})
