import React, { useState } from 'react';
import { Avatar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ProfilePicture() {

// Hier holen wir uns das Bild und wenn es kein Bild gibt Default setzen, eventuell aus async storage ziehen
// und dann einfach mit nem if den icon wert setzen
const [image, setImage] = useState({ value: '', error: '' });

// useFocusEffect(() => {
//     const fetchData = async () => {
//     //   try {
//     //     const pic = await AsyncStorage.getItem('imagedata');
//     //     setBeschreibungPartner(beschreibung);
//     //     console.log('Wert erfolgreich geladen!');
//     //   } catch (error) {
//     //     console.error('Fehler beim Abrufen der Daten:', error);
//     //   }
//     var valueToken = await AsyncStorage.getItem('token') 
//     var valueId = await AsyncStorage.getItem('id') 

//   fetch('http://localhost:8080/api/v1/profil/profilbild/' + valueId, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${valueToken}`,
//     },
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     setImage({value: data.imagedata, error: ''})
//     return
//   })
//   .catch(error => console.error('Fehler:', error));    
//     };
//     fetchData();
//   })

    return (
        // <Avatar.Icon size={180} icon="account"/>
        <View style={imageUploaderStyles.container}>
        {
            image  && <Image source={{ uri: image }} style={{ width: 180, height: 180 }} />
        }
        </View>
    )
  }

  const imageUploaderStyles=StyleSheet.create({
    container:{
        height:180,
        width:180,
        borderWidth: 1,
        borderColor: 'gray',
        position:'relative',
        borderRadius: 999,
        overflow:'hidden',
    }
})