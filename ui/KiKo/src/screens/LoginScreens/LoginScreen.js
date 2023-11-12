import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../components/MainComponents/Background'
import Logo from '../../components/LoginComponents/Logo'
import Header from '../../components/LoginComponents/Header'
import Button from '../../components/MainComponents/Button'
import TextInput from '../../components/LoginComponents/TextInput'
import BackButton from '../../components/LoginComponents/BackButton'
import { theme } from '../../theme/theme'
import { emailValidator } from '../../validator/emailValidator'
import { passwordValidator } from '../../validator/passwordValidator'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = () => {

  const emailError = emailValidator(email.value)
  const passwordError = passwordValidator(password.value)
  if (emailError || passwordError) {
    setEmail({ ...email, error: emailError })
    setPassword({ ...password, error: passwordError })
    return
  }

  fetch('http://localhost:8080/api/v1/auth/signin', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
      role: 'USER'
    }),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => console.error('Fehler:', error));

  navigation.reset({
    index: 0,
    routes: [{ name: 'Dashboard' }],
  })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Log in</Header>
      <TextInput
        label="E-Mail"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Passwort"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onLoginPressed}>
        Anmelden
      </Button>
      <View style={styles.row}>
        <Text>Passwort vergessen?</Text>
        <TouchableOpacity onPress={() => navigation.replace('ResetPasswordScreen')}>
          <Text style={styles.link}> Hier klicken</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})