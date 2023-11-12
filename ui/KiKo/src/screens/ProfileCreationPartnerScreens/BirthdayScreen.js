import React, { useState } from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import DropDown from '../../components/PartnerCreationComponents/DropDown'
import Background from '../../components/PartnerCreationComponents/Background'
import Button from '../../components/PartnerCreationComponents/Button'
import DatePicker from '../../components/PartnerCreationComponents/DatePicker'



export default function GenderScreen({ navigation }) {

    const options = [
        { label: 'Mann', value: 'mann' },
        { label: 'Frau', value: 'frau' },
        { label: 'Divers', value: 'Divers' },
      ];

      const [date, setDate] = useState(new Date())

      //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN, VALIDIERUNG TEXT WIRKLICH DA
  return (
    <Background>
      <View style={styles.container}>
      <Paragraph>Schritt: 3/10</Paragraph>
      <Paragraphtitel>WANN IST IHR GEBURTSTAG?</Paragraphtitel>
        <DatePicker />
      <Button mode="contained" onPress={() => navigation.navigate('AdressScreen')}>
        NÄCHSTER SCHRITT
      </Button>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 400,
    marginBottom: 400,
    justifyContent: 'center', flex: 1, 
    alignItems: 'center',
    },
})