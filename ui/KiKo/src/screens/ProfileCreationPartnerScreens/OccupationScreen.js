import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import DropDown from '../../components/MainComponents/DropDown'
import Background from '../../components/MainComponents/Background'
import TextInput from '../../components/PartnerCreationComponents/TextInput'
import Button from '../../components/MainComponents/Button'
import Header from '../../components/MainComponents/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OccupationScreen({ navigation }) {

  const [feld1, setFeld1] = useState({ value: '', error: '' })
  const [feld2, setFeld2] = useState({ value: '', error: '' })

  const [value, setValue] = useState(null);
  const [selectedItem, setSelectedItem] = useState([        
  { label: 'Student', value: 'Student' },
  { label: 'Berufstätig', value: 'berufstaetig' },
  { label: 'Mitglied in einem Verein', value: 'Vereinsmitglied' },]);

  const onContinuePressed = async() => {

    var valueToken = await AsyncStorage.getItem('token') 
    var valueId = await AsyncStorage.getItem('id') 
    console.log(valueToken);
    console.log(`Bearer ${valueToken}`);

    navigation.navigate('QualificationScreen') 

    fetch('http://localhost:8080/api/v1/profil/partner/' + valueId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${valueToken}`,
      },
      body: JSON.stringify({
        organisation: feld1.value,
        taetigkeit: feld2.value,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigation.navigate('QualificationScreen') 
      return
    })
    .catch(error => console.error('Fehler:', error));
  }

      const DisplayInputs = (text) => {
        console.log(text);
        switch (text) {
          case 'Student':
            return (
            <View style={styles.container}>
            <TextInput
              label="Name der Uni/Hochschule"
              returnKeyType="next"
              onChangeText={(text) => setFeld1({ value: text, error: '' })}
              value={feld1.value}
              autoCapitalize="none"
              autoCompleteType="Name der Uni/Hochschule"
              textContentType="Name der Uni/Hochschule"
              keyboardType="Name der Uni/Hochschule"
            />
            <TextInput
            label="Studiengang"
            onChangeText={(text) => setFeld2({ value: text, error: '' })}
            value={feld2.value}
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
                onChangeText={(text) => setFeld1({ value: text, error: '' })}
                value={feld1.value}
                autoCapitalize="none"
                autoCompleteType="Name des Unternehmen"
                textContentType="Name des Unternehmen"
                keyboardType="Name des Unternehmen"
              />
              <TextInput
              label="Berufsbezeichnung"
              onChangeText={(text) => setFeld2({ value: text, error: '' })}
              value={feld2.value}
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
                onChangeText={(text) => setFeld1({ value: text, error: '' })}
                value={feld1.value}
                autoCapitalize="none"
                autoCompleteType="Name des Vereins"
                textContentType="Name des Vereins"
                keyboardType="Name des Vereins"
              />
              <TextInput
              label="Tätigkeitsbereich/Zweck des Vereins"
              onChangeText={(text) => setFeld2({ value: text, error: '' })}
              value={feld2.value}
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
      <Header items="Profil erstellen" icon="logout"  ></Header>
      <Paragraph>Schritt: 6/10</Paragraph>
      <Paragraphtitel>IN WELCHEM BEREICH SIND SIE TÄTIG?</Paragraphtitel>
      <View>
        <DropDown items={selectedItem} val={value} setVal={setValue} placeh={'Tätigkeit'} setItems={setSelectedItem} />
      </View>
      {DisplayInputs(value)}
      <Button mode="contained" onPress={onContinuePressed}>
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
