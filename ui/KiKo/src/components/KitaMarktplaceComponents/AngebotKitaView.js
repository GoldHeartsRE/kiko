import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Paragraph, Text, Card, TouchableRipple } from 'react-native-paper'
import ProfilePicture from '../../components/MainComponents/ProfilePicture'

export default function AngebotKitaView({ id, image, kurstitel, alterVon, alterBis, kindervon, kinderBis, wochentag, dauer, kosten}) {

    const handlePress = () => {
        // zu Angebot gehen
      };   

  return (
    <TouchableRipple onPress={handlePress}>
        <Card>
            <Card.Content>
                <Text variant="titleLarge">{kurstitel}</Text>
                <Text variant="bodyMedium">Altersgruppe: {alterVon} - {alterBis}</Text>
                <Text variant="bodyMedium">Gruppengröße: {kindervon} - {kinderBis}</Text>
                <Text variant="bodyMedium">Wochentag: {wochentag}</Text>
                <Text variant="bodyMedium">Dauer: {dauer}</Text>
                <Text variant="bodyMedium">Kosten: {kosten}</Text>
            </Card.Content>
            {/* <Card.Actions>
                {/* hier BUtton um anzuzeigen falls wir die Card nicht touchable machen können */}
            {/* </Card.Actions> */}
        </Card>
    </TouchableRipple>
  )
}
