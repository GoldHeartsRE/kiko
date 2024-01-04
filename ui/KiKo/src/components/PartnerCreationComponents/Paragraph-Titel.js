import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

/**
 * @method ParagraphTitel
 * @memberof PartnerCreationComponent.ParagraphTitel
 * @async
 * @description ParagraphTitel für die PartnerCreationComponent, größere Paragraphen
 */

export default function ParagraphTitel (props) {
  return <Text style={styles.text} {...props} />
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 40,
    textAlign: 'center',
    zIndex: -5
  }
})
