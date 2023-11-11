// Schritt 3 von 4 Name Ansprechpartner
import React from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/KitaCreationComponents/Paragraph-Titel'
import DropDown from '../../components/KitaCreationComponents/DropDown'
import Background from '../../components/KitaCreationComponents/Background'
import Button from '../../components/KitaCreationComponents/Button'
import Header from '../../components/KitaCreationComponents/Header'
import TextInput from '../../components/KitaCreationComponents/TextInput'
export default function AnsprechpartnerScreen({ navigation }) {

    const options = [
        { label: 'Herr', value: 'Herr' },
        { label: 'Frau', value: 'Frau' },
        { label: 'Divers', value: 'Divers' },
      ];

      //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN
  return (
    <Background>
    <Header></Header>
      <Paragraph>Schritt: 3/4</Paragraph>
      <Paragraphtitel>WIE IST DER NAME DER ANSPRECHPERSON?</Paragraphtitel>
      <View>
        <DropDown items={options} onValueChange={(value) => console.log(value)} />
      </View>
      <TextInput
        label="Vorname"
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="vorname"
        textContentType="vorname"
        keyboardType="vorname"
      />
      <TextInput
        label="Nachname"
        returnKeyType="done"
        secureTextEntry
      />
      <Button mode="contained" onPress={() => navigation.navigate('VerificationKitaScreen')}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}