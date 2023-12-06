// Schritt 4 von 4 Verifikation
import React from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/KitaCreationComponents/Paragraph-Titel'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import Header from '../../components/MainComponents/Header'
import DocumentPickerSingle from '../../components/MainComponents/DocumentPickerSingle'

export default function VerificationKitaScreen({ navigation }) {

    
  return (
    <Background>
      <Header items="Profil erstellen" icon="logout"></Header>
      <Paragraph>Schritt: 4/4</Paragraph>
      <Paragraphtitel>LADEN SIE BITTE DIE ERFORDERLICHE DOKUMENTE HOCH.</Paragraphtitel>
      <DocumentPickerSingle mode="contained">Hochladen</DocumentPickerSingle>
      <Button mode="contained" onPress={() => navigation.navigate('KitaProfilEndScreen')}>
        NÄCHSTER SCHRITT
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('KitaProfilEndScreen')}>
        ÜBERSPRINGEN
      </Button>
    </Background>
  )
}