import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import BigTextInput from '../../components/PartnerCreationComponents/BigTextInput'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import Header from '../../components/MainComponents/Header'

export default function DescriptionScreen({ navigation }) {

      //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN, VALIDIERUNG TEXT WIRKLICH DA
  return (
    <Background>
      <Header items="Profil erstellen" icon="logout" logout={() => navigation.navigate('StartScreen')}></Header>
      <Paragraph>Schritt: 10/10</Paragraph>
      <Paragraphtitel>FÜGEN SIE EINE KURZE BESCHREIBUNG ZU IHNEN EIN.</Paragraphtitel>
      <BigTextInput
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