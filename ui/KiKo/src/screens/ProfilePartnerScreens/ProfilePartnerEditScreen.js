import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { Drawer } from 'react-native-drawer-layout'
import { SegmentedButtons, Text } from 'react-native-paper'
import Button from '../../components/MainComponents/Button'
import DrawerPartner from '../../components/MainComponents/DrawerPartner'
import Header from '../../components/MainComponents/Header'
import ProfilePicture from '../../components/MainComponents/ProfilePicture'
import BigTextInput from '../../components/PartnerCreationComponents/BigTextInput'
import TextInput from '../../components/PartnerCreationComponents/TextInput'
import { IP } from '../../constants/constants'
import { inputValidator } from '../../validator/ProfilePartnerValidator/inputValidator'
import {
  nummerValidator,
  ortValidator,
  plzValidator,
  straßeValidator
} from '../../validator/adressValidator'
import { emailValidator } from '../../validator/emailValidator'
import {
  nachnameValidator,
  vornameValidator
} from '../../validator/nameValidator'

/**
 * @memberof ProfilePartnerScreens
 * @class ProfilePartnerEditScreen
 * @description Ermöglicht die Editierung des eigenen Profils
 */

export default function ProfilePartnerEditScreen ({ navigation }) {
  const screenWidth = Dimensions.get('window').width * 0.95

  //Getter und Setter für Requests
  const [email_partner, setEmailPartner] = useState({ value: '', error: '' })
  const [anrede_partner, setAnredePartner] = useState({ value: '', error: '' })
  const [vorname_partner, setVornamePartner] = useState({
    value: '',
    error: ''
  })
  const [nachname_partner, setNachnamePartner] = useState({
    value: '',
    error: ''
  })
  const [geschlecht_partner, setGeschlechtPartner] = useState({
    value: '',
    error: ''
  })
  const [geburtsdatum_partner, setGeburtsdatumPartner] = useState({
    value: '',
    error: ''
  })
  const [straße_partner, setStraßePartner] = useState({ value: '', error: '' })
  const [ort_partner, setOrtPartner] = useState({ value: '', error: '' })
  const [plz_partner, setplzPartner] = useState({ value: '', error: '' })
  const [nr_partner, setNrPartner] = useState({ value: '', error: '' })
  const [telefon_partner, setTelefonPartner] = useState({
    value: '',
    error: ''
  })
  const [taetigkeit_partner, setTaetigkeitPartner] = useState({
    value: '',
    error: ''
  })
  const [organisation_partner, setOrganisationPartner] = useState({
    value: '',
    error: ''
  })
  const [beschreibunug_partner, setBeschreibungPartner] = useState({
    value: '',
    error: ''
  })

  const [open, setOpen] = useState(false)

  /**
   * @method fetchData
   * @memberof ProfilePartnerScreens.ProfilePartnerEditScreen
   * @description Async Methode welche durch initaliseren der Seite ausgeführt wird, Ruft alle Daten des eigenen Profils ab
   */

  useEffect(() => {
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
            console.log(data)

            setEmailPartner({ value: data.email, error: '' })
            setAnredePartner({ value: data.anrede, error: '' })
            setVornamePartner({ value: data.vorname, error: '' })
            setNachnamePartner({ value: data.nachname, error: '' })
            setGeschlechtPartner({ value: data.geschlecht, error: '' })
            setGeburtsdatumPartner({ value: data.geburtsdatum, error: '' })
            setStraßePartner({ value: data.adresse.strasse, error: '' })
            setOrtPartner({ value: data.adresse.ort, error: '' })
            setplzPartner({ value: data.adresse.plz.toString(), error: '' })
            setNrPartner({ value: data.adresse.nr, error: '' })
            setTelefonPartner({ value: data.telefon, error: '' })
            setTaetigkeitPartner({ value: data.taetigkeit, error: '' })
            setOrganisationPartner({ value: data.organisation, error: '' })
            setBeschreibungPartner({ value: data.beschreibung, error: '' })

            console.log('Wert erfolgreich geladen!')
            return
          })
          .catch(error => console.error('Fehler:', error))
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error)
      }
    }
    fetchData()
  }, [])

  /**
   * @method onSavePressed
   * @memberof ProfilePartnerScreens.ProfilePartnerEditScreen
   * @async
   * @description Async Methode welche alle geänderten Daten mithilfe eines PUT-Requests an die Datenbank sendet
   */

  const onSavePressed = async () => {
    //Validieren
    const emailError = emailValidator(email_partner.value)
    const vornameError = vornameValidator(vorname_partner.value)
    const nachnameError = nachnameValidator(nachname_partner.value)
    const plzError = plzValidator(plz_partner.value)
    const ortError = ortValidator(ort_partner.value)
    const straßeError = straßeValidator(straße_partner.value)
    const nummerError = nummerValidator(nr_partner.value)
    const telefonError = inputValidator(telefon_partner.value)
    if (
      telefonError ||
      emailError ||
      plzError ||
      ortError ||
      straßeError ||
      nummerError ||
      vornameError ||
      nachnameError
    ) {
      setplzPartner({ ...plz_partner, error: plzError })
      setOrtPartner({ ...ort_partner, error: ortError })
      setStraßePartner({ ...straße_partner, error: straßeError })
      setNrPartner({ ...nr_partner, error: nummerError })
      setEmailPartner({ ...email_partner, error: nummerError })
      setVornamePartner({ ...vorname_partner, error: vornameError })
      setNachnamePartner({ ...nachname_partner, error: nachnameError })
      setTelefonPartner({ ...telefon_partner, error: telefonError })
      return
    }
    navigation.navigate('DashboardPartnerScreen')
    // setNewAsync()

    var valueToken = await AsyncStorage.getItem('token')
    const valueId = parseInt(await AsyncStorage.getItem('id'), 10)
    console.log(`Bearer ${valueToken}`)

    fetch('http://' + IP + ':8080/api/v1/profil/partner/' + valueId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${valueToken}`
      },
      body: JSON.stringify({
        email: email_partner.value,
        anrede: anrede_partner.value,
        vorname: vorname_partner.value,
        nachname: nachname_partner.value,
        geburtsdatum: geburtsdatum_partner.value,
        adresse: {
          plz: plz_partner.value,
          ort: ort_partner.value,
          strasse: straße_partner.value,
          nr: nr_partner.value
        },
        telefon: telefon_partner.value,
        beschreibung: beschreibunug_partner.value
      })
    })
      .then(data => {
        navigation.navigate('ProfilePartnerScreen')
        return
      })
      .catch(error => console.error('Fehler:', error))
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
        items='Profil bearbeiten'
        icon='menu'
        onPress={() => setOpen(prevOpen => !prevOpen)}
      />
      <View
        style={{
          flex: 1,
          top: 60,
          width: screenWidth,
          alignItems: 'center',
          marginRight: 'auto',
          marginLeft: 'auto'
        }}
      >
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
              justifyContent: 'space-around'
            }}
          >
            <Button mode='contained' onPress={onSavePressed}>
              Speichern
            </Button>
          </View>
        </View>

        <View style={{ flex: 3 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollViewContent}
          >
            <TextInput
              label='E-Mail'
              returnKeyType='next'
              value={email_partner.value}
              onChangeText={text => setEmailPartner({ value: text, error: '' })}
              error={!!email_partner.error}
              errorText={email_partner.error}
              autoCapitalize='none'
              autoCompleteType='off'
              textContentType='none'
              keyboardType='default'
            />
            {/* Ansprechpartner */}
            <View style={{ alignItems: 'center' }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text variant='labelLarge'>Anrede</Text>
              </View>
              <SegmentedButtons
                value={anrede_partner.value}
                onValueChange={value =>
                  setAnredePartner({ value: value, error: '' })
                }
                style={{ backgroundColor: 'white', width: screenWidth }}
                buttons={[
                  { value: 'Herr', label: 'Herr' },
                  { value: 'Frau', label: 'Frau' },
                  { value: 'Divers', label: 'Divers' }
                ]}
              />
            </View>
            <TextInput
              label='Vorname'
              returnKeyType='next'
              value={vorname_partner.value}
              onChangeText={text =>
                setVornamePartner({ value: text, error: '' })
              }
              error={!!vorname_partner.error}
              errorText={vorname_partner.error}
              autoCapitalize='none'
              autoCompleteType='off'
              textContentType='none'
              keyboardType='default'
            />
            <TextInput
              label='Nachname'
              returnKeyType='done'
              value={nachname_partner.value}
              onChangeText={text =>
                setNachnamePartner({ value: text, error: '' })
              }
              error={!!nachname_partner.error}
              errorText={nachname_partner.error}
              autoCapitalize='none'
              autoCompleteType='off'
              textContentType='none'
              keyboardType='default'
            />
            {/* Geburtstag noch einfügen */}
            {/* Adresse */}
            <TextInput
              label='PLZ'
              returnKeyType='next'
              value={plz_partner.value}
              onChangeText={text => setplzPartner({ value: text, error: '' })}
              error={!!plz_partner.error}
              errorText={plz_partner.error}
              autoCapitalize='none'
              autoCompleteType='off'
              textContentType='none'
              keyboardType='numeric'
            />
            <TextInput
              label='Ort'
              returnKeyType='next'
              value={ort_partner.value}
              onChangeText={text => setOrtPartner({ value: text, error: '' })}
              error={!!ort_partner.error}
              errorText={ort_partner.error}
              autoCapitalize='none'
              autoCompleteType='off'
              textContentType='none'
              keyboardType='default'
            />
            <TextInput
              label='Straße'
              returnKeyType='next'
              value={straße_partner.value}
              onChangeText={text =>
                setStraßePartner({ value: text, error: '' })
              }
              error={!!straße_partner.error}
              errorText={straße_partner.error}
              autoCapitalize='none'
              autoCompleteType='off'
              textContentType='none'
              keyboardType='default'
            />
            <TextInput
              label='Nr.'
              returnKeyType='done'
              value={nr_partner.value}
              onChangeText={text => setNrPartner({ value: text, error: '' })}
              error={!!nr_partner.error}
              errorText={nr_partner.error}
              autoCompleteType='off'
              textContentType='none'
              keyboardType='numeric'
            />
            <TextInput
              label='Telefonnummer'
              onChangeText={text =>
                setTelefonPartner({ value: text, error: '' })
              }
              value={telefon_partner.value}
              error={!!telefon_partner.error}
              errorText={telefon_partner.error}
              returnKeyType='next'
              autoCapitalize='none'
              autoCompleteType='off'
              textContentType='none'
              keyboardType='numeric'
            />
            <BigTextInput
              label='Hallo, ich bin...'
              returnKeyType='next'
              onChangeText={text =>
                setBeschreibungPartner({ value: text, error: '' })
              }
              value={beschreibunug_partner.value}
              autoCapitalize='none'
              autoCompleteType='off'
              textContentType='none'
              keyboardType='default'
            />
            <View style={{ height: 100 }}></View>
          </ScrollView>
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
  },
  scrollViewContent: {
    flexDirection: 'column'
  }
})
