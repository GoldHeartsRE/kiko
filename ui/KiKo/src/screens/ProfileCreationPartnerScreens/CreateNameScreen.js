import React, { useState } from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import DropDown from '../../components/MainComponents/DropDown'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import Header from '../../components/MainComponents/Header'
import TextInput from '../../components/PartnerCreationComponents/TextInput'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { inputValidator } from '../../validator/ProfilePartnerValidator/inputValidator'

export default function CreateNameScreen({ navigation }) {

  // Value DTO for HTTP Request
  const [valueAnrede, setValue] = useState({ value: '', error: '' })
  const [nachname, setNachname] = useState({ value: '', error: '' })
  const [vorname, setVorname] = useState({ value: '', error: '' })

  // Dropdown Managment
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState([        
  { label: 'Herr', value: 'Herr' },
  { label: 'Frau', value: 'Frau' },
  { label: 'Divers', value: 'Divers' },]);

  const onContinuePressed = async() => {

    const vornameError = inputValidator(vorname.value)
    const nachnameError = inputValidator(nachname.value)
    if (nachnameError || vornameError) {
      setNachname({ ...nachname, error: nachnameError })
      setVorname({ ...vorname, error: vornameError })
      return
    }

    navigation.navigate('GenderScreen') 

    var valueToken = await AsyncStorage.getItem('token') 
    var valueId = await AsyncStorage.getItem('id') 
    console.log(valueToken);
    console.log(`Bearer ${valueToken}`);

    fetch('http://localhost:8080/api/v1/profil/partner/' + valueId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${valueToken}`,
      },
      body: JSON.stringify({
        anrede: valueAnrede,
        vorname: vorname.value,
        nachname: nachname.value,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigation.navigate('AdressKitaScreen') 
      return
    })
    .catch(error => console.error('Fehler:', error));
  }

  return (
    <Background>
      <Header items="Profil erstellen" icon="logout"></Header>
      <Paragraph>Schritt: 1/10</Paragraph>
      <Paragraphtitel>WIE IST IHR NAME?</Paragraphtitel>
      <View>
        <DropDown items={selectedItem} placeh={'Anrede'} val={valueAnrede} open={open} setVal={setValue} setItems={setSelectedItem} setOpen={setOpen}
        />
      </View>
      <TextInput
        label="Vorname"
        onChangeText={(text) => setVorname({ value: text, error: '' })}
        value={vorname.value}
        error={!!vorname.error}
        errorText={vorname.error}
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="vorname"
        textContentType="vorname"
        keyboardType="vorname"
      />
      <TextInput
        label="Nachname"
        onChangeText={(text) => setNachname({ value: text, error: '' })}
        value={nachname.value}
        error={!!nachname.error}
        errorText={nachname.error}
        returnKeyType="done"
      />
      <Button mode="contained" onPress={onContinuePressed}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}