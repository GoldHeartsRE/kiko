import React from 'react'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import Background from '../../components/PartnerCreationComponents/Background'
import Button from '../../components/PartnerCreationComponents/Button'
import TextInput from '../../components/PartnerCreationComponents/TextInput'
export default function PhoneNumberScreen({ navigation }) {

  return (
    <Background>
      <Paragraph>Schritt: 5/10</Paragraph>
      <Paragraphtitel>WIE LAUTET IHRE TELEFONNUMMER?</Paragraphtitel>
      <TextInput
        label="Telefonnummer"
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="telefonnummer"
        textContentType="telefonnummer"
        keyboardType="telefonnummer"
      />
      <Button mode="contained" onPress={() => navigation.navigate('OccupationScreen')}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}