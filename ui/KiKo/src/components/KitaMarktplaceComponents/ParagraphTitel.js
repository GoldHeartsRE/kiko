import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

  /**
   * @method ParagraphTitel
   * @memberof KitaMarketplaceComponents.ParagraphTitel
   * @async
   * @description ParagraphTitel für die KitaMarketplaceComponents, größer und fetter im Gegensatz zum normalen Paragraph
   */

export default function ParagraphTitel(props) {
  return <Text style={styles.text} {...props} />
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '200',
    fontSize: 30,
    bottom: 5,
  },
})