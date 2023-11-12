import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Background from '../../components/LoginComponents/Background'
import Button from '../../components/LoginComponents/Button'
import TextInput from '../../components/LoginComponents/TextInput'
import BackButton from '../../components/LoginComponents/BackButton'
import { theme } from '../../theme/theme'
import { emailValidator } from '../../validator/emailValidator'
import { passwordValidator } from '../../validator/passwordValidator'
import { nameValidator } from '../../validator/nameValidator'

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onSignUpPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

    fetch('http://localhost:8080/api/v1/auth/signup', {
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
      routes: [{ name: 'CreateNameScreen' }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
  
      <Paragraph style={styles.title}>Account erstellen</Paragraph>
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
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Registrieren
      </Button>
      <View style={styles.row}>
        <Text>Es gelten unsere </Text>
        <TouchableOpacity onPress={() => navigation.replace('Platzhalter')}>
        <Text style={styles.link}>Nutzungsbedingungen.</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.row2}>
        <Text>Informationen zur Verarbeitung deiner Daten findest du in unserer Datenschutzerklärung.</Text>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: '6%'
  },
  link: {
    fontWeight: 'bold',
    color: '#4361EE',
  },
  title: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  }
})