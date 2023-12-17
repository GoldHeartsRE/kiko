import * as React from 'react';
import { View, StyleSheet } from 'react-native'
import { Drawer, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function DrawerPartner() {
  const [active, setActive] = React.useState('');
  const navigation = useNavigation();

  const onLogout = async() => {
    try {
      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('id')
    } catch(e) {
    }
    console.log('Ausgeloggt')
    navigation.navigate('StartScreen')
  }

  return (
    <View>
    <Drawer.Section title={<Text style={{fontWeight: 'bold'}}>Übersicht</Text>}>
      <Drawer.Item
        label="Kooperationen"
        active={active === 'first'}
        onPress={() => setActive('first')}
      />
      <Drawer.Item
        label="Eigene Angebote"
        active={active === 'second'}
        onPress={() => {setActive('second'), navigation.navigate('UebersichtAngeboteScreen')}}
      />
      <Drawer.Item
        label="Anfragen auf eigene Angebote"
        active={active === 'third'}
        onPress={() => setActive('third')}
      />
      <Drawer.Item
        label="Historie"
        active={active === 'fourth'}
        onPress={() => setActive('fourth')}
      />
    </Drawer.Section>
    <Drawer.Section>
      <Drawer.Item
        label="Logout"
        onPress={onLogout}
      />
    </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  titel: {
    fontWeight: 'bold',
    fontSize: 25,
  }
})
