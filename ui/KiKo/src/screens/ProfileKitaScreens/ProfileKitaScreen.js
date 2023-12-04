import React, { useState, useLayoutEffect, useRef } from 'react';
import { View, Dimensions } from 'react-native'
import { Paragraph, Text, Card } from 'react-native-paper'
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

export default function ProfileKitaScreen({ navigation }) {
  const screenWidth = Dimensions.get('window').width;
  // Daten holen, vermutlich Fetch (erstmal Mock)
  const name_kita = 'Kita Sonnenschein';
  const email_kita = 'max-mustermann@gmail.com';
  const ansprechperson_kita = 'Herr Mustermann';
  const straße_kita = 'Musterstraße 12';
  const ort_kita = 'Musterstadt';

  const onEditPressed = async() => {
    //Validieren und zu bearbeiten navigieren
    navigation.navigate('ProfileKitaEditScreen') 
  }

  return (
    <Background>
      <Header items="Profil" icon="logout" ></Header>

        <View style={{ flex: 1, top: 60, width: screenWidth }}>

          <View style={{ flex: 1, flexDirection: 'row'}}>
            <View style={{ flex: 1, alignItems: 'center',justifyContent: 'center'}}>
              <ProfilePicture></ProfilePicture>
            </View>

            <View style={{ flex: 2,alignItems: 'center',justifyContent: 'space-around'}}>
              <Text variant='headlineMedium'>{name_kita}</Text>
              <Button mode="contained" onPress={onEditPressed}>
              Profil bearbeiten
              </Button>
            </View>
          </View>

          <View style={{ flex: 3}}>
            <Card>
              <Card.Content>
                <Text variant="titleLarge">Kontaktdaten:</Text>
                <Text variant="bodyMedium">Email: {email_kita}</Text>
                <Text variant="bodyMedium">Ansprechperson: {ansprechperson_kita}</Text>
                <Text variant="bodyMedium"></Text>
                <Text variant="bodyMedium">Straße: {straße_kita}</Text>
                <Text variant="bodyMedium">Ort: {ort_kita}</Text>
              </Card.Content>
            </Card>
          </View>
          {/*ProfilBild mit eigener Komponente mit get nach Bild und parameter user id geht vllt mit paper und avatar
          neben dran Name Kita und drunter BUtton für Profil bearbeiten */}
          {/*<ProfilePicture></ProfilePicture>*/}
          {/*Kontaktdaten*/}
          {/*Neue Appbar, wird erst im nächsten Sprint relevant*/}
        </View>
    </Background>
  )
} 