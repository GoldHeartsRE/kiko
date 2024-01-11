import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Text, TouchableRipple } from 'react-native-paper'

/**
 * Indexiert alle Komponeten für KitaMarketplaceComponents
 * @namespace KitaMarketplaceComponents
 */

/**
 * @method AngebotKitaView
 * @memberof KitaMarketplaceComponents
 * @async
 * @description AngebotKitaView für die KitaMarketplaceComponents, ist die Card Komponente wo im SearchAngeboteScreen gezeigt wird
 */

export default function AngebotKitaView ({
  id,
  image,
  kurstitel,
  alterVon,
  alterBis,
  kindervon,
  kinderBis,
  wochentag,
  dauer,
  kosten
}) {
  const navigation = useNavigation()

  /**
   * @method onSelect
   * @memberof KitaMarketplaceComponents.AngebotKitaView
   * @description Methode, welche beim auswählen des Angebots es zu einer Angebotsdetailscreen weiterleitet
   */

  const onSelect = () => {
    console.log(id)
    AsyncStorage.setItem('angebotId', id.toString())
    navigation.navigate('ShowAngeboteScreen')
  }

  return (
    <View>
      <TouchableRipple onPress={onSelect}>
        <Card>
          <Card.Content>
            <Text variant='titleLarge'>{kurstitel}</Text>
            <Text variant='bodyMedium'>
              Altersgruppe: {alterVon} - {alterBis} Jahren
            </Text>
            <Text variant='bodyMedium'>
              Gruppengröße: {kindervon} - {kinderBis} Kinder
            </Text>
            <Text variant='bodyMedium'>Wochentag: {wochentag.join(', ')}</Text>
            <Text variant='bodyMedium'>Dauer: {dauer} Minuten </Text>
            <Text variant='bodyMedium'>Kosten: {kosten} €</Text>
          </Card.Content>
        </Card>
      </TouchableRipple>
      {/* Abstandhalter */}
      <View style={{ height: 10 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  cards: {
    marginTop: 20,
    marginLeft: '60%',
    marginRight: 'auto'
  }
})
