import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'

/**
 * Indexiert alle Komponeten für PartnerMarketplaceComponents
 * @namespace PartnerMarketplaceComponents
 */

/**
 * @method AngebotPartnerView
 * @memberof PartnerMarketplaceComponents
 * @async
 * @description AngebotPartnerView für die PartnerMarketplaceComponents, ist die Card Komponente wo alle Angeboten angezeigt werden
 */

export default function AngebotPartnerView ({
  id,
  image,
  kurstitel,
  alterVon,
  alterBis,
  kindervon,
  kinderBis,
  wochentag,
  dauer,
  kosten,
  onDelete,
  navigation
}) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onDeletePress = () => {
    setIsModalVisible(false)
    onDelete(id)
  }

  const onEditPress = async () => {
    await AsyncStorage.setItem('offerId', id.toString())
    navigation.navigate('EditAngebotScreen')
  }

  return (
    <View>
      <Card>
        <Card.Content>
          <Text variant='titleLarge'>{kurstitel}</Text>
          <Text variant='bodyMedium'>
            Altersgruppe: {alterVon} - {alterBis} Jahre
          </Text>
          <Text variant='bodyMedium'>
            Gruppengröße: {kindervon} - {kinderBis} Kinder
          </Text>
          <Text variant='bodyMedium'>Wochentag: {wochentag.join(', ')}</Text>
          <Text variant='bodyMedium'>Dauer: {dauer} Minuten</Text>
          <Text variant='bodyMedium'>Kosten: {kosten} €</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode='contained'
            buttonColor='red'
            onPress={() => setIsModalVisible(true)}
          >
            Löschen
          </Button>
          <Button onPress={onEditPress}>Bearbeiten</Button>
        </Card.Actions>
      </Card>
      <Modal visible={isModalVisible} transparent={true} animationType='slide'>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Wollen Sie das Angebot endgültig löschen?</Text>
            <View style={{ height: 10 }} />
            <Button
              mode='outlined'
              icon={'check'}
              onPress={() => onDeletePress()}
            >
              Ja
            </Button>
            <View style={{ height: 10 }} />
            <Button
              mode='outlined'
              icon={'close'}
              onPress={() => setIsModalVisible(false)}
            >
              Nein
            </Button>
          </View>
        </View>
      </Modal>
      {/* Abstandhalter */}
      <View style={{ height: 10 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5
  }
})
