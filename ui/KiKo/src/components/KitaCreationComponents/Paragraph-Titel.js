import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

/**
 * @method ParagraphTitel
 * @memberof KitaCreationComponents.ParagraphTitel
 * @async
 * @description ParagraphTitel Komponente für die KitaCreationComponents, größer und fetter im Gegensatz zum normalen Paragraph
 */

export default function ParagraphTitel (props) {
  return <Text style={styles.text} {...props} />
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '200',
    fontSize: 40,
    lineHeight: 50,
    textAlign: 'center'
  }
})
