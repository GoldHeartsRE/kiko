// Schritt 2 von 4 Adresse Kita
import React from 'react'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/KitaCreationComponents/Paragraph-Titel'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import TextInput from '../../components/KitaCreationComponents/TextInput'
export default function AdressKitaScreen({ navigation }) {

  return (
    <Background>
      <Header items="Profil erstellen" icon="logout" logout={() => navigation.navigate('StartScreen')}></Header>
      <Paragraph>Schritt: 2/4</Paragraph>
      <Paragraphtitel>WO BEFINDET SICH IHRE KITA?</Paragraphtitel>
      <TextInput
        label="PLZ"
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="plz"
        textContentType="plz"
        keyboardType="plz"
      />
       <TextInput
        label="Ort"
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="ort"
        textContentType="ort"
        keyboardType="ort"
      />
       <TextInput
        label="Straße"
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="straße"
        textContentType="straße"
        keyboardType="straße"
      />
      <TextInput
        label="Nr."
        returnKeyType="done"
        secureTextEntry
      />
      <Button mode="contained" onPress={() => navigation.navigate('AnsprechpartnerScreen')}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}