import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

/**
 * Indexiert alle Komponeten für MainComponents
 * @namespace MainComponents
 */

  /**
   * @method BackButton
   * @memberof MainComponents.BackButton
   * @async
   * @description BackButton für die MainComponents, sorgt dafür um auf die vorherige Komponente zu navigieren
   */

export default function BackButton({ goBack }) {

  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/arrow_back.png')}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 35 + getStatusBarHeight(),
    left: 0,
  },
  image: {
    width: 24,
    height: 24,
  },
})
