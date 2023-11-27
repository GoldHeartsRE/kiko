// Schritt 1 von 4 Name der Kita
import React, { useState } from 'react'
import { Paragraph } from 'react-native-paper'
import Paragraphtitel from '../../components/KitaCreationComponents/Paragraph-Titel'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import TextInput from '../../components/KitaCreationComponents/TextInput'
import Header from '../../components/MainComponents/Header'
import { kitaNameValidator } from '../../validator/nameValidator'

export default function NameKitaScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })

  const onNextPressed = () => {
    const nameError = kitaNameValidator(name.value)
    if (nameError) {
      setName({ ...name, error: nameError })
      return
    }
    navigation.navigate('AdressKitaScreen')

    // TODO FETCH

  }

  return (
    <Background>
      <Header items="Profil erstellen" icon="logout" logout={() => navigation.navigate('StartScreen')}></Header>
      <Paragraph>Schritt: 1/4</Paragraph>
      <Paragraphtitel>WIE HEIßT IHRE KITA?</Paragraphtitel>
      <TextInput
        label="Kita"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
        autoCapitalize="none"
        autoCompleteType="kita"
        textContentType="kita"
        keyboardType="kita"
      />
      <Button mode="contained" onPress={onNextPressed}>
        NÄCHSTER SCHRITT
      </Button>
    </Background>
  )
}