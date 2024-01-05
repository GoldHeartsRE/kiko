import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import BackButton from '../../components/LoginComponents/BackButton'
import TextInput from '../../components/LoginComponents/TextInput'
import TextInputPassword from '../../components/LoginComponents/TextInputPassword'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import { IP } from '../../constants/constants'
import { theme } from '../../theme/theme'
import { emailValidator } from '../../validator/emailValidator'
import {
  confirmPasswordValidator,
  passwordValidator
} from '../../validator/passwordValidator'

/**
 * @memberof LoginScreens
 * @class RegisterPartnerScreen
 * @description Zuständig für das Registrieren für Partner, inklusive Validierung der Eingabe und Datenbankzugriff.
 */

export default function RegisterScreen ({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirmedPassword, setConfirmedPassword] = useState({
    value: '',
    error: ''
  })

  /**
   * @method onSignUpPressed
   * @memberof LoginScreens.RegisterPartnerScreen
   * @description Async Methode Wird durch Drücken des Registrierung ausgelöst, führt den Fatch auf das Backend aus validiert sowie speichert relevante Daten im AsyncStorage.
   * Außerdem werden die Nutzer auf die entsprechenden Seiten der Partner Profilerstellung oder Profils weitergeleitet.
   */
  const onSignUpPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const confirmPasswordError = confirmPasswordValidator(
      password.value,
      confirmedPassword.value
    )
    if (emailError || passwordError || confirmPasswordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setConfirmedPassword({
        ...confirmedPassword,
        error: confirmPasswordError
      })
      return
    }

    fetch('http://' + IP + ':8080/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        role: 'PARTNER'
      })
    })
      .then(response => response)
      .then(data => {
        console.log(data)
      })
      .catch(error => console.error('Fehler:', error))

    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }]
    })
  }

  /**
   * @method Return
   * @memberof LoginScreens.RegisterPartnerScreen
   * @description HTML-Komponente des Screens, welches die importierten Komponenten hier verwendet
   */
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />

      <Paragraph style={styles.title}>Account erstellen</Paragraph>
      <TextInput
        label='E-Mail'
        returnKeyType='next'
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize='none'
        autoCompleteType='off'
        textContentType='none'
        keyboardType='default'
      />
      <TextInputPassword
        label='Passwort'
        returnKeyType='next'
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
      />
      <TextInputPassword
        label='Bestätige Passwort'
        returnKeyType='done'
        value={confirmedPassword.value}
        onChangeText={text => setConfirmedPassword({ value: text, error: '' })}
        error={!!confirmedPassword.error}
        errorText={confirmedPassword.error}
      />
      <Button
        mode='contained'
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
        <Text>
          Informationen zur Verarbeitung deiner Daten findest du in unserer
          <Text style={styles.link}> Datenschutzerklärung.</Text>
        </Text>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 4
  },
  row2: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: '6%'
  },
  link: {
    fontWeight: 'bold',
    color: '#4361EE'
  },
  title: {
    fontWeight: 'bold',
    color: theme.colors.primary
  }
})
