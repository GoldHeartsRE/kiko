import React from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import DropDown from '../../components/PartnerCreationComponents/DropDown'
import Background from '../../components/PartnerCreationComponents/Background'
import Button from '../../components/PartnerCreationComponents/Button'
import Header from '../../components/PartnerCreationComponents/Header'
import TextInput from '../../components/PartnerCreationComponents/TextInput'
export default function CreateNameScreen({ navigation }) {

    const options = [
        { label: 'Herr', value: 'Herr' },
        { label: 'Frau', value: 'Frau' },
        { label: 'Divers', value: 'Divers' },
      ];

      //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN
  return (
    <Background>
      <Paragraph>Schritt: 1/10</Paragraph>
      <Paragraphtitel>WIE IST IHR NAME?</Paragraphtitel>
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
      <Button mode="contained" onPress={() => navigation.navigate('GenderScreen')}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}