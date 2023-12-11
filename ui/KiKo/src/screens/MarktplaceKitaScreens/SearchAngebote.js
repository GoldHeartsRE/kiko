import React, { useState, useEffect } from 'react';
import Background from '../../components/MainComponents/Background'
import Header from '../../components/MainComponents/Header'
import AngebotKitaView from '../../components/KitaMarktplaceComponents/AngebotKitaView';
import { View, Text, FlatList } from 'react-native';

const mockData = [
    { id: 1, kurstitel: 'Angebot 1', alterVon: '1', alterBis: '3', kinderVon: '1', kinderBis: '90', dauer: '90', wochentag: 'Mo', kosten: '86' },
    { id: 2, kurstitel: 'Angebot 2', alterVon: '1', alterBis: '3', kinderVon: '1', kinderBis: '90', dauer: '90', wochentag: 'Mo', kosten: '86' },
    // ... weitere Angebote ...
  ];

export default  function SearchAngebote({ navigation }) {
    const [angebote, setAngebote] = useState([]);

    useEffect(() => {
      // Hier könnten Sie Daten aus Ihrer Datenbank abrufen
      // In diesem Beispiel verwenden wir mockData als Platzhalter
      setAngebote(mockData);
    }, []);

    const renderItem = ({ item }) => (
        <AngebotKitaView    kurstitel={item.kurstitel}
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
            <FlatList
                data={angebote}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />        
        </Background>
    )
} 
