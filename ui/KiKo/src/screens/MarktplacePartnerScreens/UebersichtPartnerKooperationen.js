import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import { Drawer } from 'react-native-drawer-layout'
import DrawerPartner from '../../components/MainComponents/DrawerPartner'
import Header from '../../components/MainComponents/Header'
import AngebotAnfragePartnerView from '../../components/PartnerMarktplaceComponents/AngebotAnfragePartnerView'
import { IP } from '../../constants/constants'

/**
 * @memberof MarktplatzPartnerScreens
 * @class UebersichtPartnerKooperationen
 * @description Gibt einen Überblick über alle aktuellen Kooperationen
 */

export default function UebersichtPartnerKooperationen ({ navigation }) {
  //Getter und Setter für Extensions und Komponenten
  const screenWidth = Dimensions.get('window').width * 0.95
  const [open, setOpen] = React.useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  //Getter und Setter für Requests
  const [requests, setRequests] = useState([])

  /**
   * @method fetchData
   * @memberof MarktplatzPartnerScreens.UebersichtPartnerKooperationen
   * @async
   * @description Async Methode welches alle Kooperationen und ihrem Status mithilfe eines GET-Requests abholt
   */
  const fetchData = async () => {
    setRequests([])
    var valueToken = await AsyncStorage.getItem('token')
    const valueId = parseInt(await AsyncStorage.getItem('id'), 10)
    console.log(valueToken)
    console.log(`Bearer ${valueToken}`)

    await fetch(
      'http://' + IP + `:8080/api/v1/anfrage/getfrompartner/${valueId}`,
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
          console.log(data)
          setRequests(filterRequests(data))
        } else {
          console.log('Die Antwort ist leer.')
        }
      })
      .catch(error => console.error('Fehler:', error))
  }

  useFocusEffect(
    useCallback(() => {
      setTimeout(function () {
        fetchData()
      }, 500)
    }, [navigation])
  )

  /**
   * @method handleEnd
   * @memberof MarktplatzPartnerScreens.UebersichtPartnerKooperationen
   * @async
   * @description Async Methode welches das Beenden einer Kooperation anzeigen lässt
   */
  const handleEnd = async id => {
    const valueToken = await AsyncStorage.getItem('token')

    const response = await fetch(`http://${IP}:8080/api/v1/anfrage/end/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${valueToken}`
      },
      body: JSON.stringify({})
    })
    if (response.ok) {
      console.log('Anfrage erfolgreich beendet:', response.status)
      setTimeout(function () {
        fetchData()
      }, 500)
    } else {
      console.error('Fehler beim Beenden der Anfrage:', response.status)
    }
  }

  /**
   * @method handleRefresh
   * @memberof MarktplatzPartnerScreens.UebersichtPartnerKooperationen
   * @async
   * @description Kontrolliert das Refreshen der Stati der Kooperationen
   */
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchData()
    setIsRefreshing(false)
  }
 
  /**
   * @method filterRequests
   * @memberof MarktplatzPartnerScreens.UebersichtPartnerKooperationen
   * @async
   * @description Ermöglicht das Filtern der Kooperationen
   */
  const filterRequests = data => {
    return data.filter(item => item.status === 'angenommen')
  }

  /**
   * @method renderItem
   * @memberof MarktplatzPartnerScreens.UebersichtPartnerKooperationen
   * @async
   * @description Methode, um die Werte aus fetchData in AngebotAnfragePartnerView zu speichern und diese mithilfe
   * einer Flatliste zu rendern.
   */
  const renderItem = ({ item }) => (
    <AngebotAnfragePartnerView
      requestId={item.anfrageId}
      offerId={item.angebotId}
      kitaId={item.kitaId}
      status={item.status}
      createDate={item.erstelltAm}
      updateDate={item.geaendertAm}
      onEnd={() => {
        handleEnd(item.anfrageId)
      }}
      navigation={navigation}
    />
  )

  return (
    <Drawer
      style={styles.background}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <DrawerPartner></DrawerPartner>
      }}
    >
      <Header
        items='Kooperationen'
        icon='menu'
        onPress={() => setOpen(prevOpen => !prevOpen)}
      ></Header>
      <View
        style={{
          flex: 1,
          width: screenWidth,
          marginRight: 'auto',
          marginLeft: 'auto'
        }}
      >
        {/* Abstandhalter für den Header */}
        <View style={{ height: 100 }} />
        <View>
          {/* <IconButton icon='arrow-left-bold' onPress={() => navigation.goBack} /> */}
        </View>
        <View>
          <FlatList
            data={requests}
            keyExtractor={item => item.anfrageId.toString()}
            renderItem={renderItem}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        </View>
      </View>
      <View style={{ height: 100 }} />
    </Drawer>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f8f4ec'
  }
})
