import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import DropDown from '../../components/MainComponents/DropDown'
import Background from '../../components/MainComponents/Background'
import TextInput from '../../components/PartnerCreationComponents/TextInput'
import Button from '../../components/MainComponents/Button'

export default function OccupationScreen({ navigation }) {

  const [value, setValue] = useState(null);
  const [selectedItem, setSelectedItem] = useState([        
  { label: 'Student', value: 'Student' },
  { label: 'Berufstätig', value: 'Berufstätig' },
  { label: 'Mitglied in einem Verein', value: 'Mitglied in einem Verein' },]);

      const DisplayInputs = (text) => {
        console.log(text);
        switch (text) {
          case 'Student':
            return (
            <View style={styles.container}>
            <TextInput
              label="Name der Uni/Hochschule"
              returnKeyType="next"
              autoCapitalize="none"
              autoCompleteType="Name der Uni/Hochschule"
              textContentType="Name der Uni/Hochschule"
              keyboardType="Name der Uni/Hochschule"
            />
            <TextInput
            label="Studiengang"
            returnKeyType="done"
            />
            </View>
            );
          case 'Berufstätig':
            return (
              <View style={styles.container}>
              <TextInput
                label="Name des Unternehmen"
                returnKeyType="next"
                autoCapitalize="none"
                autoCompleteType="Name des Unternehmen"
                textContentType="Name des Unternehmen"
                keyboardType="Name des Unternehmen"
              />
              <TextInput
              label="Berufsbezeichnung"
              returnKeyType="done"
              />
              </View>
            );
          case 'Mitglied in einem Verein':
            return (
              <View style={styles.container}>
              <TextInput
                label="Name des Vereins"
                returnKeyType="next"
                autoCapitalize="none"
                autoCompleteType="Name des Vereins"
                textContentType="Name des Vereins"
                keyboardType="Name des Vereins"
              />
              <TextInput
              label="Tätigkeitsbereich/Zweck des Vereins"
              returnKeyType="done"
              />
              </View>
            );
          default:
            return undefined;
        }
      };

      //TO-DO: HEADER und VALIDIERUNG TEXT WIRKLICH DA
  return (
    <Background>
      <Paragraph>Schritt: 6/10</Paragraph>
      <Paragraphtitel>IN WELCHEM BEREICH SIND SIE TÄTIG?</Paragraphtitel>
      <View>
        <DropDown items={selectedItem} value={value} setVal={setValue} placeh={'Tätigkeit'} setItems={setSelectedItem} />
      </View>
      {DisplayInputs(value)}
      <Button mode="contained" onPress={() => navigation.navigate('QualificationScreen')}>
        NÄCHSTER SCHRITT
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('QualificationScreen')}>
        ÜBERSPRINGEN
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: -5
  }
})
