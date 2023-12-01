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
import { vornameValidator, nachnameValidator } from '../../validator/nameValidator'

export default function AnsprechpartnerScreen({ navigation }) {
    const [vorname, setVorname] = useState({ value: '', error: '' })
    const [nachname, setNachname] = useState({ value: '', error: '' })
    const options = [
        { label: 'Herr', value: 'Herr' },
        { label: 'Frau', value: 'Frau' },
        { label: 'Divers', value: 'Divers' },
      ];

      const onNextPressed = () => {
        const vornameError = vornameValidator(vorname.value)
        const nachnameError = nachnameValidator(nachname.value)
        if (vornameError || nachnameError) {
          setVorname({ ...vorname, error: vornameError })
          setNachname({ ...nachname, error: nachnameError })
          return
        }
        navigation.navigate('VerificationKitaScreen')
    
    // TODO FETCH
    /**
    fetch('http://localhost:8080/api/v1/auth/signin', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
      role: 'USER' // Rolle anpassen
    }),
  })
  .then(response => response.json()) // Mapping auf JSON
  .then(data => {
    console.log(data);
    navigation.navigate('CreateStartScreen') // FIX noch mit Dennis abklären
    return // FIX noch mit Dennis abklären
  })
  .catch(error => console.error('Fehler:', error));

  navigation.reset({
    index: 0,
    routes: [{ name: 'LoginScreen' }], // FIX noch mit Dennis abklären
  })
  }
     */
      }
      //TO-DO: HEADER WIE IN FIGMA UND DROPDOWN FIXEN
  return (
    <Background>
    <Header items="Profil erstellen" icon="logout" logout={() => navigation.navigate('StartScreen')}></Header>
      <Paragraph>Schritt: 3/4</Paragraph>
      <Paragraphtitel>WIE IST DER NAME DER ANSPRECHPERSON?</Paragraphtitel>
      <View>
        <DropDown items={options} placeh={'Anrede'} onValueChange={(value) => console.log(value)} />
      </View>
      <TextInput
        label="Vorname"
        returnKeyType="next"
        value={vorname.value}
        onChangeText={(text) => setVorname({ value: text, error: '' })}
        error={!!vorname.error}
        errorText={vorname.error}
        autoCapitalize="none"
        autoCompleteType="vorname"
        textContentType="vorname"
        keyboardType="vorname"
      />
      <TextInput
        label="Nachname"
        returnKeyType="done"
        value={nachname.value}
        onChangeText={(text) => setNachname({ value: text, error: '' })}
        error={!!nachname.error}
        errorText={nachname.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onNextPressed}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}