import React, { useState } from 'react'
import BackButton from '../../components/LoginComponents/BackButton'
import Header from '../../components/LoginComponents/Header'
import Logo from '../../components/LoginComponents/Logo'
import TextInput from '../../components/LoginComponents/TextInput'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import { emailValidator } from '../../validator/emailValidator'

export default function ResetPasswordScreen ({ navigation }) {
  //Getter und Setter für Requests
  const [email, setEmail] = useState({ value: '', error: '' })

  //Noch zu machen!
  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    navigation.navigate('LoginScreen')
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Passwort wiederherstellen</Header>
      <TextInput
        label='E-mail address'
        returnKeyType='done'
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize='none'
        autoCompleteType='off'
        textContentType='none'
        keyboardType='default'
        description='You will receive email with password reset link.'
      />
      <Button
        mode='contained'
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Sende E-Mail
      </Button>
    </Background>
  )
}
