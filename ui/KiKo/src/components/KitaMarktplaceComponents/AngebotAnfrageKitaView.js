import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Paragraph, Text, Card, Button, Divider, IconButton, Chip } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';

export default function AngebotAnfrageKitaView({ offerId, status, createDate, updateDate, onDelete }) {

    const navigation = useNavigation();
    const [chipColor, setChipColor] = useState();
    const [chipIcon, setChipIcon] = useState('');
    const [statusText, setStatusText] = useState('');
    const [buttonVisible, setButtonVisible] = useState(false);
    const [angebote, setAngebote] = useState([]);
    const [wochentags, setWochentags] = useState([]);

    // Brauchen wir wenn man durch einen Klick zum Angebot kommen soll.
    // const onSelect = () => {
    //     console.log(id);
    //     AsyncStorage.setItem('anfrageId', id.toString());
    //     navigation.navigate('ShowAngeboteScreen')
    //   };
    
    // Get Angebot mit offerid
    useEffect(async () => {
      var valueToken = await AsyncStorage.getItem('token') 
      const angebotId = parseInt(offerId, 10); 
  
      fetch('http://'+ IP +':8080/api/v1/angebot/' + angebotId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${valueToken}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setAngebote(data);
        setWochentags(data.wochentag)
        setStatus(status)
      })
      .catch(error => console.error('Fehler:', error));
    },[])

    // Case Label setzten und Button
    const setStatus = (status) => {
        switch (status){
            case 'wartend':
                setButtonVisible(true)
                setChipColor('blue')
                setChipIcon('clock-outline')
                setStatusText('wartend')
                break;
            case 'angenommen':
                setButtonVisible(false)
                setChipColor('green')
                setChipIcon('check')
                setStatusText('angenommen')
                break;
            case 'abgelehnt':
                setButtonVisible(false)
                setChipColor('red')
                setChipIcon('cancel')
                setStatusText('abgelehnt')
                break;
            case 'beendet':
                setButtonVisible(false)
                setChipColor('grey')
                setChipIcon('clock-remove-outline')
                setStatusText('beendet')
                break;
        }
    }

return (
    <View>
            <Card>
                <Card.Title
                    title={kurstitel}
                    right={(props) => <Chip mode='outlined' selectedColor={chipColor} icon={chipIcon}>{statusText}</Chip>}
                />
                <Card.Content>
                    {/* <Text variant="titleLarge">{kurstitel}</Text> */}
                    <Text variant="bodyMedium">Altersgruppe: {angebote.alterVon} - {angebote.alterBis}</Text>
                    <Text variant="bodyMedium">Gruppengröße: {angebote.kindervon} - {angebote.kinderBis}</Text>
                    <Text variant="bodyMedium">Wochentag: {wochentags.join(', ')}</Text>
                    <Text variant="bodyMedium">Dauer: {angebote.dauer}</Text>
                    <Text variant="bodyMedium">Kosten: {angebote.kosten}</Text>
                    <Divider/>
                    <Text variant="bodyMedium">Angefragt am: {createDate}</Text>
                    <Text variant="bodyMedium">Status geändert am: {updateDate}</Text>
                </Card.Content>
                {buttonVisible && (
                    <Card.Actions>
                        <Button mode='contained' buttonColor='red' onPress={onDelete}>Zurücknehmen</Button>          
                    </Card.Actions>
                )}
            </Card>
        {/* Abstandhalter */}
        <View style={{ height:10}}/>
    </View>
  )
}

const styles = StyleSheet.create({
    cards: {
        marginTop: 20
    }
  });
