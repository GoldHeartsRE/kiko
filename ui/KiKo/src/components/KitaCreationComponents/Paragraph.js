import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

  /**
   * @method Paragraph
   * @memberof KitaCreationComponents.Paragraph
   * @async
   * @description Paragraph Komponente für die KitaCreationComponents
   */

export default function Paragraph(props) {
  return <Text style={styles.text} {...props} />
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    marginBottom: 30,
  },
})