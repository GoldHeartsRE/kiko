// Schritt 1 von 4 Name der Kita
import React from 'react'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/KitaCreationComponents/Paragraph-Titel'
import Background from '../../components/KitaCreationComponents/Background'
import Button from '../../components/KitaCreationComponents/Button'
import TextInput from '../../components/KitaCreationComponents/TextInput'
export default function NameKitaScreen({ navigation }) {

    //TODO Header
  return (
    <Background>
      <Paragraph>Schritt: 1/4</Paragraph>
      <Paragraphtitel>WIE HEIST IHRE KITA?</Paragraphtitel>
      <TextInput
        label="Kita"
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="kita"
        textContentType="kita"
        keyboardType="kita"
      />
      <Button mode="contained" onPress={() => navigation.navigate('AdressScreen')}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}