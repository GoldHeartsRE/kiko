import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/ProfileButton'
import TextInput from '../../components/KitaCreationComponents/TextInput'
import Header from '../../components/MainComponents/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { plzValidator, ortValidator, straßeValidator, nummerValidator } from '../../validator/adressValidator'
import { kitaNameValidator, vornameValidator, nachnameValidator } from '../../validator/nameValidator'
import { emailValidator } from '../../validator/emailValidator'
import ProfilePicture from '../../components/MainComponents/ProfilePicture'
import DropDown from '../../components/MainComponents/DropDown'
import { IP } from '../../constants/constants'

  /**
   * @memberof ProfileKitaScreens
   * @class ProfileKitaEditScreen
   * @description Ermöglicht im Profil die Editierung des eigenen Profils
   */

export default  function ProfileKitaEditScreen({ navigation }) {
  const screenWidth = Dimensions.get('window').width;

  // Daten holen, AsyncStorage (erstmal Mock)
  const [name_kita, setNameKita] = useState({ value: '', error: '' });
  const [email_kita, setEmailKita] = useState({ value: '', error: '' });
  const [anrede_kita, setAnredeKita] = useState({ value: '', error: '' });
  const [vorname_kita, setVornameKita] = useState({ value: '', error: '' });
  const [nachname_kita, setNachnameKita] = useState({ value: '', error: '' });
  const [straße_kita, setStraßeKita] = useState({ value: '', error: '' });
  const [ort_kita, setOrtKita] = useState({ value: '', error: '' });
  const [plz_kita, setplzKita] = useState({ value: '', error: '' });
  const [nr_kita, setNrKita] = useState({ value: '', error: '' });

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState([        
    { label: 'Herr', value: 'Herr' },
    { label: 'Frau', value: 'Frau' },
    { label: 'Divers', value: 'Divers' },]);

  /**
   * @method fetchData
   * @memberof ProfileKitaScreens.ProfileKitaScreens
   * @async
   * @description Async Methode welche durch initaliseren der Seite ausgeführt wird, Ruft alle Daten des eigenen Profils ab
   */

  useEffect(() => {
    const fetchData = async () => {
      try {
        var valueToken = await AsyncStorage.getItem('token') 
        const valueId = parseInt(await AsyncStorage.getItem('id'), 10); 
    
        fetch('http://'+ IP +':8080/api/v1/profil/kita/'+ valueId, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${valueToken}`,
          },
        })
        .then(response => response.json()) // Mapping auf JSON
        .then(data => {
          AsyncStorage.setItem('name_kita', data.name_kita);
          AsyncStorage.setItem('email', data.email);
          AsyncStorage.setItem('anrede_ansprechperson', data.anrede_ansprechperson);
          AsyncStorage.setItem('vorname_ansprechperson', data.vorname_ansprechperson);
          AsyncStorage.setItem('nachname_ansprechperson', data.nachname_ansprechperson);
          AsyncStorage.setItem('plz', data.adresse.plz.toString());
          AsyncStorage.setItem('ort', data.adresse.ort);
          AsyncStorage.setItem('strasse', data.adresse.strasse);
          AsyncStorage.setItem('nr', data.adresse.nr);
          console.log('Wert geladen!');
        })
        .catch(error => console.error('Fehler:', error));
        
        const name = await AsyncStorage.getItem('name_kita');
        const email = await AsyncStorage.getItem('email');
        const anrede = await AsyncStorage.getItem('anrede_ansprechperson');
        const vorname = await AsyncStorage.getItem('vorname_ansprechperson');
        const nachname = await AsyncStorage.getItem('nachname_ansprechperson');
        const straße = await AsyncStorage.getItem('strasse');
        const ort = await AsyncStorage.getItem('ort');
        const plz = await AsyncStorage.getItem('plz');
        const nr = await AsyncStorage.getItem('nr');
        setNameKita({value: name, error: '' });
        setEmailKita({value: email, error: '' });
        setAnredeKita({value: anrede, error: '' });
        setVornameKita({value: vorname, error: '' });
        setNachnameKita({value: nachname, error: '' });
        setStraßeKita({value: straße, error: '' });
        setOrtKita({value: ort, error: '' });
        setplzKita({value: plz, error: '' });
        setNrKita({value: nr, error: '' });
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    };
    fetchData();
  }, [])

  /**
   * @method setNewAsync
   * @memberof ProfileKitaScreens.ProfileKitaScreens
   * @async
   * @description Async Methode welche alle geänderten Daten abspeichert
   */

  const setNewAsync = async() => {
    try {
      // Den aktualisierten Wert in AsyncStorage speichern
      await AsyncStorage.setItem('name_kita', name_kita.value);
      await AsyncStorage.setItem('email', email_kita.value);
      await AsyncStorage.setItem('anrede_ansprechperson', anrede_kita);
      await AsyncStorage.setItem('vorname_ansprechperson', vorname_kita.value);
      await AsyncStorage.setItem('nachname_ansprechperson', nachname_kita.value);
      await AsyncStorage.setItem('plz', plz_kita.value);
      await AsyncStorage.setItem('ort', ort_kita.value);
      await AsyncStorage.setItem('strasse', straße_kita.value);
      await AsyncStorage.setItem('nr', nr_kita.value);

      console.log('Wert erfolgreich aktualisiert!');
    } catch (error) {
      console.error('Fehler beim Speichern des Werts:', error);
    }
  }

  /**
   * @method onSavePressed
   * @memberof ProfileKitaScreens.ProfileKitaScreens
   * @async
   * @description Async Methode welche alle geänderten Daten mithilfe eines PUT-Requests an die Datenbank sendet
   */

  const onSavePressed = async() => {
    //Validieren
    const nameError = kitaNameValidator(name_kita.value)
    const emailError = emailValidator(email_kita.value)
    const vornameError = vornameValidator(vorname_kita.value)
    const nachnameError = nachnameValidator(nachname_kita.value)
    const plzError = plzValidator(plz_kita.value)
    const ortError = ortValidator(ort_kita.value)
    const straßeError = straßeValidator(straße_kita.value)
    const nummerError = nummerValidator(nr_kita.value)
    if (nameError || emailError || plzError || ortError || straßeError || nummerError || vornameError || nachnameError) {
      setNameKita({ ...name_kita, error: nameError })
      setplzKita({ ...plz_kita, error: plzError })
      setOrtKita({ ...ort_kita, error: ortError })
      setStraßeKita({ ...straße_kita, error: straßeError })
      setNrKita({ ...nr_kita, error: nummerError })
      setEmailKita({ ...email_kita, error: nummerError })
      setVornameKita({ ...vorname_kita, error: vornameError })
      setNachnameKita({ ...nachname_kita, error: nachnameError })
      return
    }
    navigation.navigate('DashboardKitaScreen') 
    setNewAsync()

    var valueToken = await AsyncStorage.getItem('token')
    const valueId = parseInt(await AsyncStorage.getItem('id'), 10);  
    console.log(valueToken);
    console.log(`Bearer ${valueToken}`);

    fetch('http://'+ IP +':8080/api/v1/profil/kita/'+ valueId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${valueToken}`,
      },
      body: JSON.stringify({
        email: email_kita.value,
        name_kita: name_kita.value,
        anrede_ansprechperson: anrede_kita.value,
        vorname_ansprechperson: vorname_kita.value,
        nachname_ansprechperson: nachname_kita.value,
        adresse: {
          plz: plz_kita.value,
          ort: ort_kita.value,
          strasse: straße_kita.value,
          nr: nr_kita.value
        }
      }),
    })
    .then(response => response.json())
    .then( data => {
      console.log(data);
      // Async aktualisieren
      navigation.navigate('DashboardKitaScreen') 
      return
    })
    .catch(error => console.error('Fehler:', error));
  }

  /**
   * @method onBackPressed
   * @memberof ProfileKitaScreens.ProfileKitaScreens
   * @description Methode um zurück zum Profil zu gelangen
   */

  const onBackPressed = async() => {
    navigation.navigate('DashboardKitaScreen') 
  }

  return (
    <Background>
      <Header items="Profil" icon="logout" ></Header>

        <View style={{ flex: 1, top: 60, width: screenWidth }}>
          
          <View style={{ flex: 1, flexDirection: 'row'}}>

            <View style={{ flex: 1,alignItems: 'center',justifyContent: 'space-around'}}>
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
              onChangeText={(text) => setNameKita({value: text})}
              error={!!name_kita.error}
              errorText={name_kita.error}
              value={name_kita.value}
              autoCompleteType="off"
              textContentType="none"
              keyboardType="default"
            />
            <TextInput
              label="E-Mail"
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={(text) => setEmailKita({value: text, error: '' })}
              error={!!email_kita.error}
              errorText={email_kita.error}
              value={email_kita.value} 
              autoCompleteType="off"
              textContentType="none"
              keyboardType="default"
            />
            {/* Ansprechpartner */}
            <DropDown items={selectedItem} placeh={anrede_kita.value} val={anrede_kita} open={open} setVal={setAnredeKita} setItems={setSelectedItem} setOpen={setOpen} />
            <TextInput
              label="Vorname"
              returnKeyType="next"
              value={vorname_kita.value}
              onChangeText={(text) => setVornameKita({ value: text, error: '' })}
              error={!!vorname_kita.error}
              errorText={vorname_kita.error}
              autoCapitalize="none"
              autoCompleteType="off"
              textContentType="none"
              keyboardType="default"
            />
            <TextInput
              label="Nachname"
              returnKeyType="done"
              value={nachname_kita.value}
              onChangeText={(text) => setNachnameKita({ value: text, error: '' })}
              error={!!nachname_kita.error}
              errorText={nachname_kita.error}
              autoCapitalize="none"
              autoCompleteType="off"
              textContentType="none"
              keyboardType="default"
            />
            {/* Adresse */}
            <TextInput
              label="PLZ"
              returnKeyType="next"
              value={plz_kita.value}
              onChangeText={(text) => setplzKita({ value: text, error: '' })}
              error={!!plz_kita.error}
              errorText={plz_kita.error}
              autoCapitalize="none"
              autoCompleteType="off"
              textContentType="none"
              keyboardType="numeric"
            />
            <TextInput
              label="Ort"
              returnKeyType="next"
              value={ort_kita.value}
              onChangeText={(text) => setOrtKita({ value: text, error: '' })}
              error={!!ort_kita.error}
              errorText={ort_kita.error}
              autoCapitalize="none"
              autoCompleteType="off"
              textContentType="none"
              keyboardType="default"
            />
            <TextInput
              label="Straße"
              returnKeyType="next"
              value={straße_kita.value}
              onChangeText={(text) => setStraßeKita({ value: text, error: '' })}
              error={!!straße_kita.error}
              errorText={straße_kita.error}
              autoCapitalize="none"
              autoCompleteType="off"
              textContentType="none"
              keyboardType="default"
            />
            <TextInput
              label="Nr."
              returnKeyType="done"
              value={nr_kita.value}
              onChangeText={(text) => setNrKita({ value: text, error: '' })}
              error={!!nr_kita.error}
              errorText={nr_kita.error}
              autoCompleteType="off"
              textContentType="none"
              keyboardType="numeric"
            />
          </View>
          {/*Neue Appbar, wird erst im nächsten Sprint relevant*/}
        </View>
    </Background>
  )
} 