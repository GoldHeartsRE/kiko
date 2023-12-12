import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../../theme/theme'

export default function Button({ mode, style, ...props }) {
  return (
      <PaperButton
        style={[
          styles.button,
          mode === 'outlined' && { backgroundColor: theme.colors.surface },
          style,
        ]}
        labelStyle={styles.text}
        mode={mode}
        {...props}
      />
  )
} 

const styles = StyleSheet.create({
  button: {
    width: '50%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  }
})