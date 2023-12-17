import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Paragraph, Text, Card, TouchableRipple, Button, Avatar } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IP } from '../../constants/constants'

export default function AngebotPartnerView({ id, image, kurstitel, alterVon, alterBis, kindervon, kinderBis, wochentag, dauer, kosten, navigation }) {

    const onDeletePress = async() => {   
      var valueToken = await AsyncStorage.getItem('token')
      console.log(valueToken);
      console.log(`Bearer ${valueToken}`);

      fetch('http://'+ IP +':8080/api/v1/angebot/delete/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${valueToken}`,
        },
      })
      .catch(error => console.error('Fehler:', error));
      };   

    const onEditPress = async () => {
        await AsyncStorage.setItem('offerId', id);
        navigation.navigate('EditAngebotScreen');
      };  

  return (
    <View>
        <Card>
            <Card.Content>
                <Text variant="titleLarge">{kurstitel}</Text>
                <Text variant="bodyMedium">Altersgruppe: {alterVon} - {alterBis} Jahre</Text>
                <Text variant="bodyMedium">Gruppengröße: {kindervon} - {kinderBis} Kinder</Text>
                <Text variant="bodyMedium">Wochentag: {wochentag}</Text>
                <Text variant="bodyMedium">Dauer: {dauer} Minuten</Text>
                <Text variant="bodyMedium">Kosten: {kosten} €</Text>
            </Card.Content>
            <Card.Actions>
                <Button mode='contained' buttonColor='red' onPress={onDeletePress}>Löschen</Button>
                <Button onPress={onEditPress}>Bearbeiten</Button>            
            </Card.Actions>
        </Card>
        {/* Abstandhalter */}
        <View style={{ height:10}}/>
    </View>
  )
}