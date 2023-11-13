// Profil erstellen fertig
import React from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/KitaCreationComponents/Paragraph-Titel'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'

export default function KitaProfileEndScreen({ navigation }) {

      //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN, VALIDIERUNG TEXT WIRKLICH DA
  return (
    <Background>
      <Paragraphtitel>GESCHAFFT!</Paragraphtitel>
      <Paragraph>Bitte Beachten Sie, dass sie erst nach dem Verifizierungsprozess zugriff auf die anderen funktionen von Kiko haben werden. 
        Bis dahin können sie gerne ihr Profil weitergestalten.</Paragraph>
      <Button mode="contained">
        Weiter
      </Button>
    </Background>
  )
}