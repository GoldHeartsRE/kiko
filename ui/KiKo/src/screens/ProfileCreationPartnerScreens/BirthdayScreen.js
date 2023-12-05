import React, { useState } from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import Paragraphtitel from '../../components/PartnerCreationComponents/Paragraph-Titel'
import { DatePickerInput } from 'react-native-paper-dates';
import { theme } from '../../theme/theme'
import { SafeAreaProvider } from "react-native-safe-area-context";
import Background from '../../components/MainComponents/Background'
import Button from '../../components/MainComponents/Button'
import DatePicker from '../../components/PartnerCreationComponents/DatePicker'
import Header from '../../components/MainComponents/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Birthdaycreen({ navigation }) {

  const [inputDate, setInputDate] = React.useState(undefined)

      const onContinuePressed = async() => {

        console.log(inputDate);
    
        navigation.navigate('AdressScreen') 
    
        var valueToken = await AsyncStorage.getItem('token') 
        var valueId = await AsyncStorage.getItem('id') 
    
        fetch('http://localhost:8080/api/v1/profil/partner/' + valueId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${valueToken}`,
          },
          body: JSON.stringify({
            geburtsdatum: inputDate,
          }),
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          navigation.navigate('AdressScreen') 
          return
        })
        .catch(error => console.error('Fehler:', error));
      }

  return (
    <Background>
      <Header items="Profil erstellen" icon="logout"  ></Header>
      <View style={styles.container}>
      <Paragraph style={styles.text1}>Schritt: 3/10</Paragraph>
      <Paragraphtitel style={styles.text2}>WANN IST IHR GEBURTSTAG?</Paragraphtitel>
      <SafeAreaProvider>
      <View style={styles.container}>
        <DatePickerInput style={styles.design}
          label="Geburtsdatum"
          value={inputDate}
          onChange={(d) => setInputDate(d)}
          inputMode="start"
        />
      </View>
    </SafeAreaProvider>
      <Button mode="contained" style={styles.button} onPress={onContinuePressed}>
        NÄCHSTER SCHRITT
      </Button>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  design: {
    backgroundColor: theme.colors.surface,
  },
  container: {
    width: '105%',
    justifyContent: 'center', flex: 1, 
    alignItems: 'center',
    maxHeight: 100
  },
  button: {
    marginTop: 50,
  },
  text2: {
    fontWeight: 'bold',
    fontSize: 40,
    lineHeight: 75,
    textAlign: 'center',
    zIndex: -5,
    marginBottom: 50,
  },
})