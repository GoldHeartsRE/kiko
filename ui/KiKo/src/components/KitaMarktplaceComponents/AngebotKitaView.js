import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Paragraph, Text, Card, TouchableRipple, Avatar } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function AngebotKitaView({ id, image, kurstitel, alterVon, alterBis, kindervon, kinderBis, wochentag, dauer, kosten, navigation}) {

    const onSelect = () => {
        // zu Angebot gehen
        // navigieren zum Angebot und ID in Async speichern
      };   

  return (
    <View>
        <Avatar.Icon size={50} icon="account" />
        <TouchableRipple onPress={onSelect}>
            <Card>
                <Card.Content>
                    <Text variant="titleLarge">{kurstitel}</Text>
                    <Text variant="bodyMedium">Altersgruppe: {alterVon} - {alterBis}</Text>
                    <Text variant="bodyMedium">Gruppengröße: {kindervon} - {kinderBis}</Text>
                    <Text variant="bodyMedium">Wochentag: {wochentag}</Text>
                    <Text variant="bodyMedium">Dauer: {dauer}</Text>
                    <Text variant="bodyMedium">Kosten: {kosten}</Text>
                </Card.Content>
            </Card>
        </TouchableRipple> 
        {/* Abstandhalter */}
        <View style={{ height:10}}/>
    </View>
  )
}
