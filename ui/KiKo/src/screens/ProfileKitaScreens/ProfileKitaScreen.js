import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Drawer } from 'react-native-drawer-layout'
import { Card, Text } from 'react-native-paper'
import DrawerKita from '../../components/MainComponents/DrawerKita'
import Header from '../../components/MainComponents/Header'
import Button from '../../components/MainComponents/ProfileButton'
import { IP } from '../../constants/constants'

/**
 * @memberof ProfileKitaScreens
 * @class ProfileKitaScreen
 * @description Zuständig für das Anzeigen der eigenen Daten im Profil
 */

export default function ProfileKitaScreen ({ navigation }) {
  const screenWidth = Dimensions.get('window').width
  const [open, setOpen] = React.useState(false)

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
        var valueToken = await AsyncStorage.getItem('token')
        const valueId = parseInt(await AsyncStorage.getItem('id'), 10)

        fetch('http://' + IP + ':8080/api/v1/profil/kita/' + valueId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${valueToken}`
          }
        })
          .then(response => response.json()) // Mapping auf JSON
          .then(data => {
            AsyncStorage.setItem('name_kita', data.name_kita)
            AsyncStorage.setItem('email', data.email)
            AsyncStorage.setItem(
              'anrede_ansprechperson',
              data.anrede_ansprechperson
            )
            AsyncStorage.setItem(
              'vorname_ansprechperson',
              data.vorname_ansprechperson
            )
            AsyncStorage.setItem(
              'nachname_ansprechperson',
              data.nachname_ansprechperson
            )
            AsyncStorage.setItem('plz', data.adresse.plz.toString())
            AsyncStorage.setItem('ort', data.adresse.ort)
            AsyncStorage.setItem('strasse', data.adresse.strasse)
            AsyncStorage.setItem('nr', data.adresse.nr)
            console.log('Wert geladen!')
          })
          .catch(error => console.error('Fehler:', error))

        const name = await AsyncStorage.getItem('name_kita')
        const email = await AsyncStorage.getItem('email')
        const anrede = await AsyncStorage.getItem('anrede_ansprechperson')
        const vorname = await AsyncStorage.getItem('vorname_ansprechperson')
        const nachname = await AsyncStorage.getItem('nachname_ansprechperson')
        const straße = await AsyncStorage.getItem('strasse')
        const ort = await AsyncStorage.getItem('ort')
        const plz = await AsyncStorage.getItem('plz')
        const nr = await AsyncStorage.getItem('nr')
        setNameKita(name)
        setEmailKita(email)
        setAnredeKita(anrede)
        setVornameKita(vorname)
        setNachnameKita(nachname)
        setStraßeKita(straße)
        setOrtKita(ort)
        setplzKita(plz)
        setNrKita(nr)
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error)
      }
    }
    fetchData()
  })

  /**
   * @method onEditPressed
   * @memberof ProfileKitaScreens.ProfileKitaScreen
   * @description Methode welche durch Klicken auf einen Button zum Editieren des Profils weiterleitet
   */

  const onEditPressed = async () => {
    navigation.navigate('ProfileKitaEditScreen')
  }

  return (
    <Drawer
      style={styles.background}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <DrawerKita></DrawerKita>
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
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-around'
            }}
          >
            <Text variant='headlineMedium'>{name_kita}</Text>
            <Button mode='contained' onPress={onEditPressed}>
              Profil bearbeiten
            </Button>
          </View>
        </View>

        <View style={{ flex: 3 }}>
          <Card>
            <Card.Content>
              <Text variant='titleLarge'>Kontaktdaten:</Text>
              <Text variant='bodyMedium'>Email: {email_kita}</Text>
              <Text variant='bodyMedium'>
                Ansprechperson: {anrede_kita} {vorname_kita} {nachname_kita}
              </Text>
              <Text variant='bodyMedium'></Text>
              <Text variant='bodyMedium'>
                Straße: {straße_kita} {nr_kita}
              </Text>
              <Text variant='bodyMedium'>
                Ort: {plz_kita} {ort_kita}
              </Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </Drawer>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f8f4ec'
  }
})
