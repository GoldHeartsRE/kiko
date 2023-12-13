import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Paragraph, Text, Card, TouchableRipple, Button, Avatar } from 'react-native-paper'
import ProfilePicture from '../../components/MainComponents/ProfilePicture'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function AngebotPartnerView({ id, image, kurstitel, alterVon, alterBis, kindervon, kinderBis, wochentag, dauer, kosten, navigation }) {

    const onDeletePress = async() => {      
      // fetch('http://localhost:8080/api/v1/angebot/' + id, {
      //   method: 'GET',
      //   headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${valueToken}`,
      //   },
      // })
      // .catch(error => console.error('Fehler:', error));
      // }
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
                <Text variant="bodyMedium">Altersgruppe: {alterVon} - {alterBis}</Text>
                <Text variant="bodyMedium">Gruppengröße: {kindervon} - {kinderBis}</Text>
                <Text variant="bodyMedium">Wochentag: {wochentag}</Text>
                <Text variant="bodyMedium">Dauer: {dauer}</Text>
                <Text variant="bodyMedium">Kosten: {kosten}</Text>
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