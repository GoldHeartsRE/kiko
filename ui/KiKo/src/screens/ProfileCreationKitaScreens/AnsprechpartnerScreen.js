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
import { nameValidator } from '../../validator/nameValidator'

export default function AnsprechpartnerScreen({ navigation }) {
    const [name, setName] = useState({ value: '', error: '' })
    const options = [
        { label: 'Herr', value: 'Herr' },
        { label: 'Frau', value: 'Frau' },
        { label: 'Divers', value: 'Divers' },
      ];

      const onNextPressed = () => {
        const nameError = nameValidator(name.value)
        if (nameError) {
          setName({ ...name, error: nameError })
          return
        }
        navigation.navigate('VerificationKitaScreen')
    
        // TODO FETCH
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
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
        autoCapitalize="none"
        autoCompleteType="vorname"
        textContentType="vorname"
        keyboardType="vorname"
      />
      <TextInput
        label="Nachname"
        returnKeyType="done"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onNextPressed}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}