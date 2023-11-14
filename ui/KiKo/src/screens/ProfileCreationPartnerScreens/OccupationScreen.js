import React from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import DropDown from '../../components/MainComponents/DropDown'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
export default function OccupationScreen({ navigation }) {

    const options = [
        { label: 'Student', value: 'Student' },
        { label: 'Berufstätig', value: 'Berufstätig' },
        { label: 'Mitglied in einem Verein', value: 'Mitglied in einem Verein' },
      ];

      //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN, VALIDIERUNG TEXT WIRKLICH DA
  return (
    <Background>
      <Paragraph>Schritt: 6/10</Paragraph>
      <Paragraphtitel>IN WELCHEM BEREICH SIND SIE TÄTIG?</Paragraphtitel>
      <View>
        <DropDown items={options} placeh={'Tätigkeit'} onValueChange={(value) => console.log(value)} />
      </View>
      <Button mode="contained" onPress={() => navigation.navigate('QualificationScreen')}>
        NÄCHSTER SCHRITT
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('QualificationScreen')}>
        ÜBERSPRINGEN
      </Button>
    </Background>
  )
}