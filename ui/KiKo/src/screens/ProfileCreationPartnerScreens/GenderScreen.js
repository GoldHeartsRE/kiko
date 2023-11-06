import React from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import DropDown from '../../components/PartnerCreationComponents/DropDown'
import Background from '../../components/PartnerCreationComponents/Background'
import Button from '../../components/PartnerCreationComponents/Button'
export default function GenderScreen({ navigation }) {

    const options = [
        { label: 'Mann', value: 'mann' },
        { label: 'Frau', value: 'frau' },
        { label: 'Divers', value: 'Divers' },
      ];

      //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN, VALIDIERUNG TEXT WIRKLICH DA
  return (
    <Background>
      <Paragraph>Schritt: 2/9</Paragraph>
      <Paragraphtitel>WIE IST IHR GESCHLECHT?</Paragraphtitel>
      <View>
        <DropDown items={options} onValueChange={(value) => console.log(value)} />
      </View>
      <Button mode="contained" onPress={() => navigation.navigate('AdressScreen')}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}