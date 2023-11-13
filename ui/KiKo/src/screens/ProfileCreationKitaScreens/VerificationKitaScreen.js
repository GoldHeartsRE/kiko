// Schritt 4 von 4 Verifikation
import React from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/KitaCreationComponents/Paragraph-Titel'
import TextInput from '../../components/KitaCreationComponents/TextInput'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import Header from '../../components/MainComponents/Header'

export default function VerificationKitaScreen({ navigation }) {

      //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN, VALIDIERUNG TEXT WIRKLICH DA
  return (
    <Background>
      <Header items="Profil erstellen" icon="logout" logout={() => navigation.navigate('StartScreen')}></Header>
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