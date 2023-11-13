import React from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import TextInput from '../../components/PartnerCreationComponents/TextInput'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
export default function DescriptionScreen({ navigation }) {

    const options = [
        { label: 'Student', value: 'Student' },
        { label: 'Berufstätig', value: 'Berufstätig' },
        { label: 'Mitglied in einem Verein', value: 'Mitglied in einem Verein' },
      ];

      //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN, VALIDIERUNG TEXT WIRKLICH DA
  return (
    <Background>
      <Paragraph>Schritt: 10/10</Paragraph>
      <Paragraphtitel>FÜGEN SIE EINE KURZE BESCHREIBUNG ZU IHNEN EIN.</Paragraphtitel>
      <TextInput
        label="Hallo, ich bin..."
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="beschreibung"
        textContentType="beschreibung"
        keyboardType="beschreibung"
      />
      <Button mode="contained" onPress={() => navigation.navigate('PartnerProfileEndScreen')}>
        NÄCHSTER SCHRITT
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('PartnerProfileEndScreen')}>
        ÜBERSPRINGEN
      </Button>
    </Background>
  )
}