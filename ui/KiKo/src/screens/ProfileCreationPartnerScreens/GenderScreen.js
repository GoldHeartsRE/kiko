import React, { useState } from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import DropDown from '../../components/MainComponents/DropDown'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import DatePicker from '../../components/PartnerCreationComponents/DatePicker'
import Header from '../../components/MainComponents/Header'

export default function GenderScreen({ navigation }) {

  const [genderValue, setGenderValue] = useState({ value: '', error: '' })

    const options = [
        { label: 'Mann', value: 'mann' },
        { label: 'Frau', value: 'frau' },
        { label: 'Divers', value: 'Divers' },
      ];

      //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN, VALIDIERUNG TEXT WIRKLICH DA
  return (
    <Background>
      <Header items="Profil erstellen" icon="logout" logout={() => navigation.navigate('StartScreen')}></Header>
      <Paragraph>Schritt: 2/10</Paragraph>
      <Paragraphtitel>WIE IST IHR GESCHLECHT?</Paragraphtitel>
      <View>
        <DropDown  items={options} val={genderValue} placeh={'Geschlecht'} setVal={setGenderValue} onValueChange={(value) => console.log(value)} />
      </View>
      <Button mode="contained" onPress={() => navigation.navigate('BirthdayScreen')}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}