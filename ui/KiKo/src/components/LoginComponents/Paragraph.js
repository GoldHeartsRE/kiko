import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

  /**
   * @method Paragraph
   * @memberof LoginComponents.Paragraph
   * @async
   * @description Paragraph für die LoginComponents
   */

export default function Paragraph(props) {
  return <Text style={styles.text} {...props} />
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 12,
  },
})