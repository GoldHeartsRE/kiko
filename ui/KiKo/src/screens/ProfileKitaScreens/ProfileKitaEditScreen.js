import React, { useState, useLayoutEffect, useRef } from 'react';
import { View, Dimensions } from 'react-native'
import { Paragraph, Text, Card} from 'react-native-paper'
import Paragraphtitel from '../../components/KitaCreationComponents/Paragraph-Titel'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import TextInput from '../../components/KitaCreationComponents/TextInput'
import Header from '../../components/MainComponents/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { plzValidator, ortValidator, straßeValidator, nummerValidator } from '../../validator/adressValidator'
import Appbar from '../../components/Appbar'
import AppbarKita from '../../components/KitaProfileComponents/AppbarKita'
import ProfilePicture from '../../components/MainComponents/ProfilePicture'
import { kitaNameValidator } from '../../validator/nameValidator'

export default function ProfileKitaEditScreen({ navigation }) {
  const screenWidth = Dimensions.get('window').width;
  // Daten holen, AsyncStorage (erstmal Mock)
  const [kitaName, setName] = useState({ value: 'Kita Sonnenschein', error: '' })
  const email_kita = 'max-mustermann@gmail.com';
  const ansprechperson_kita = 'Herr Mustermann';
  const straße_kita = 'Musterstraße 12';
  const ort_kita = 'Musterstadt';

  const onSavePressed = async() => {
    //Validieren, zurück navigieren, Put und Async aktualisieren
    const nameError = kitaNameValidator(kitaName.value)
    if (nameError) {
      setName({ ...kitaName, error: nameError })
      return
    }
    
    navigation.navigate('ProfileKitaScreen') 
  }

  const onBackPressed = async() => {
    navigation.navigate('ProfileKitaScreen') 
  }

  return (
    <Background>
      <Header items="Profil" icon="logout" ></Header>

        <View style={{ flex: 1, top: 60, width: screenWidth }}>

          <View style={{ flex: 1, flexDirection: 'row'}}>
            <View style={{ flex: 1, alignItems: 'center',justifyContent: 'center'}}>
                {/* Profilbild wie in Profilerstellung */}
                <ProfilePicture></ProfilePicture>
            </View>

            <View style={{ flex: 2,alignItems: 'center',justifyContent: 'space-around'}}>
              <Button mode="contained" onPress={onSavePressed}>
              Speichern
              </Button>
              <Button mode="contained" onPress={onBackPressed}>
              Zurück
              </Button>
            </View>
          </View>

          <View style={{ flex: 3}}>
            <TextInput
            label="Kita"
            returnKeyType="next"
            autoCapitalize="none"
            onChangeText={(text) => setName({ value: text, error: '' })}
            value={kitaName.value}
            autoCompleteType="kita"
            textContentType="kita"
            keyboardType="kita"
            />
            <TextInput
            label="E-Mail"
            returnKeyType="next"
            value={email_kita}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            />
            {/* Ansprechpartner */}
            {/* Straße */}          {/* Hausnummer */}
            {/* PLZ */}            {/* Ort */}
          </View>
          {/*Neue Appbar, wird erst im nächsten Sprint relevant*/}
        </View>
    </Background>
  )
} 