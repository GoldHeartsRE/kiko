import React, { useState, Modal, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Background from '../../components/MainComponents/Background'
import Header from '../../components/MainComponents/Header'
import AngebotAnfrageKitaView from '../../components/KitaMarktplaceComponents/AngebotAnfrageKitaView'
import { Drawer } from 'react-native-drawer-layout';
import DrawerPartner from '../../components/MainComponents/DrawerPartner'
import { View, Dimensions, StyleSheet, FlatList } from 'react-native'
import BackButton from '../../components/MainComponents/BackButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IP } from '../../constants/constants'

export default function UebersichtKitaAnfragenAngebote({ navigation }) {

    const screenWidth = Dimensions.get('window').width * 0.95;
    const [open, setOpen] = React.useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [requests, setRequests] = useState([]);

    const fetchData = async () => {
      setRequests([])
      var valueToken = await AsyncStorage.getItem('token') 
      const valueId = parseInt(await AsyncStorage.getItem('id'), 10); 
      console.log(valueToken);
      console.log(`Bearer ${valueToken}`);
  
      await fetch('http://'+ IP +`:8080/api/v1/anfrage/getfromkita/${valueId}`, {
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
          setRequests(data);
        } else {
          console.log('Die Antwort ist leer.');
          // Behandlung für eine leere Antwort, falls erforderlich
        }
      })
      .catch(error => console.error('Fehler:', error));
    }

    useFocusEffect(
      useCallback(() => {
        setTimeout(function() {
          fetchData()
        }, 500);
      }, [navigation])
    );

    const handleDelete = async (id) => {
      // try {
      //   const valueToken = await AsyncStorage.getItem('token');
  
      //   const response = await fetch(
      //     `http://${IP}:8080/api/v1/angebot/delete/${id}`,
      //     {
      //       method: 'DELETE',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         Authorization: `Bearer ${valueToken}`,
      //       },
      //     }
      //   )
      //   if (response.ok) {
      //     console.log('Erfolgreich gelöscht:', response.status);
      //     setTimeout(function() {
      //       fetchData()
      //     }, 1000);
      //   } else {
      //     console.error('Fehler beim Löschen:', response.status);
      //   }
      // } catch (error) {
      //   console.error('Fehler:', error);
      // }
    };

    const handleRefresh = async () => {
      setIsRefreshing(true);
      await fetchData();
      setIsRefreshing(false);
    };

    const renderItem = ({ item }) => (
        <AngebotAnfrageKitaView requestId={item.requestId}
                                offerId={item.offerId}
                                status={item.status}
                                createDate={item.createDate} 
                                updateDate={item.updateDate}
                                onDelete={() => {
                                  handleDelete(item.id)
                                }}
                                navigation={navigation}
                                />
          );

    return (
<Background>
            <Header items="Eigene Anfragen"  icon="menu" onPress={() => setOpen((prevOpen) => !prevOpen)}></Header>
            <View style={{ flex: 1, width: screenWidth }}>
                    {/* Abstandhalter für den Header */}
                    <View style={{ height:30}}/>
                   <View style={{ height:100}}>
                      <BackButton goBack={navigation.goBack} />
                    </View>
                    <View>               
                        <FlatList
                            data={requests}
                            keyExtractor={(item) => item.requestId.toString()}
                            renderItem={renderItem}
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                        />
                    </View>
            </View>
        </Background>
    ) 
} 

const styles = StyleSheet.create({
    scrollViewContent: {
      flexDirection: 'column',
    },
  });
