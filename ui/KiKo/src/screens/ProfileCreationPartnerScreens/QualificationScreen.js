import React from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import DocumentPickerSingle from '../../components/MainComponents/DocumentPickerSingle'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
export default function QualificationScreen({ navigation }) {

      //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN, VALIDIERUNG TEXT WIRKLICH DA
  return (
    <Background>
      <Paragraph>Schritt: 7/10</Paragraph>
      <Paragraphtitel>HABEN SIE DOKUMENTE ZUM NACHWEIS?</Paragraphtitel>
      <DocumentPickerSingle mode="contained">Hochladen</DocumentPickerSingle>
      <Button mode="contained" onPress={() => navigation.navigate('VerificationScreen')}>
        NÄCHSTER SCHRITT
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('VerificationScreen')}>
        ÜBERSPRINGEN
      </Button>
    </Background>
  )
}