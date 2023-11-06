import React from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import Background from '../../components/PartnerCreationComponents/Background'
import Button from '../../components/PartnerCreationComponents/Button'
export default function PartnerProfileEndScreen({ navigation }) {

    const options = [
        { label: 'Student', value: 'Student' },
        { label: 'Berufstätig', value: 'Berufstätig' },
        { label: 'Mitglied in einem Verein', value: 'Mitglied in einem Verein' },
      ];

      //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN, VALIDIERUNG TEXT WIRKLICH DA
  return (
    <Background>
      <Paragraph>Schritt: 9/9</Paragraph>
      <Paragraphtitel>GESCHAFFT!</Paragraphtitel>
      <Paragraph>Bitte Beachten Sie, dass sie erst nach dem Verifizierungsprozess zugriff auf die anderen funktionen von Kiko haben werden.</Paragraph>
      <Paragraph>Bis dahin können sie gerne ihr Profil weitergestalten.</Paragraph>
      <Button mode="contained">
        Weiter
      </Button>
    </Background>
  )
}