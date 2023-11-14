import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

export default function ParagraphTitel(props) {
  return <Text style={styles.text} {...props} />
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 40,
    lineHeight: 75,
    textAlign: 'center',
    zIndex: -5
  },
})