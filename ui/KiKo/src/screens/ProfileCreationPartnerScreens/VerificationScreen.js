import React from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import TextInput from '../../components/PartnerCreationComponents/TextInput'
import Background from '../../components/PartnerCreationComponents/Background'
import Button from '../../components/PartnerCreationComponents/Button'
export default function VerificationScreen({ navigation }) {

    const options = [
        { label: 'Student', value: 'Student' },
        { label: 'Berufstätig', value: 'Berufstätig' },
        { label: 'Mitglied in einem Verein', value: 'Mitglied in einem Verein' },
      ];

      //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN, VALIDIERUNG TEXT WIRKLICH DA
  return (
    <Background>
      <Paragraph>Schritt: 8/10</Paragraph>
      <Paragraphtitel>LADEN SIE BITTE DIE ERFORDERLICHE DOKUMENTE HOCH.</Paragraphtitel>
      <TextInput
        label="Platzhalter"
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="vorname"
        textContentType="vorname"
        keyboardType="vorname"
      />
       <TextInput
        label="Platzhalter 2"
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="vorname"
        textContentType="vorname"
        keyboardType="vorname"
      />
      <Button mode="contained" onPress={() => navigation.navigate('ProfilePictureScreen')}>
        NÄCHSTER SCHRITT
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('ProfilePictureScreen')}>
        ÜBERSPRINGEN
      </Button>
    </Background>
  )
}