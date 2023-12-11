import React, { useState, useEffect } from 'react';
import Background from '../../components/MainComponents/Background'
import Header from '../../components/MainComponents/Header'
import AngebotPartnerView from '../../components/PartnerMarktplaceComponents/AngebotPartnerView'
import { View, Dimensions, ScrollView, StyleSheet, Text, FlatList } from 'react-native'
import BackButton from '../../components/MainComponents/BackButton'


const mockData = [
    { id: 1, kurstitel: 'Angebot 1', alterVon: '1', alterBis: '3', kinderVon: '1', kinderBis: '90', dauer: '90', wochentag: 'Mo', kosten: '86' },
    { id: 2, kurstitel: 'Angebot 2', alterVon: '1', alterBis: '3', kinderVon: '1', kinderBis: '90', dauer: '90', wochentag: 'Mo', kosten: '86' },
    { id: 3, kurstitel: 'Angebot 2', alterVon: '1', alterBis: '3', kinderVon: '1', kinderBis: '90', dauer: '90', wochentag: 'Mo', kosten: '86' },
    { id: 4, kurstitel: 'Angebot 2', alterVon: '1', alterBis: '3', kinderVon: '1', kinderBis: '90', dauer: '90', wochentag: 'Mo', kosten: '86' },
    { id: 5, kurstitel: 'Angebot 2', alterVon: '1', alterBis: '3', kinderVon: '1', kinderBis: '90', dauer: '90', wochentag: 'Mo', kosten: '86' },
    { id: 6, kurstitel: 'Angebot 2', alterVon: '1', alterBis: '3', kinderVon: '1', kinderBis: '90', dauer: '90', wochentag: 'Mo', kosten: '86' },
    { id: 7, kurstitel: 'Angebot 2', alterVon: '1', alterBis: '3', kinderVon: '1', kinderBis: '90', dauer: '90', wochentag: 'Mo', kosten: '86' },
    { id: 8, kurstitel: 'Angebot 2', alterVon: '1', alterBis: '3', kinderVon: '1', kinderBis: '90', dauer: '90', wochentag: 'Mo', kosten: '86' },
    { id: 9, kurstitel: 'Angebot 2', alterVon: '1', alterBis: '3', kinderVon: '1', kinderBis: '90', dauer: '90', wochentag: 'Mo', kosten: '86' },
    // ... weitere Angebote ...
  ];

export default  function UebersichtAngebote({ navigation }) {
    const screenWidth = Dimensions.get('window').width * 0.95;

    const [angebote, setAngebote] = useState([]);

    useEffect(() => {
      // Hier könnten Sie Daten aus Ihrer Datenbank abrufen
      // In diesem Beispiel verwenden wir mockData als Platzhalter
      setAngebote(mockData);
    }, []);

    //überlegen ganzes Objekt zu übergeben, glaub besser
    const renderItem = ({ item }) => (
        <AngebotPartnerView id={item.id}
                            kurstitel={item.kurstitel}
                            alterVon={item.alterVon} 
                            alterBis={item.alterBis}
                            kindervon={item.kinderVon}
                            kinderBis={item.kinderBis}
                            wochentag={item.wochentag}
                            dauer={item.dauer}
                            kosten={item.kosten}/>
      );

    return (
        <Background>
            <Header items="Angebote" icon="logout" ></Header>
            <View style={{ flex: 1, width: screenWidth, zIndex: -100 }}>
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
