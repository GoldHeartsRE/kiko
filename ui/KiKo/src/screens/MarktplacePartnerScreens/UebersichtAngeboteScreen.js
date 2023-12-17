import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Background from '../../components/MainComponents/Background'
import Header from '../../components/MainComponents/Header'
import AngebotPartnerView from '../../components/PartnerMarktplaceComponents/AngebotPartnerView'
import { View, Dimensions, ScrollView, StyleSheet, Text, FlatList } from 'react-native'
import BackButton from '../../components/MainComponents/BackButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IP } from '../../constants/constants'

export default  function UebersichtAngebote({ navigation }) {
    const screenWidth = Dimensions.get('window').width * 0.95;

    const [angebote, setAngebote] = useState([]);

    useFocusEffect(() => {
      const fetchData = async () => {
        var valueToken = await AsyncStorage.getItem('token') 
        var valueId = await AsyncStorage.getItem('id') 
        console.log(valueToken);
        console.log(`Bearer ${valueToken}`);
    
        fetch('http://'+ IP +':8080/api/v1/angebot/partnerget/'+ valueId, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${valueToken}`,
          },
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setAngebote(data);
        })
        .catch(error => console.error('Fehler:', error));
        }
      // Temporäre Lösung, da der Post länger dauert als das Get und dadurch nicht alles gezogen wird
      setTimeout(() => {
        fetchData();
      }, 1000);

    })

    const renderItem = ({ item }) => (
        <AngebotPartnerView id={item.id}
                            kurstitel={item.kurstitel}
                            alterVon={item.altersgruppe_min} 
                            alterBis={item.altersgruppe_max}
                            kindervon={item.anzahlKinder_min}
                            kinderBis={item.anzahlKinder_max} 
                            wochentag={item.wochentag}
                            dauer={item.dauer}
                            kosten={item.kosten}
                            navigation={navigation}
                            />
      );

    return (
        <Background>
            <Header items="Angebote" icon="logout" ></Header>
            <BackButton goBack={navigation.goBack} />
            <View style={{ flex: 1, width: screenWidth }}>
                    {/* Abstandhalter für den Header */}
                    <View style={{ height:100}}>
                    </View> 
                    <View>               
                        <FlatList
                            data={angebote}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
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
