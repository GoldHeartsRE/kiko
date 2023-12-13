import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Paragraph, Text, Card, TouchableRipple } from 'react-native-paper'
import ProfilePicture from '../../components/MainComponents/ProfilePicture'

export default function AngebotKitaView({ id, image, kurstitel, altersgruppe_min, altersgruppe_max, anzahlKinder_min, anzahlKinder_max, wochentag, dauer, kosten}) {

    const handlePress = () => {
        navigation.navigate('ShowAngeboteScreen') 
      };   

  return (
    <TouchableRipple onPress={handlePress}>
        <Card style={styles.cards}>
            <Card.Content>
                <Text variant="titleLarge">{kurstitel}</Text>
                <Text variant="bodyMedium">Altersgruppe: {altersgruppe_min} - {altersgruppe_max}</Text>
                <Text variant="bodyMedium">Gruppengröße: {anzahlKinder_min} - {anzahlKinder_max}</Text>
                <Text variant="bodyMedium">Wochentag: {wochentag}s</Text>
                <Text variant="bodyMedium">Dauer: {dauer} Minuten</Text>
                <Text variant="bodyMedium">Kosten: {kosten} €</Text>
            </Card.Content>
        </Card>
    </TouchableRipple>
  )
}

const styles = StyleSheet.create({
    cards: {
        marginTop: 20
    }
  });
