// Schritt 4 von 4 Verifikation
import React from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/KitaCreationComponents/Paragraph-Titel'
import TextInput from '../../components/KitaCreationComponents/TextInput'
import Background from '../../components/KitaCreationComponents/Background'
import Button from '../../components/KitaCreationComponents/Button'
export default function VerificationScreen({ navigation }) {

      //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN, VALIDIERUNG TEXT WIRKLICH DA
  return (
    <Background>
      <Paragraph>Schritt: 4/4</Paragraph>
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