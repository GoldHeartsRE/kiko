import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../../theme/theme'

/**
 * @method Button
 * @memberof LoginComponents
 * @async
 * @description Button für die LoginComponents
 */

export default function Button ({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && { backgroundColor: theme.colors.surface },
        style
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 0,
    paddingVertical: 2
  },
  text: {
    fontWeight: 'bold',
    fontSize: 70,
    lineHeight: 150
  }
})
