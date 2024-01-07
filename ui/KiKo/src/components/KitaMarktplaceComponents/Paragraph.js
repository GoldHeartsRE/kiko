import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

/**
 * @method Paragraph
 * @memberof KitaMarketplaceComponents
 * @async
 * @description Paragraph für die KitaMarketplaceComponents
 */

export default function Paragraph (props) {
  return <Text style={styles.text} {...props} />
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    lineHeight: 35,
    marginTop: 15
  }
})
