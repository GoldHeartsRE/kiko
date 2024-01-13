import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import { Drawer } from 'react-native-drawer-layout'
import { IconButton, List, Portal, Modal as RNModal } from 'react-native-paper'
import AngebotAnfrageKitaView from '../../components/KitaMarktplaceComponents/AngebotAnfrageKitaView'
import DrawerKita from '../../components/MainComponents/DrawerKita'
import Header from '../../components/MainComponents/Header'
import { IP } from '../../constants/constants'

/**
 * @memberof MarktplatzKitaScreens
 * @class UebersichtKitaAnfragenAngebote
 * @description Screen für die Übersicht der Anfragenstatus
 */

export default function UebersichtKitaAnfragenAngebote ({ navigation }) {
  //Getter und Setter für Extensions und Komponenten
  const screenWidth = Dimensions.get('window').width * 0.95
  const [open, setOpen] = React.useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')

  //Getter und Setter für Requests
  const [requests, setRequests] = useState([])

  /**
   * @method fetchData
   * @memberof MarktplatzKitaScreens.UebersichtKitaAnfragenAngebote
   * @async
   * @description Async Methode, um alle aktuelle Anfrangen zu bekommen
   */

  const fetchData = async () => {
    setRequests([])
    var valueToken = await AsyncStorage.getItem('token')
    const valueId = parseInt(await AsyncStorage.getItem('id'), 10)
    console.log(valueToken)
    console.log(`Bearer ${valueToken}`)

    await fetch(
      'http://' + IP + `:8080/api/v1/anfrage/getfromkita/${valueId}`,
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
          console.log('TEST', data)
          setRequests(filterRequests(data, selectedFilter))
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

  useEffect(() => {
    fetchData()
  }, [selectedFilter])

  /**
   * @method handleDelete
   * @memberof MarktplatzKitaScreens.UebersichtKitaAnfragenAngebote
   * @async
   * @description Async Methode, um eine aktuelle Anfrangen zu löschen
   */

  const handleDelete = async id => {
    const valueToken = await AsyncStorage.getItem('token')

    const response = await fetch(
      `http://${IP}:8080/api/v1/anfrage/delete/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${valueToken}`
        }
      }
    )
    if (response.ok) {
      console.log('Erfolgreich gelöscht:', response.status)
      setTimeout(function () {
        fetchData()
      }, 500)
    } else {
      console.error('Fehler beim Löschen:', response.status)
    }
  }

  /**
   * @method handleDelete
   * @memberof MarktplatzKitaScreens.UebersichtKitaAnfragenAngebote
   * @async
   * @description Async Methode, um eine aktuelle Anfrangen zu beenden
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
   * @memberof MarktplatzKitaScreens.UebersichtKitaAnfragenAngebote
   * @async
   * @description Async Methode, um den Seiten Refresh zu handeln
   */

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchData()
    setIsRefreshing(false)
  }

  /**
   * @method filterRequests
   * @memberof MarktplatzKitaScreens.UebersichtKitaAnfragenAngebote
   * @param data Ist die gefilterte Data, welche zurückgegeben wird.
   * @param filter Filter prüft den Status des aktuell eingestellten Filters
   * @description Methode, um den Request zu filtern
   */

  const filterRequests = (data, filter) => {
    if (filter === 'all') {
      return data
    }
    return data.filter(item => item.status === filter)
  }

  /**
   * @method openFilterModal
   * @memberof MarktplatzKitaScreens.UebersichtKitaAnfragenAngebote
   * @description Methode, um den dem Modal zu öffnen
   */

  const openFilterModal = () => {
    setIsFilterModalVisible(true)
  }

  /**
   * @method openFilterModal
   * @memberof MarktplatzKitaScreens.UebersichtKitaAnfragenAngebote
   * @description Methode, um den dem Modal zu schließen
   */

  const closeFilterModal = () => {
    setIsFilterModalVisible(false)
  }

  const handleFilterOptionSelect = filter => {
    setSelectedFilter(filter)
    closeFilterModal()
  }

  /**
   * @method openFilterModal
   * @memberof MarktplatzKitaScreens.UebersichtKitaAnfragenAngebote
   * @description Methode, um den Inhalt des Modals, den Filter, zu aufzubauen
   */

  const renderFilterModal = () => (
    <RNModal
      visible={isFilterModalVisible}
      onDismiss={closeFilterModal}
      contentContainerStyle={styles.modalContent}
    >
      <List.Item
        title='Alle Anfragen'
        onPress={() => handleFilterOptionSelect('all')}
        right={() => (
          <List.Icon icon={selectedFilter === 'all' ? 'check' : 'cancel'} />
        )}
      />
      <List.Item
        title='Wartende Anfragen'
        onPress={() => handleFilterOptionSelect('wartend')}
        right={() => (
          <List.Icon icon={selectedFilter === 'wartend' ? 'check' : 'cancel'} />
        )}
      />
      <List.Item
        title='Angenommene Anfragen'
        onPress={() => handleFilterOptionSelect('angenommen')}
        right={() => (
          <List.Icon
            icon={selectedFilter === 'angenommen' ? 'check' : 'cancel'}
          />
        )}
      />
      <List.Item
        title='Abgelehnte Anfragen'
        onPress={() => handleFilterOptionSelect('abgelehnt')}
        right={() => (
          <List.Icon
            icon={selectedFilter === 'abgelehnt' ? 'check' : 'cancel'}
          />
        )}
      />
      <List.Item
        title='Beendete Anfragen'
        onPress={() => handleFilterOptionSelect('beendet')}
        right={() => (
          <List.Icon icon={selectedFilter === 'beendet' ? 'check' : 'cancel'} />
        )}
      />
    </RNModal>
  )

  /**
   * @method renderItem
   * @memberof MarktplatzKitaScreens.UebersichtKitaAnfragenAngebote
   * @description Methode, um die Werte aus fetchData in AngebotAnfrageKitaView zu speichern und diese mithilfe
   * einer Flatliste zu rendern.
   */

  const renderItem = ({ item }) => (
    <AngebotAnfrageKitaView
      requestId={item.anfrageId}
      offerId={item.angebotId}
      partnerId={item.partnerId}
      status={item.status}
      createDate={item.erstelltAm}
      updateDate={item.geaendertAm}
      onDelete={() => {
        handleDelete(item.anfrageId)
      }}
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
        return <DrawerKita></DrawerKita>
      }}
    >
      <Header
        items='Eigene Anfragen'
        icon='menu'
        onPress={() => setOpen(prevOpen => !prevOpen)}
      ></Header>
      <View
        style={{
          flex: 1,
          width: screenWidth,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        {/* Abstandhalter für den Header */}
        <View style={{ height: 70 }} />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            {/* <IconButton icon='arrow-left-bold' onPress={() => navigation.goBack} /> */}
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <IconButton icon='filter' onPress={openFilterModal} />
          </View>
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
      <View style={{ height: 155 }} />
      <Portal>{renderFilterModal()}</Portal>
    </Drawer>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexDirection: 'column'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20
  },
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f8f4ec'
  }
})
