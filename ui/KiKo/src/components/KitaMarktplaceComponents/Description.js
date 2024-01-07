import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { theme } from '../../theme/theme'

/**
 * @method Description
 * @memberof KitaMarketplaceComponents
 * @async
 * @description Description für die KitaMarketplaceComponents, ist ein übergroßes Textinput Feld
 */

export default function Description ({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text} {...props} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    height: 150,
    zIndex: -100
  },
  text: {
    zIndex: 100,
    fontSize: 15
  }
})
