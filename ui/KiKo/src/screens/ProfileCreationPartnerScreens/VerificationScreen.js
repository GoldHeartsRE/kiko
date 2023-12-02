import React from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import Background from '../../components/MainComponents/Background'
import DocumentPickerSingle from '../../components/MainComponents/DocumentPickerSingle'
import Button from '../../components/MainComponents/Button'
import Header from '../../components/MainComponents/Header'

export default function VerificationScreen({ navigation }) {

    const options = [
        { label: 'Student', value: 'Student' },
        { label: 'Berufstätig', value: 'Berufstätig' },
        { label: 'Mitglied in einem Verein', value: 'Mitglied in einem Verein' },
      ];

      //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN, VALIDIERUNG TEXT WIRKLICH DA
  return (
    <Background>
      <Header items="Profil erstellen" icon="logout"  ></Header>
      <Paragraph>Schritt: 8/10</Paragraph>
      <Paragraphtitel>LADEN SIE BITTE DIE ERFORDERLICHE DOKUMENTE HOCH.</Paragraphtitel>
      
      <DocumentPickerSingle mode="contained">Erweitertes Führungszeugnis</DocumentPickerSingle>
      
      <DocumentPickerSingle mode="contained">Nachweis zum Masernschutz</DocumentPickerSingle>


      <Button mode="contained" onPress={() => navigation.navigate('ProfilePictureScreen')}>
        NÄCHSTER SCHRITT
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('ProfilePictureScreen')}>
        ÜBERSPRINGEN
      </Button>
    </Background>
  )
}