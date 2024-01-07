import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Dimensions, View } from 'react-native'
import Header from '../../components/AdminComponents/HeaderAdmin'
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import DropDown from '../../components/MainComponents/DropDown'
import TextInput from '../../components/PartnerCreationComponents/TextInput'

//Nicht für MVP relevant und zeitlich nicht hinbekommen, soll der Screen sein um die Daten der einzelnen User als Admin zu bearbeiten

export default function EditUserScreen ({ navigation }) {
  const screenWidth = Dimensions.get('window').width

  const [email_partner, setEmailPartner] = useState({ value: '', error: '' })
  const [anrede_partner, setAnredePartner] = useState({ value: '', error: '' })
  const [dataEdit, setDataEdit] = useState([])

  const [open, setOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState([
    { label: 'Herr', value: 'Herr' },
    { label: 'Frau', value: 'Frau' },
    { label: 'Divers', value: 'Divers' }
  ])

  useEffect(() => {
    const fetchData = async () => {
      var valueToken = await AsyncStorage.getItem('token')
      // var valueId = await AsyncStorage.getItem('userid')
      const valueId = parseInt(await AsyncStorage.getItem('userid'), 10)

      fetch('http://localhost:8080/api/v1/profil/partner/' + valueId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${valueToken}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setDataEdit(data)
          console.log(data)
        })
        .catch(error => console.error('Fehler:', error))
    }
    setTimeout(() => {
      fetchData()
    }, 1)
  }, [])

  const onSavePressed = async () => {
    navigation.navigate('DashboardPartnerScreen')

    var valueToken = await AsyncStorage.getItem('token')
    // var valueId = await AsyncStorage.getItem('userid')
    const valueId = parseInt(await AsyncStorage.getItem('userid'), 10)
    console.log(valueToken)
    console.log(`Bearer ${valueToken}`)

    fetch('http://localhost:8080/api/v1/profil/partner/' + valueId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${valueToken}`
      },
      body: JSON.stringify({
        email: email_partner.value
      })
    })
      .then(response => response)
      .then(data => {
        console.log(data)
        navigation.navigate('DashboardAdminScreen')
        return
      })
      .catch(error => console.error('Fehler:', error))
  }

  const onBackPressed = async () => {
    navigation.navigate('DashboardAdminScreen')
  }

  return (
    <Background>
      <Header items='Profil' icon='logout'></Header>

      <View style={{ flex: 1, top: 60, width: screenWidth }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            {/* Profilbild wie in Profilerstellung nur anders*/}
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
            <Button mode='contained' onPress={onBackPressed}>
              Zurück
            </Button>
          </View>
        </View>

        <View style={{ flex: 3 }}>
          <TextInput
            label='E-Mail'
            returnKeyType='next'
            value={dataEdit.email}
            onChangeText={text => setEmailPartner({ value: text, error: '' })}
            error={!!email_partner.error}
            errorText={email_partner.error}
            autoCapitalize='none'
            autoCompleteType='email'
            textContentType='emailAddress'
            keyboardType='email-address'
          />
          {/* Ansprechpartner */}
          <DropDown
            items={selectedItem}
            placeh={anrede_partner.value}
            val={anrede_partner}
            open={open}
            setVal={setAnredePartner}
            setItems={setSelectedItem}
            setOpen={setOpen}
          />
        </View>
        {/*Neue Appbar, wird erst im nächsten Sprint relevant*/}
      </View>
    </Background>
  )
}
