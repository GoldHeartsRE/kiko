import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import BackButton from '../../components/LoginComponents/BackButton'
import Header from '../../components/LoginComponents/Header'
import Logo from '../../components/LoginComponents/Logo'
import TextInput from '../../components/LoginComponents/TextInput'
import TextInputPassword from '../../components/LoginComponents/TextInputPassword'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import { IP } from '../../constants/constants'
import { theme } from '../../theme/theme'
import { emailValidator } from '../../validator/emailValidator'
import { passwordValidator } from '../../validator/passwordValidator'

/**
 * @memberof LoginScreens
 * @class LoginScreen
 * @description Zuständig für das Login, inklusive Validierung der Eingabe und Datenbankzugriff.
 */

export default function LoginScreen ({ navigation }) {
  //Getter und Setter für Requests
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [errors, setErrors] = useState({ value: '', error: '' })

  /**
   * @method onLoginPressed
   * @memberof LoginScreens.LoginScreen
   * @async
   * @description Async Methode welche durch Drücken des Loginbuttons ausgelöst wird, führt den Fatch auf das Backend aus validiert sowie speichert Daten relevante Daten im AsyncStorage.
   * Außerdem werden die Nutzer auf die entsprechendem Seiten für Partner oder Kita weitergeleitet.
   */

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

    fetch('http://' + IP + ':8080/api/v1/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        role: 'KITA' // Rolle anpassen
      })
    })
      .then(response => response.json()) // Mapping auf JSON
      .then(data => {
        console.log(data)
        console.log(data.token)
        console.log(data.id)
        AsyncStorage.setItem('token', data.token)
        AsyncStorage.setItem('id', data.id.toString())
        AsyncStorage.setItem('role', data.role)

        if (data.role === 'KITA') {
          fetch('http://' + IP + ':8080/api/v1/profil/kita/' + data.id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${data.token}`
            }
          })
            .then(response => response.json())
            .then(user => {
              console.log(user)

              if (user.vorname_ansprechperson === null) {
                navigation.navigate('CreateStartScreen')
              }

              if (user.vorname_ansprechperson && user.name_kita !== null) {
                navigation.navigate('DashboardKitaScreen')
              }
              return
            })
        }

        if (data.role === 'PARTNER') {
          fetch('http://' + IP + ':8080/api/v1/profil/partner/' + data.id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${data.token}`
            }
          })
            .then(response => response.json())
            .then(user => {
              console.log(user)
              console.log(user.vorname)

              if ((user.telefon === null) | undefined) {
                navigation.navigate('CreateProfileStartScreen')
              }

              if (user.vorname && user.telefon !== null) {
                navigation.navigate('DashboardPartnerScreen')
              }
              return
            })
        }

        if (data.role === 'ADMIN') {
          navigation.navigate('DashboardAdminScreen')
          return
        }
      })
      .catch(error => {
        console.error('Fehler:', error)
        if (error) {
          errors.value = 'E-Mail oder Passwort falsch'
        }
      })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Log in</Header>
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
        returnKeyType='done'
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
      />
      <Button mode='contained' onPress={onLoginPressed}>
        Anmelden
      </Button>
      <View style={styles.row}>
        <Text>Passwort vergessen?</Text>
        <TouchableOpacity
          onPress={() => navigation.replace('ResetPasswordScreen')}
        >
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
    marginBottom: 24
  },
  row: {
    flexDirection: 'row',
    marginTop: 4
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary
  }
})
