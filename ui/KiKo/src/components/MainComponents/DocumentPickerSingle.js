import React, { useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../../theme/theme'

export default function DocumentPickerSingle ({ test, mode, style, ...props }) {
  const [fileResponse, setFileResponse] = useState([])

  return (
    <SafeAreaView style={styles.button}>
      <StatusBar barStyle={'dark-content'} />
      {fileResponse?.map((file, index) => (
        <Text
          key={index.toString()}
          style={styles.uri}
          numberOfLines={1}
          ellipsizeMode={'middle'}
        >
          {file?.assets[0].name}
        </Text>
      ))}
      <PaperButton
        // onPress={handleDocumentSelection}
        style={[
          styles.button,
          mode === 'outlined' && { backgroundColor: theme.colors.surface },
          style
        ]}
        labelStyle={styles.text}
        mode={mode}
        {...props}
        icon={'upload'}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
    zIndex: -10
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26
  }
})
