import React from 'react'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import Background from '../../components/PartnerCreationComponents/Background'
import Button from '../../components/PartnerCreationComponents/Button'
import TextInput from '../../components/PartnerCreationComponents/TextInput'
export default function AdressScreen({ navigation }) {

  return (
    <Background>
      <Paragraph>Schritt: 3/10</Paragraph>
      <Paragraphtitel>WIE LAUTET IHRE ADRESSE?</Paragraphtitel>
      <TextInput
        label="PLZ"
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="plz"
        textContentType="plz"
        keyboardType="plz"
      />
       <TextInput
        label="Ort"
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="ort"
        textContentType="ort"
        keyboardType="ort"
      />
       <TextInput
        label="Straße"
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="straße"
        textContentType="straße"
        keyboardType="straße"
      />
      <TextInput
        label="Nr."
        returnKeyType="done"
        secureTextEntry
      />
      <Button mode="contained" onPress={() => navigation.navigate('PhoneNumberScreen')}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}