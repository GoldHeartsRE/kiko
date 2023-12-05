import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import TextInput from '../../components/PartnerCreationComponents/TextInput'
import Header from '../../components/MainComponents/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { plzValidator, ortValidator, straßeValidator, nummerValidator } from '../../validator/adressValidator'
import { vornameValidator, nachnameValidator } from '../../validator/nameValidator'
import { emailValidator } from '../../validator/emailValidator'
import { inputValidator } from '../../validator/ProfilePartnerValidator/inputValidator'
import ProfilePicture from '../../components/MainComponents/ProfilePicture'
import DropDown from '../../components/MainComponents/DropDown'
import BigTextInput from '../../components/PartnerCreationComponents/BigTextInput'

export default  function ProfilePartnerEditScreen({ navigation }) {
  const screenWidth = Dimensions.get('window').width;

  // Daten holen, AsyncStorage (erstmal Mock)
  const [email_partner, setEmailPartner] = useState({ value: '', error: '' });
  const [anrede_partner, setAnredePartner] = useState({ value: '', error: '' });
  const [vorname_partner, setVornamePartner] = useState({ value: '', error: '' });
  const [nachname_partner, setNachnamePartner] = useState({ value: '', error: '' });
  const [geschlecht_partner, setGeschlechtPartner] = useState({ value: '', error: '' });
  const [geburtsdatum_partner, setGeburtsdatumPartner] = useState({ value: '', error: '' });
  const [straße_partner, setStraßePartner] = useState({ value: '', error: '' });
  const [ort_partner, setOrtPartner] = useState({ value: '', error: '' });
  const [plz_partner, setplzPartner] = useState({ value: '', error: '' });
  const [nr_partner, setNrPartner] = useState({ value: '', error: '' });
  const [telefon_partner, setTelefonPartner] = useState({ value: '', error: '' });
  const [taetigkeit_partner, setTaetigkeitPartner] = useState({ value: '', error: '' });
  const [organisation_partner, setOrganisationPartner] = useState({ value: '', error: '' });
  const [beschreibunug_partner, setBeschreibungPartner] = useState({ value: '', error: '' });

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState([        
    { label: 'Herr', value: 'Herr' },
    { label: 'Frau', value: 'Frau' },
    { label: 'Divers', value: 'Divers' },]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        const anrede = await AsyncStorage.getItem('anrede');
        const vorname = await AsyncStorage.getItem('vorname');
        const nachname = await AsyncStorage.getItem('nachname');
        const geschlecht = await AsyncStorage.getItem('geschlecht');
        const geburtsdatum = await AsyncStorage.getItem('geburtsdatum');
        const straße = await AsyncStorage.getItem('strasse');
        const ort = await AsyncStorage.getItem('ort');
        const plz = await AsyncStorage.getItem('plz');
        const nr = await AsyncStorage.getItem('nr');
        const taetigkeit = await AsyncStorage.getItem('taetigkeit');
        const telefon = await AsyncStorage.getItem('telefon');
        const organisation = await AsyncStorage.getItem('organisation');
        const beschreibung = await AsyncStorage.getItem('beschreibung');
        setEmailPartner({value: email, error: '' });
        setAnredePartner({value: anrede, error: '' });
        setVornamePartner({value: vorname, error: '' });
        setNachnamePartner({value: nachname, error: '' });
        setGeschlechtPartner({value: geschlecht, error: '' });
        setGeburtsdatumPartner({value: geburtsdatum, error: '' });
        setStraßePartner({value: straße, error: '' });
        setOrtPartner({value: ort, error: '' });
        setplzPartner({value: plz, error: '' });
        setNrPartner({value: nr, error: '' });
        setTelefonPartner({value: telefon, error: '' });
        setTaetigkeitPartner({value: taetigkeit, error: '' });
        setOrganisationPartner({value: organisation, error: '' });
        setBeschreibungPartner({value: beschreibung, error: '' });
        console.log('Wert erfolgreich geladen!');
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    };
    fetchData();
  }, [])

  const setNewAsync = async() => {
    try {
      // Den aktualisierten Wert in AsyncStorage speichern
      await AsyncStorage.setItem('email', email_partner.value);
      await AsyncStorage.setItem('anrede', anrede_partner);
      await AsyncStorage.setItem('vorname', vorname_partner.value);
      await AsyncStorage.setItem('nachname', nachname_partner.value);
      await AsyncStorage.setItem('geschlecht', geschlecht_partner.value);
      await AsyncStorage.setItem('geburtsdatum', geburtsdatum_partner.value);
      await AsyncStorage.setItem('plz', plz_partner.value);
      await AsyncStorage.setItem('ort', ort_partner.value);
      await AsyncStorage.setItem('strasse', straße_partner.value);
      await AsyncStorage.setItem('nr', nr_partner.value);
      await AsyncStorage.setItem('telefon', telefon_partner.value);
      await AsyncStorage.setItem('taetigkeit', taetigkeit_partner.value);
      await AsyncStorage.setItem('organisation', organisation_partner.value);
      await AsyncStorage.setItem('beschreibung', beschreibunug_partner.value);
      console.log('Wert erfolgreich aktualisiert!');
    } catch (error) {
      console.error('Fehler beim Speichern des Werts:', error);
    }
  }

  const onSavePressed = async() => {
    //Validieren
    const emailError = emailValidator(email_partner.value)
    const vornameError = vornameValidator(vorname_partner.value)
    const nachnameError = nachnameValidator(nachname_partner.value)
    const plzError = plzValidator(plz_partner.value)
    const ortError = ortValidator(ort_partner.value)
    const straßeError = straßeValidator(straße_partner.value)
    const nummerError = nummerValidator(nr_partner.value)
    const telefonError = inputValidator(telefon_partner.value)
    if ( telefonError || emailError || plzError || ortError || straßeError || nummerError || vornameError || nachnameError) {
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
    navigation.navigate('ProfilePartnerScreen') 
    setNewAsync()

    var valueToken = await AsyncStorage.getItem('token')
    var valueId = await AsyncStorage.getItem('id')  
    console.log(valueToken);
    console.log(`Bearer ${valueToken}`);

    fetch('http://localhost:8080/api/v1/profil/partner/'+ valueId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${valueToken}`,
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
      }),
    })
    .then(response => response.json())
    .then( data => {
      console.log(data);
      // Async aktuallisieren
      navigation.navigate('ProfilePartnerScreen') 
      return
    })
    .catch(error => console.error('Fehler:', error));
  }

  const onBackPressed = async() => {
    navigation.navigate('ProfilePartnerScreen') 
  }

  return (
    <Background>
      <Header items="Profil" icon="logout" ></Header>

        <View style={{ flex: 1, top: 60, width: screenWidth }}>

          <View style={{ flex: 1, flexDirection: 'row'}}>
            <View style={{ flex: 1, alignItems: 'center',justifyContent: 'center'}}>
                {/* Profilbild wie in Profilerstellung nur anders*/}
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
                label="E-Mail"
                returnKeyType="next"
                value={email_partner.value}
                onChangeText={(text) => setEmailPartner({ value: text, error: '' })}
                error={!!email_partner.error}
                errorText={email_partner.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            {/* Ansprechpartner */}
            <DropDown items={selectedItem} placeh={'Anrede'} val={anrede_partner} open={open} setVal={setAnredePartner} setItems={setSelectedItem} setOpen={setOpen} />
            <TextInput
              label="Vorname"
              returnKeyType="next"
              value={vorname_partner.value}
              onChangeText={(text) => setVornamePartner({ value: text, error: '' })}
              error={!!vorname_partner.error}
              errorText={vorname_partner.error}
              autoCapitalize="none"
              autoCompleteType="vorname"
              textContentType="vorname"
              keyboardType="vorname"
            />
            <TextInput
              label="Nachname"
              returnKeyType="done"
              value={nachname_partner.value}
              onChangeText={(text) => setNachnamePartner({ value: text, error: '' })}
              error={!!nachname_partner.error}
              errorText={nachname_partner.error}
              autoCapitalize="none"
              autoCompleteType="nachname"
              textContentType="nachname"
              keyboardType="nachname"
            />
            {/* Geburtstag noch einfügen */}
            {/* Adresse */}
            <TextInput
              label="PLZ"
              returnKeyType="next"
              value={plz_partner.value}
              onChangeText={(text) => setplzPartner({ value: text, error: '' })}
              error={!!plz_partner.error}
              errorText={plz_partner.error}
              autoCapitalize="none"
              autoCompleteType="plz"
              textContentType="plz"
              keyboardType="plz"
            />
            <TextInput
              label="Ort"
              returnKeyType="next"
              value={ort_partner.value}
              onChangeText={(text) => setOrtPartner({ value: text, error: '' })}
              error={!!ort_partner.error}
              errorText={ort_partner.error}
              autoCapitalize="none"
              autoCompleteType="ort"
              textContentType="ort"
              keyboardType="ort"
            />
            <TextInput
              label="Straße"
              returnKeyType="next"
              value={straße_partner.value}
              onChangeText={(text) => setStraßePartner({ value: text, error: '' })}
              error={!!straße_partner.error}
              errorText={straße_partner.error}
              autoCapitalize="none"
              autoCompleteType="straße"
              textContentType="straße"
              keyboardType="straße"
            />
            <TextInput
              label="Nr."
              returnKeyType="done"
              value={nr_partner.value}
              onChangeText={(text) => setNrPartner({ value: text, error: '' })}
              error={!!nr_partner.error}
              errorText={nr_partner.error}
            />
            <TextInput
                label="Telefonnummer"
                onChangeText={(text) => setTelefonPartner({ value: text, error: '' })}
                value={telefon_partner.value}
                error={!!telefon_partner.error}
                errorText={telefon_partner.error}
                returnKeyType="next"
                autoCapitalize="none"
                autoCompleteType="telefonnummer"
                textContentType="telefonnummer"
                keyboardType="telefonnummer"
            />
            <BigTextInput
                label="Hallo, ich bin..."
                returnKeyType="next"
                onChangeText={(text) => setBeschreibungPartner({ value: text, error: '' })}
                value={beschreibunug_partner.value}
                autoCapitalize="none"
                autoCompleteType="beschreibung"
                textContentType="beschreibung"
                keyboardType="beschreibung"
            />
          </View>
          {/*Neue Appbar, wird erst im nächsten Sprint relevant*/}
        </View>
    </Background>
  )
} 