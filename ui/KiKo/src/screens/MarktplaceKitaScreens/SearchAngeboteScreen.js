import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import { Drawer } from 'react-native-drawer-layout'
import Modal from 'react-native-modal'
import { Button, IconButton, SegmentedButtons, Text } from 'react-native-paper'
import TextInput from '../../components/KitaCreationComponents/TextInput'
import AngebotKitaView from '../../components/KitaMarktplaceComponents/AngebotKitaView'
import DrawerKita from '../../components/MainComponents/DrawerKita'
import Header from '../../components/MainComponents/Header'
import { IP } from '../../constants/constants'

/**
 * @memberof MarktplatzKitaScreens
 * @class SearchAngeboteScreen
 * @description Holt sich alle existierenden Angebote und zeigt sie in der App an
 */

export default function SearchAngebote ({ navigation }) {
  const screenWidth = Dimensions.get('window').width * 0.95
  const [open, setOpen] = React.useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isFilterModalVisible, setFilterModalVisible] = useState(false)

  const [angebote, setAngebote] = useState([])
  const [filterOption, setFilterOption] = useState({
    titel: '',
    alterVon: '',
    alterBis: '',
    kinderVon: '',
    kinderBis: '',
    kosten: '',
    dauer: '',
    wochentag: [],
    regel: '',
    felder: []
  })

  /**
   * @method fetchData
   * @memberof MarktplatzKitaScreens.SearchAngeboteScreen
   * @async
   * @description Async Methode welche einen GET-Request ausführt und die Daten in setAngebote abspeichert
   */

  const fetchData = async () => {
    var valueToken = await AsyncStorage.getItem('token')
    console.log(valueToken)
    console.log(`Bearer ${valueToken}`)

    fetch('http://' + IP + ':8080/api/v1/angebot/verified', {
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
        } else {
          console.log('Die Antwort ist leer.')
          // Behandlung für eine leere Antwort, falls erforderlich
        }
      })
      .catch(error => console.error('Fehler:', error))
    // .then(response => response.json())
    // .then(data => {
    //   console.log(data);
    //   setAngebote(data);
    // })
    // .catch(error => console.error('Fehler:', error));
  }

  useFocusEffect(
    useCallback(() => {
      setTimeout(function () {
        clearFilterOptions()
        fetchData()
      }, 500)
    }, [navigation])
  )

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchData()
    setIsRefreshing(false)
  }

  const sortWochentage = (a, b) => {
    const order = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag']
    return order.indexOf(a) - order.indexOf(b)
  }

  const openFilterModal = () => {
    setFilterModalVisible(true)
  }

  const closeFilterModal = () => {
    setFilterModalVisible(false)
  }

  const clearFilterOptions = () => {
    setFilterOption({
      titel: '',
      alterVon: '',
      alterBis: '',
      kinderVon: '',
      kinderBis: '',
      kosten: '',
      dauer: '',
      wochentag: [],
      regel: '',
      felder: []
    })
  }

  const fetchFilterData = async query => {
    var valueToken = await AsyncStorage.getItem('token')
    console.log(valueToken)
    console.log(`Bearer ${valueToken}`)

    fetch('http://' + IP + ':8080/api/v1/angebot/angebote' + query, {
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
        } else {
          console.log('Die Antwort ist leer.')
          setAngebote()
        }
      })
      .catch(error => console.error('Fehler:', error))
  }

  const buildQuery = () => {
    let query = ''

    if (filterOption.titel) {
      query += `?kurstitel=${filterOption.titel}`
    }

    if (filterOption.alterVon) {
      query += `&altersgruppe_min=${filterOption.alterVon.toString()}`
    }

    if (filterOption.alterBis) {
      query += `&altersgruppe_max=${filterOption.alterBis.toString()}`
    }

    if (filterOption.kinderVon) {
      query += `&anzahlKinder_min=${filterOption.kinderVon.toString()}`
    }

    if (filterOption.kinderBis) {
      query += `&anzahlKinder_max=${filterOption.kinderBis.toString()}`
    }

    if (filterOption.felder.length > 0) {
      query += `?bildungsUndEntwicklungsfelder=${filterOption.felder}`
    }

    if (filterOption.kosten) {
      query += `?kosten=${filterOption.kosten.toString()}`
    }

    if (filterOption.regel) {
      query += `?regelmaessigkeit=${filterOption.regel}`
    }

    if (filterOption.wochentag.length > 0) {
      query += `?wochentag=${filterOption.wochentag}`
    }

    if (filterOption.dauer) {
      query += `?dauer=${filterOption.dauer}`
    }

    return query
  }

  const applyFilter = () => {
    console.log(filterOption)
    fetchFilterData(buildQuery())
    closeFilterModal()
  }

  /**
   * @method renderItem
   * @memberof MarktplatzKitaScreens.SearchAngeboteScreen
   * @param item
   * @description Methode, um die Werte aus fetchData in AngebotKitaView zu speichern und diese mithilfe
   * einer Flatliste zu rendern.
   */
  const renderItem = ({ item }) => (
    <AngebotKitaView
      id={item.id}
      kurstitel={item.kurstitel}
      alterVon={item.altersgruppe_min}
      alterBis={item.altersgruppe_max}
      kindervon={item.anzahlKinder_min}
      kinderBis={item.anzahlKinder_max}
      wochentag={item.wochentag.sort(sortWochentage)}
      dauer={item.dauer}
      kosten={item.kosten}
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
        items='Angebote'
        icon='menu'
        onPress={() => setOpen(prevOpen => !prevOpen)}
      />
      <Modal
        isVisible={isFilterModalVisible}
        onBackdropPress={closeFilterModal}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        style={{ zIndex: 1000 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.modalContent}>
            {/* Kurstitel */}
            <View style={{ flex: 1, alignItems: 'center', marginTop: 15 }}>
              <Text variant='labelLarge'>Kurstitel</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <TextInput
                label='Kurstitel'
                returnKeyType='next'
                autoCapitalize='none'
                onChangeText={text =>
                  setFilterOption(prevState => ({ ...prevState, titel: text }))
                }
                value={filterOption.titel}
                autoCompleteType='off'
                textContentType='none'
                keyboardType='default'
              />
            </View>
            {/* Altersgruppe */}
            <View
              style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}
            >
              <View style={{ flex: 0.5, alignItems: 'center' }}>
                <Text variant='labelLarge'>Altersgruppe</Text>
              </View>
              <View style={{ flex: 0, alignItems: 'center' }}>
                <TextInput
                  label='Von'
                  returnKeyType='next'
                  autoCapitalize='none'
                  onChangeText={text =>
                    setFilterOption(prevState => ({
                      ...prevState,
                      alterVon: text
                    }))
                  }
                  value={filterOption.alterVon}
                  autoCompleteType='off'
                  textContentType='none'
                  keyboardType='numeric'
                />
              </View>
              <View style={{ flex: 0.4, alignItems: 'center' }}>
                <Text variant='displayMedium'>-</Text>
              </View>
              <View style={{ flex: 0, alignItems: 'center' }}>
                <TextInput
                  label='Bis'
                  returnKeyType='next'
                  autoCapitalize='none'
                  onChangeText={text =>
                    setFilterOption(prevState => ({
                      ...prevState,
                      alterBis: text
                    }))
                  }
                  value={filterOption.alterBis}
                  autoCompleteType='off'
                  textContentType='none'
                  keyboardType='numeric'
                />
              </View>
            </View>
            {/* Anzahl Kinder */}
            <View
              style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}
            >
              <View style={{ flex: 0.5, alignItems: 'center' }}>
                <Text variant='labelLarge'>Anzahl Kinder</Text>
              </View>
              <View style={{ flex: 0, alignItems: 'center' }}>
                <TextInput
                  label='Von'
                  returnKeyType='next'
                  autoCapitalize='none'
                  onChangeText={text =>
                    setFilterOption(prevState => ({
                      ...prevState,
                      kinderVon: text
                    }))
                  }
                  value={filterOption.kinderVon}
                  autoCompleteType='off'
                  textContentType='none'
                  keyboardType='numeric'
                />
              </View>
              <View style={{ flex: 0.4, alignItems: 'center' }}>
                <Text variant='displayMedium'>-</Text>
              </View>
              <View style={{ flex: 0, alignItems: 'center' }}>
                <TextInput
                  label='Bis'
                  returnKeyType='next'
                  autoCapitalize='none'
                  onChangeText={text =>
                    setFilterOption(prevState => ({
                      ...prevState,
                      kinderBis: text
                    }))
                  }
                  value={filterOption.kinderBis}
                  autoCompleteType='off'
                  textContentType='none'
                  keyboardType='numeric'
                />
              </View>
            </View>
            {/* Dauer */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text variant='labelLarge'>Maximale Dauer</Text>
              </View>
              <SegmentedButtons
                value={filterOption.dauer}
                onValueChange={value =>
                  setFilterOption(prevState => ({ ...prevState, dauer: value }))
                }
                style={{ backgroundColor: 'white', width: screenWidth }}
                buttons={[
                  { value: 30, label: '30' },
                  { value: 45, label: '45' },
                  { value: 60, label: '60' },
                  { value: 90, label: '90' }
                ]}
              />
            </View>
            {/* Wochentage */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text variant='labelLarge'>Wochentag</Text>
              </View>
              <SegmentedButtons
                multiSelect
                value={filterOption.wochentag}
                onValueChange={value =>
                  setFilterOption(prevState => ({
                    ...prevState,
                    wochentag: value
                  }))
                }
                style={{ backgroundColor: 'white' }}
                buttons={[
                  { value: 'Montag', label: 'Montag' },
                  { value: 'Dienstag', label: 'Dienstag' },
                  { value: 'Mittwoch', label: 'Mittwoch' }
                ]}
              />
              <SegmentedButtons
                multiSelect
                value={filterOption.wochentag}
                onValueChange={value =>
                  setFilterOption(prevState => ({
                    ...prevState,
                    wochentag: value
                  }))
                }
                style={{ backgroundColor: 'white' }}
                buttons={[
                  { value: 'Donnerstag', label: 'Donnerstag' },
                  { value: 'Freitag', label: 'Freitag' }
                ]}
              />
            </View>
            {/* Regelmäßigkeit */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text variant='labelLarge'>Regelmäßigkeit</Text>
              </View>
              <SegmentedButtons
                value={filterOption.regel}
                onValueChange={value =>
                  setFilterOption(prevState => ({ ...prevState, regel: value }))
                }
                style={{ backgroundColor: 'white' }}
                buttons={[
                  { value: 'einmalig', label: 'Einmalig' },
                  { value: 'woechentlich', label: 'Wöchentlich' }
                ]}
              />
            </View>
            {/* Kosten  */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text variant='labelLarge'>Kosten</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ flex: 1, alignItems: 'center', width: 110 }}>
                <TextInput
                  label='Kosten in €'
                  returnKeyType='next'
                  autoCapitalize='none'
                  onChangeText={text =>
                    setFilterOption(prevState => ({
                      ...prevState,
                      kosten: text
                    }))
                  }
                  value={filterOption.kosten}
                  autoCompleteType='off'
                  textContentType='none'
                  keyboardType='numeric'
                />
              </View>
            </View>
            {/* Bildungs- und Entwicklungsfelder */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text variant='labelLarge'>
                  Bildungs- und Entwicklungsfelder
                </Text>
              </View>
              <SegmentedButtons
                multiSelect
                value={filterOption.felder}
                onValueChange={value =>
                  setFilterOption(prevState => ({
                    ...prevState,
                    felder: value
                  }))
                }
                style={{ backgroundColor: 'white' }}
                buttons={[
                  { value: 'Koerper', label: 'Körper' },
                  { value: 'Sinne', label: 'Sinne' },
                  { value: 'Sprache', label: 'Sprache' },
                  { value: 'Denken', label: 'Denken' }
                ]}
              />
              <SegmentedButtons
                multiSelect
                value={filterOption.felder}
                onValueChange={value =>
                  setFilterOption(prevState => ({
                    ...prevState,
                    felder: value
                  }))
                }
                style={{ backgroundColor: 'white' }}
                buttons={[
                  {
                    value: 'Gefuehl_und_Mitgefuehl',
                    label: 'Gefühle und Mitgefühl'
                  },
                  {
                    value: ' Sinn_Werte_und_Religion',
                    label: 'Sinne, Werte und Religion'
                  }
                ]}
              />
            </View>
            {/* </View> */}
            <Button
              mode='contained'
              style={styles.button}
              onPress={applyFilter}
            >
              Filter anwenden
            </Button>
            <Button mode='contained' onPress={closeFilterModal}>
              Abbrechen
            </Button>
            <View style={{ height: 10 }} />
          </View>
        </ScrollView>
      </Modal>
      <View style={{ flex: 1, width: screenWidth }}>
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
        <View style={{ flex: 1 }}>
          <FlatList
            data={angebote}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        </View>
      </View>
    </Drawer>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexDirection: 'column'
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f4ec',
    borderRadius: 10
  },
  button: {
    margin: 10
  },
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f8f4ec'
  }
})
