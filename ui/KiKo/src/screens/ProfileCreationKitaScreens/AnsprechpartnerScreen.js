// Schritt 3 von 4 Name Ansprechpartner
import React, { useState } from 'react'
import { View } from 'react-native'
import { Paragraph } from 'react-native-paper'
import Paragraphtitel from '../../components/KitaCreationComponents/Paragraph-Titel'
import DropDown from '../../components/MainComponents/DropDown'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import Header from '../../components/MainComponents/Header'
import TextInput from '../../components/KitaCreationComponents/TextInput'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { vornameValidator, nachnameValidator } from '../../validator/nameValidator'

export default function AnsprechpartnerScreen({ navigation }) {
    const [anrede, setAnrede] = useState({ value: '', error: '' })
    const [vorname, setVorname] = useState({ value: '', error: '' })
    const [nachname, setNachname] = useState({ value: '', error: '' })
    
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState([        
      { label: 'Herr', value: 'Herr' },
      { label: 'Frau', value: 'Frau' },
      { label: 'Divers', value: 'Divers' },]);

      const onNextPressed = async() => {
        const vornameError = vornameValidator(vorname.value)
        const nachnameError = nachnameValidator(nachname.value)
        if (vornameError || nachnameError) {
          setVorname({ ...vorname, error: vornameError })
          setNachname({ ...nachname, error: nachnameError })
          return
        }
        navigation.navigate('VerificationKitaScreen')
    
        var valueToken = await AsyncStorage.getItem('token')
        var valueId = await AsyncStorage.getItem('id') 
 
        console.log(valueToken);
        console.log(`Bearer ${valueToken}`);
    
        fetch('http://192.168.2.36:8080/api/v1/profil/kita/' + valueId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${valueToken}`,
          },
          body: JSON.stringify({
            anrede_ansprechperson: anrede,
            vorname_ansprechperson: vorname.value,
            nachname_ansprechperson: nachname.value,
          }),
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          navigation.navigate('VerificationKitaScreen') 
          return
        })
        .catch(error => console.error('Fehler:', error));
  }
  return (
    <Background>
    <Header items="Profil erstellen" icon="logout" ></Header>
      <Paragraph>Schritt: 3/4</Paragraph>
      <Paragraphtitel>WIE IST DER NAME DER ANSPRECHPERSON?</Paragraphtitel>
      <View>
        <DropDown items={selectedItem} placeh={'Anrede'} val={anrede} open={open} setVal={setAnrede} setItems={setSelectedItem} setOpen={setOpen} />
      </View>
      <TextInput
        label="Vorname"
        returnKeyType="next"
        value={vorname.value}
        onChangeText={(text) => setVorname({ value: text, error: '' })}
        error={!!vorname.error}
        errorText={vorname.error}
        autoCapitalize="none"
        autoCompleteType="off"
        textContentType="none"
        keyboardType="default"
      />
      <TextInput
        label="Nachname"
        returnKeyType="done"
        value={nachname.value}
        onChangeText={(text) => setNachname({ value: text, error: '' })}
        error={!!nachname.error}
        errorText={nachname.error}
        autoCapitalize="none"
        autoCompleteType="off"
        textContentType="none"
        keyboardType="default"
      />
      <Button mode="contained" onPress={onNextPressed}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}