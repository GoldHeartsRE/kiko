import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Dimensions, Modal, ScrollView, StyleSheet, View } from 'react-native'
import { Drawer } from 'react-native-drawer-layout'
import { Button, Card, Text } from 'react-native-paper'
import ParagraphTitel from '../../components/KitaMarktplaceComponents/ParagraphTitel'
import DrawerKita from '../../components/MainComponents/DrawerKita'
import Header from '../../components/MainComponents/Header'
import ProfilePicture from '../../components/MainComponents/ProfilePicture'
import { IP } from '../../constants/constants'

/**
 * @memberof MarktplatzKitaScreens
 * @class ShowAngeboteScreen
 * @description Genaueres Inspinzieren eines Angebots
 */

export default function ShowAngeboteScreen ({ navigation }) {
  const screenWidth = Dimensions.get('window').width * 0.95
  const [open, setOpen] = React.useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [angebote, setAngebote] = useState([])
  const [partner, setPartner] = useState([])
  const [wochentags, setWochentags] = useState([])

  /**
   * @method fetchData
   * @memberof MarktplatzKitaScreens.ShowAngeboteScreen
   * @async
   * @description Async Methode welche die Werte des Angebots abspeichert um sie dann anzuzeigen, außerdem führt sie anschließend
   * noch ein Request auf den Partner aus, um zum Angebot auch den dazugehörigen Partner zu bekommen
   */
  useEffect(() => {
    const fetchData = async () => {
      var valueToken = await AsyncStorage.getItem('token')
      const angebotId = parseInt(await AsyncStorage.getItem('angebotId'), 10)

      fetch('http://' + IP + ':8080/api/v1/angebot/' + angebotId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${valueToken}`
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json()
          }
        })
        .then(data => {
          if (data && Object.keys(data).length > 0) {
            console.log(data)
            setAngebote(data)
            setWochentags(data.wochentag)

            const partnerId = data.partnerID
            if (partnerId) {
              fetch(
                'http://' + IP + ':8080/api/v1/profil/partner/' + partnerId,
                {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${valueToken}`
                  }
                }
              )
                .then(partnerResponse => {
                  if (partnerResponse.ok) {
                    return partnerResponse.json()
                  }
                })
                .then(partnerData => {
                  console.log(partnerData)
                  if (
                    partnerData &&
                    partnerData.vorname &&
                    partnerData.nachname
                  ) {
                    setPartner(partnerData)
                  } else {
                    console.log('Ungültige Partnerdaten erhalten')
                  }
                })
            } else {
              console.log('PartnerID nicht da')
            }
          } else {
            console.log('Die Antwort ist leer.')
          }
        })
        .catch(error => console.error('Fehler:', error))
    }
    setTimeout(() => {
      fetchData()
    }, 100)
  }, [])

  /**
   * @method onRequestOffer
   * @memberof MarktplatzKitaScreens.ShowAngeboteScreen
   * @async
   * @description Async Methode, welche den Verifikationsstatus checkt
   */

  const onRequestOffer = async () => {
    var valueToken = await AsyncStorage.getItem('token')
    var valueId = parseInt(await AsyncStorage.getItem('id'), 10)

    fetch(
      'http://' + IP + ':8080/api/v1/profil/verifikationsstatus/' + valueId,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${valueToken}`
        }
      }
    )
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          if (data.verified == true) {
            console.log('Kita-Verifikationsstatus: ', data.verified)
            requestOffer()
          } else {
            console.log(
              'Kita kann nur anfragen wenn verifiziert: ',
              data.verified
            )
            setIsModalVisible(true)
          }
        } else {
          console.log('Die Antwort ist leer.')
        }
      })
      .catch(error => console.error('Fehler:', error))
  }

  /**
   * @method requestOffer
   * @memberof MarktplatzKitaScreens.ShowAngeboteScreen
   * @async
   * @description Async Methode, welche die Anfrage von der KITA zum Partner schickt
   */

  const requestOffer = async () => {
    var valueToken = await AsyncStorage.getItem('token')
    const userid = parseInt(await AsyncStorage.getItem('id'), 10)
    const angebotId = parseInt(await AsyncStorage.getItem('angebotId'), 10)

    fetch(
      'http://' + IP + `:8080/api/v1/anfrage/create/${userid}/${angebotId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${valueToken}`
        },
        body: JSON.stringify({})
      }
    )
      .then(data => {
        navigation.navigate('SearchAngeboteScreen')
        return
      })
      .catch(error => console.error('Fehler:', error))
  }

  return (
    <Drawer
      style={styles.background}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <DrawerKita></DrawerKita>
      }}
    >
      <Header
        items='Angebote'
        icon='menu'
        onPress={() => setOpen(prevOpen => !prevOpen)}
      ></Header>
      <View
        style={{
          flex: 1,
          width: screenWidth,
          zIndex: -100,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={{ marginTop: '25%', marginLeft: '5%' }}>
            <ProfilePicture></ProfilePicture>
          </View>
          {partner && (
            <View style={{ marginTop: '-15%' }}>
              <Text style={styles.profile}>
                {partner.vorname} {partner.nachname}
              </Text>
              <Text style={styles.profile}>{partner.organisation}</Text>
            </View>
          )}
          <ParagraphTitel>{angebote.kurstitel}</ParagraphTitel>
          <Card style={styles.cards}>
            <Card.Content>
              <Text variant='titleLarge'>Kursbeschreibung:</Text>
              <Text variant='bodyMedium'>{angebote.kursbeschreibung}</Text>
            </Card.Content>
          </Card>
          <Card style={styles.cards}>
            <Card.Content>
              <Text variant='titleLarge'>Infos:</Text>
              <Text variant='bodyMedium'>
                Altersgruppe: {angebote.altersgruppe_min} -{' '}
                {angebote.altersgruppe_max} Jahre
              </Text>
              <Text variant='bodyMedium'>
                Gruppengröße: {angebote.anzahlKinder_min} -{' '}
                {angebote.anzahlKinder_max} Kinder
              </Text>
              <Text variant='bodyMedium'>
                Wochentag: {wochentags.join(', ')}
              </Text>
              <Text variant='bodyMedium'>
                Regelmäßigkeit: {angebote.regelmaessigkeit}
              </Text>
              <Text variant='bodyMedium'>Dauer: {angebote.dauer} Minuten</Text>
              <Text variant='bodyMedium'>Kosten: {angebote.kosten}</Text>
            </Card.Content>
          </Card>
          <View style={{ height: 10 }} />
          <Button mode='contained' onPress={onRequestOffer}>
            Angebot anfragen
          </Button>
          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType='slide'
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text>
                  Sie können Angebote erst anfragen sobald Sie verifiziert sind.
                </Text>
                <View style={{ height: 10 }} />
                <Button
                  mode='outlined'
                  onPress={() => setIsModalVisible(false)}
                >
                  OK
                </Button>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </Drawer>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexDirection: 'column'
  },
  profileName: {
    marginLeft: '40%',
    bottom: 80,
    fontSize: 20,
    lineHeight: 35
  },
  profile: {
    marginLeft: '40%',
    bottom: 40,
    fontSize: 20,
    lineHeight: 35
  },
  cards: {
    marginTop: 10
  },
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
  },
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f8f4ec'
  }
})
