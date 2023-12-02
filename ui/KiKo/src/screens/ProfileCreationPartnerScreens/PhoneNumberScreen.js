import React, { useState } from 'react'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import TextInput from '../../components/PartnerCreationComponents/TextInput'
import { inputValidator } from '../../validator/ProfilePartnerValidator/inputValidator'
import Header from '../../components/MainComponents/Header'

export default function PhoneNumberScreen({ navigation }) {

  // Value DTO for HTTP Request
  const [number, setNumber] = useState({ value: '', error: '' })

  const onContinuePressed = () => {

    const numberError = inputValidator(number.value)
    if (numberError) {
      setNumber({ ...number, error: numberError })
      return
    }
    navigation.navigate('OccupationScreen') 
  }

  return (
    <Background>
      <Header items="Profil erstellen" icon="logout" logout={() => navigation.navigate('StartScreen')}></Header>
      <Paragraph>Schritt: 5/10</Paragraph>
      <Paragraphtitel>WIE LAUTET IHRE TELEFONNUMMER?</Paragraphtitel>
      <TextInput
        label="Telefonnummer"
        onChangeText={(text) => setNumber({ value: text, error: '' })}
        value={number.value}
        error={!!number.error}
        errorText={number.error}
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="telefonnummer"
        textContentType="telefonnummer"
        keyboardType="telefonnummer"
      />
      <Button mode="contained" onPress={onContinuePressed}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}