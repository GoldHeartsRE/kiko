import React from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../../theme/theme'

export default function BigTextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input multiline
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
    zIndex: -5,
  },
  input: {
    backgroundColor: theme.colors.surface,
    height: 300
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
})
