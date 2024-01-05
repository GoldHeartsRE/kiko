import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Drawer } from 'react-native-drawer-layout'
import { Card, Text } from 'react-native-paper'
import Button from '../../components/MainComponents/Button'
import DrawerPartner from '../../components/MainComponents/DrawerPartner'
import Header from '../../components/MainComponents/Header'
import ProfilePicture from '../../components/MainComponents/ProfilePicture'
import { IP } from '../../constants/constants'

/**
 * @memberof ProfilePartnerScreens
 * @class ProfilePartnerScreen
 * @description Zuständig für das Anzeigen der eigenen Daten im Profil
 */

export default function ProfilePartnerScreen ({ navigation }) {
  const screenWidth = Dimensions.get('window').width

  const [open, setOpen] = React.useState(false)
  const [image, setImage] = useState(null)

  const [email_partner, setEmailPartner] = useState(null)
  const [anrede_partner, setAnredePartner] = useState(null)
  const [vorname_partner, setVornamePartner] = useState(null)
  const [nachname_partner, setNachnamePartner] = useState(null)
  const [geschlecht_partner, setGeschlechtPartner] = useState(null)
  const [geburtsdatum_partner, setGeburtsdatumPartner] = useState(null)
  const [straße_partner, setStraßePartner] = useState(null)
  const [ort_partner, setOrtPartner] = useState(null)
  const [plz_partner, setplzPartner] = useState(null)
  const [nr_partner, setNrPartner] = useState(null)
  const [telefon_partner, setTelefonPartner] = useState(null)
  const [taetigkeit_partner, setTaetigkeitPartner] = useState(null)
  const [organisation_partner, setOrganisationPartner] = useState(null)
  const [beschreibunug_partner, setBeschreibungPartner] = useState(null)

  /**
   * @method fetchData
   * @memberof ProfilePartnerScreens.ProfileKitaScreen
   * @async
   * @description Async Methode welche die Daten auf dem Profil anzeigt
   */

  const fetchData = async () => {
    try {
      var valueToken = await AsyncStorage.getItem('token')
      const valueId = parseInt(await AsyncStorage.getItem('id'), 10)
      fetch('http://' + IP + ':8080/api/v1/profil/partner/' + valueId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${valueToken}`
        }
      })
        .then(response => response.json()) // Mapping auf JSON
        .then(data => {
          AsyncStorage.setItem('email', data.email)
          AsyncStorage.setItem('anrede', data.anrede)
          AsyncStorage.setItem('vorname', data.vorname)
          AsyncStorage.setItem('nachname', data.nachname)
          AsyncStorage.setItem('geschlecht', data.geschlecht)
          AsyncStorage.setItem('geburtsdatum', data.geburtsdatum)
          AsyncStorage.setItem('plz', data.adresse.plz.toString())
          AsyncStorage.setItem('ort', data.adresse.ort)
          AsyncStorage.setItem('strasse', data.adresse.strasse)
          AsyncStorage.setItem('nr', data.adresse.nr)
          AsyncStorage.setItem('telefon', data.telefon)
          AsyncStorage.setItem('taetigkeit', data.taetigkeit)
          AsyncStorage.setItem('organisation', data.organisation)
          AsyncStorage.setItem('beschreibung', data.beschreibung)

          console.log('Wert erfolgreich geladen!')
          return
        })
        .catch(error => console.error('Fehler:', error))

      const email = await AsyncStorage.getItem('email')
      const anrede = await AsyncStorage.getItem('anrede')
      const vorname = await AsyncStorage.getItem('vorname')
      const nachname = await AsyncStorage.getItem('nachname')
      const geschlecht = await AsyncStorage.getItem('geschlecht')
      const geburtsdatum = await AsyncStorage.getItem('geburtsdatum')
      const straße = await AsyncStorage.getItem('strasse')
      const ort = await AsyncStorage.getItem('ort')
      const plz = await AsyncStorage.getItem('plz')
      const nr = await AsyncStorage.getItem('nr')
      const taetigkeit = await AsyncStorage.getItem('taetigkeit')
      const telefon = await AsyncStorage.getItem('telefon')
      const organisation = await AsyncStorage.getItem('organisation')
      const beschreibung = await AsyncStorage.getItem('beschreibung')
      setEmailPartner(email)
      setAnredePartner(anrede)
      setVornamePartner(vorname)
      setNachnamePartner(nachname)
      setGeschlechtPartner(geschlecht)
      setGeburtsdatumPartner(geburtsdatum)
      setStraßePartner(straße)
      setOrtPartner(ort)
      setplzPartner(plz)
      setNrPartner(nr)
      setTelefonPartner(telefon)
      setTaetigkeitPartner(taetigkeit)
      setOrganisationPartner(organisation)
      setBeschreibungPartner(beschreibung)
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      setTimeout(function () {
        fetchData()
      }, 1)
    }, [navigation])
  )

  /**
   * @method onEditPressed
   * @memberof ProfilePartnerScreens.ProfileKitaScreen
   * @description Methode welche durch Klicken auf einen Button zum Editieren des Profils weiterleitet
   */

  const onEditPressed = async () => {
    navigation.navigate('ProfilePartnerEditScreen')
  }

  return (
    <Drawer
      style={styles.background}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <DrawerPartner></DrawerPartner>
      }}
    >
      <Header
        items='Profil'
        icon='menu'
        onPress={() => setOpen(prevOpen => !prevOpen)}
      ></Header>
      <View style={{ flex: 1, top: 60, width: screenWidth }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <ProfilePicture></ProfilePicture>
          </View>

          <View
            style={{
              flex: 2,
              alignItems: 'center',
              justifyContent: 'space-around',
              marginTop: 10
            }}
          >
            <Text variant='headlineMedium'>
              {vorname_partner} {nachname_partner}
            </Text>
            <Button mode='contained' onPress={onEditPressed}>
              Profil bearbeiten
            </Button>
          </View>
        </View>

        <View style={{ flex: 3 }}>
          <Card>
            <Card.Content>
              <Text variant='titleLarge'>Kontaktdaten:</Text>
              <Text variant='bodyMedium'>
                {anrede_partner} {vorname_partner} {nachname_partner}
              </Text>
              <Text variant='bodyMedium'>Email: {email_partner}</Text>
              <Text variant='bodyMedium'>Telefon: {telefon_partner}</Text>
              <Text variant='bodyMedium'>
                Geburtsdatum: {geburtsdatum_partner}
              </Text>
              <Text variant='bodyMedium'></Text>
              <Text variant='bodyMedium'>Tätigkeit: {taetigkeit_partner}</Text>
              <Text variant='bodyMedium'>
                Organisation: {organisation_partner}
              </Text>
              <Text variant='bodyMedium'></Text>
              <Text variant='bodyMedium'>
                Straße: {straße_partner} {nr_partner}
              </Text>
              <Text variant='bodyMedium'>
                Ort: {plz_partner} {ort_partner}
              </Text>
            </Card.Content>
          </Card>
          <Card style={{ marginTop: 20 }}>
            <Card.Content>
              <Text variant='titleLarge'>Beschreibung:</Text>
              <Text variant='bodyMedium'>{beschreibunug_partner}</Text>
            </Card.Content>
          </Card>
        </View>
        {/*ProfilBild mit eigener Komponente mit get nach Bild und parameter user id geht vllt mit paper und avatar
          neben dran Name Kita und drunter BUtton für Profil bearbeiten */}
        {/* <ProfilePicture></ProfilePicture> */}
        {/*Neue Appbar, wird erst im nächsten Sprint relevant*/}
      </View>
    </Drawer>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f8f4ec'
  },
  container: {
    height: 180,
    width: 180,
    borderWidth: 1,
    borderColor: 'gray',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden'
  }
})
