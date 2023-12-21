import React, { useState } from 'react';
import { View, Dimensions } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { Paragraph, Text, Card } from 'react-native-paper'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/ProfileButton'
import Header from '../../components/MainComponents/HeaderKita'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { plzValidator, ortValidator, straßeValidator, nummerValidator } from '../../validator/adressValidator'
import ProfilePicture from '../../components/MainComponents/ProfilePicture'

  /**
   * @memberof ProfileKitaScreens
   * @class ProfileKitaScreen
   * @description Zuständig für das Anzeigen der eigenen Daten im Profil
   */

export default function ProfileKitaScreen({ navigation }) {
  const screenWidth = Dimensions.get('window').width;

  const [name_kita, setNameKita] = useState(null) 
  const [email_kita, setEmailKita] = useState(null)
  const [anrede_kita, setAnredeKita] = useState(null)
  const [vorname_kita, setVornameKita] = useState(null)
  const [nachname_kita, setNachnameKita] = useState(null)
  const [straße_kita, setStraßeKita] = useState(null)
  const [ort_kita, setOrtKita] = useState(null)
  const [plz_kita, setplzKita] = useState(null)
  const [nr_kita, setNrKita] = useState(null)

  /**
   * @method fetchData
   * @memberof ProfileKitaScreens.ProfileKitaScreen
   * @async
   * @description Async Methode welche die Daten auf dem Profil anzeigt
   */

  useFocusEffect(() => {
    const fetchData = async () => {
      try {
        const name = await AsyncStorage.getItem('name_kita');
        const email = await AsyncStorage.getItem('email');
        const anrede = await AsyncStorage.getItem('anrede_ansprechperson');
        const vorname = await AsyncStorage.getItem('vorname_ansprechperson');
        const nachname = await AsyncStorage.getItem('nachname_ansprechperson');
        const straße = await AsyncStorage.getItem('strasse');
        const ort = await AsyncStorage.getItem('ort');
        const plz = await AsyncStorage.getItem('plz');
        const nr = await AsyncStorage.getItem('nr');
        setNameKita(name);
        setEmailKita(email);
        setAnredeKita(anrede);
        setVornameKita(vorname);
        setNachnameKita(nachname);
        setStraßeKita(straße);
        setOrtKita(ort);
        setplzKita(plz);
        setNrKita(nr);

      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    };
    fetchData();
  })

  /**
   * @method onEditPressed
   * @memberof ProfileKitaScreens.ProfileKitaScreen
   * @description Methode welche durch Klicken auf einen Button zum Editieren des Profils weiterleitet
   */

  const onEditPressed = async() => {
    navigation.navigate('ProfileKitaEditScreen') 
  }

  return (
    <Background>
      <Header items="Profil" icon="logout" ></Header>

        <View style={{ flex: 1, top: 60, width: screenWidth }}>

          <View style={{ flex: 1, flexDirection: 'row'}}>

            <View style={{ flex: 1,alignItems: 'center',justifyContent: 'space-around'}}>
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
                <Text variant="bodyMedium">Ansprechperson: {anrede_kita} {vorname_kita} {nachname_kita}</Text>
                <Text variant="bodyMedium"></Text>
                <Text variant="bodyMedium">Straße: {straße_kita} {nr_kita}</Text>
                <Text variant="bodyMedium">Ort: {plz_kita} {ort_kita}</Text>
              </Card.Content>
            </Card>
          </View>
          {/*ProfilBild mit eigener Komponente mit get nach Bild und parameter user id geht vllt mit paper und avatar
          neben dran Name Kita und drunter BUtton für Profil bearbeiten */}
          {/*Neue Appbar, wird erst im nächsten Sprint relevant*/}
        </View>
    </Background>
  )
} 