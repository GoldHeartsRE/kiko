import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
  TextInput
} from 'react-native-paper'
import { theme } from '../../theme/theme'

/**
 * @method TextInputPassword
 * @memberof LoginComponents
 * @async
 * @description TextInputPassword für die LoginComponents, ermöglicht das sichere eingeben von empfindlichen Daten in ein bereitgestelltes Feld
 */

export default function TextInputPassword ({
  errorText,
  description,
  ...props
}) {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [password, setPassword] = useState('')

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        secureTextEntry={!passwordVisible}
        selectionColor={theme.colors.primary}
        underlineColor='transparent'
        mode='outlined'
        {...props}
        right={
          <TextInput.Icon
            icon={passwordVisible ? 'eye-off' : 'eye'}
            onPress={togglePasswordVisibility}
          />
        }
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
    marginVertical: 12
  },
  input: {
    backgroundColor: theme.colors.surface
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8
  }
})
