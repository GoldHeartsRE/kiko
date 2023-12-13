import React, { useState, useEffect } from 'react';
import Background from '../../components/MainComponents/Background'
import Header from '../../components/MainComponents/Header'
import AngebotKitaView from '../../components/KitaMarktplaceComponents/AngebotKitaView'
import { View, Dimensions, ScrollView, StyleSheet, Text, FlatList } from 'react-native'
import BackButton from '../../components/MainComponents/BackButton'
import AsyncStorage from '@react-native-async-storage/async-storage';

// const mockData = [
//     { id: 1, kurstitel: 'Angebot 1', alterVon: '1', alterBis: '3', kinderVon: '1', kinderBis: '90', dauer: '90', wochentag: 'Mo', kosten: '86' },
//     { id: 2, kurstitel: 'Angebot 2', alterVon: '1', alterBis: '3', kinderVon: '1', kinderBis: '90', dauer: '90', wochentag: 'Mo', kosten: '86' },
//     { id: 3, kurstitel: 'Angebot 2', alterVon: '1', alterBis: '3', kinderVon: '1', kinderBis: '90', dauer: '90', wochentag: 'Mo', kosten: '86' },
//     { id: 4, kurstitel: 'Angebot 2', alterVon: '1', alterBis: '3', kinderVon: '1', kinderBis: '90', dauer: '90', wochentag: 'Mo', kosten: '86' },
//     { id: 5, kurstitel: 'Angebot 2', alterVon: '1', alterBis: '3', kinderVon: '1', kinderBis: '90', dauer: '90', wochentag: 'Mo', kosten: '86' },
//     { id: 6, kurstitel: 'Angebot 2', alterVon: '1', alterBis: '3', kinderVon: '1', kinderBis: '90', dauer: '90', wochentag: 'Mo', kosten: '86' },
//     { id: 7, kurstitel: 'Angebot 2', alterVon: '1', alterBis: '3', kinderVon: '1', kinderBis: '90', dauer: '90', wochentag: 'Mo', kosten: '86' },
//     { id: 8, kurstitel: 'Angebot 2', alterVon: '1', alterBis: '3', kinderVon: '1', kinderBis: '90', dauer: '90', wochentag: 'Mo', kosten: '86' },
//     { id: 9, kurstitel: 'Angebot 2', alterVon: '1', alterBis: '3', kinderVon: '1', kinderBis: '90', dauer: '90', wochentag: 'Mo', kosten: '86' },
//     // ... weitere Angebote ...
//   ];

export default  function SearchAngebote({ }) {
    const screenWidth = Dimensions.get('window').width * 0.95;

    const [angebote, setAngebote] = useState([]);

    useEffect( async() => {
        var valueToken = await AsyncStorage.getItem('token') 

        fetch('http://localhost:8080/api/v1/angebot', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${valueToken}`,
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setAngebote(data);
        AsyncStorage.setItem('kurstitel', data.kurstitel);
        AsyncStorage.setItem('altersgruppe_min', data.altersgruppe_min);
        AsyncStorage.setItem('altersgruppe_max', data.altersgruppe_max);
        AsyncStorage.setItem('anzahlKinder_min', data.anzahlKinder_min);
        AsyncStorage.setItem('anzahlKinder_max', data.anzahlKinder_max);
        AsyncStorage.setItem('wochentag', data.wochentag);
        AsyncStorage.setItem('dauer', data.dauer);
        AsyncStorage.setItem('kosten', data.kosten);
        return
      })
      .catch(error => console.error('Fehler:', error));
      // In diesem Beispiel verwenden wir nicht mockData als Platzhalter
    }, []);

    //überlegen ganzes Objekt zu übergeben, glaub besser
    const renderItem = ({ item }) => (
        <AngebotKitaView    
                            id={item.id}
                            kurstitel={item.kurstitel}
                            altersgruppe_min={item.altersgruppe_min} 
                            altersgruppe_max={item.altersgruppe_max}
                            anzahlKinder_min={item.anzahlKinder_min}
                            anzahlKinder_max={item.anzahlKinder_max}
                            wochentag={item.wochentag}
                            dauer={item.dauer}
                            kosten={item.kosten}/>
      );

    return (
        <Background>
            <Header items="Angebote" icon="logout" ></Header>
            <View style={{ flex: 1, width: screenWidth, zIndex: -100, marginTop: 30 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}} contentContainerStyle={styles.scrollViewContent}>
                    {/* Abstandhalter für den Header */}
                    <View style={{ flex: 1,height: 125}}>
                        <BackButton goBack={navigation.goBack} />
                    </View>                    
                    <FlatList
                        data={angebote}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                    />        
                </ScrollView>
            </View>
        </Background>
    ) 
} 

const styles = StyleSheet.create({
    scrollViewContent: {
      flexDirection: 'column',
    },
  });
