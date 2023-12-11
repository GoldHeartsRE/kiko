import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Paragraph, Text, Card } from 'react-native-paper'

export default function AngebotKitaView({ image, kurstitel, alterVon, alterBis, kindervon, kinderBis, wochentag, dauer, kosten}) {
  return (
    <View>
        {/* Profilbild hier */}
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
                {/* hier BUtton um anzuzeigen falls wir die Card nicht touchable machen können */}
            </Card.Actions>
        </Card>
    </View>
  )
}
