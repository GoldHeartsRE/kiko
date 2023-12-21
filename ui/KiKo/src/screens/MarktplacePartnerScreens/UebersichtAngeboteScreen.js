import React, { useState, Modal, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Background from '../../components/MainComponents/Background'
import Header from '../../components/MainComponents/Header'
import AngebotPartnerView from '../../components/PartnerMarktplaceComponents/AngebotPartnerView'
import { Drawer } from 'react-native-drawer-layout';
import DrawerPartner from '../../components/MainComponents/DrawerPartner'
import { View, Dimensions, StyleSheet, FlatList } from 'react-native'
import BackButton from '../../components/MainComponents/BackButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IP } from '../../constants/constants'

  /**
   * @memberof MarktplatzPartnerScreens
   * @class UebersichtAngeboteScreen
   * @description Gibt einen Überblick ein bestimmtes Angebote
   */

export default function UebersichtAngeboteScreen({ navigation }) {
    const screenWidth = Dimensions.get('window').width * 0.95;
    const [open, setOpen] = React.useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [angebote, setAngebote] = useState([]);

  /**
   * @method fetchData
   * @memberof MarktplatzPartnerScreens.UebersichtAngeboteScreen
   * @async
   * @description Async Methode welches das geklickte Angebot mithilfe eines GET-Requests abholt
   */
    const fetchData = async () => {
      setAngebote([])
      var valueToken = await AsyncStorage.getItem('token') 
      const valueId = parseInt(await AsyncStorage.getItem('id'), 10); 
      console.log(valueToken);
      console.log(`Bearer ${valueToken}`);
  
      await fetch('http://'+ IP +':8080/api/v1/angebot/partnerget/'+ valueId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${valueToken}`,
        },
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          console.log(data);
          setAngebote(data);
        } else {
          console.log('Die Antwort ist leer.');
          // Behandlung für eine leere Antwort, falls erforderlich
        }
      })
      .catch(error => console.error('Fehler:', error));
      // .then(response => response.json())
      // .then(data => {
      //   setAngebote(data);
      // })
      // .catch(error => console.error('Fehler:', error));
    }

    useFocusEffect(
      useCallback(() => {
        setTimeout(function() {
          fetchData()
        }, 500);
      }, [navigation])
    );

    const handleDelete = async (id) => {
      try {
        const valueToken = await AsyncStorage.getItem('token');
  
        const response = await fetch(
          `http://${IP}:8080/api/v1/angebot/delete/${id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${valueToken}`,
            },
          }
        )
        if (response.ok) {
          console.log('Erfolgreich gelöscht:', response.status);
          setTimeout(function() {
            fetchData()
          }, 1000);
        } else {
          console.error('Fehler beim Löschen:', response.status);
        }
      } catch (error) {
        console.error('Fehler:', error);
      }
    };

    const handleRefresh = async () => {
      setIsRefreshing(true);
      await fetchData();
      setIsRefreshing(false);
    };

    const sortWochentage = (a, b) => {
      const order = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
      return order.indexOf(a) - order.indexOf(b);
    };

      /**
   * @method renderItem
   * @memberof MarktplatzPartnerScreens.UebersichtAngeboteScreen
   * @param item
   * @description Methode, um die Werte aus fetchData in AngebotPartnerView zu speichern und diese mithilfe
   * einer Flatliste zu rendern.
   */
    const renderItem = ({ item }) => (
        <AngebotPartnerView id={item.id}
                            kurstitel={item.kurstitel}
                            alterVon={item.altersgruppe_min} 
                            alterBis={item.altersgruppe_max}
                            kindervon={item.anzahlKinder_min}
                            kinderBis={item.anzahlKinder_max} 
                            wochentag={item.wochentag.sort(sortWochentage)}
                            dauer={item.dauer}
                            kosten={item.kosten}
                            onDelete={() => {
                              handleDelete(item.id)
                            }}
                            navigation={navigation}
                            />
      );

    return (
      <Drawer style={styles.background}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <DrawerPartner></DrawerPartner>
        ;
      }}
    > 
            <Header items="Angebote"  icon="menu" onPress={() => setOpen((prevOpen) => !prevOpen)}></Header>
            <View style={{ flex: 1, width: screenWidth }}>
                    {/* Abstandhalter für den Header */} 
                   <View style={{ height:100}}>
                      <BackButton goBack={navigation.goBack} />
                    </View>
                    <View>               
                        <FlatList
                            data={angebote}
                            keyExtractor={(item) => item.id.toString()}
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
      flexDirection: 'column',
    },
  });
