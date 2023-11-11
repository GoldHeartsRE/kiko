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
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
  
      <Paragraph style={styles.link}>Account erstellen</Paragraph>
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
      <View style={styles.row}>
      <Text> Informationen zur Verarbeitung deiner Daten findest du in unserer Datenschutzerklärung.</Text>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})