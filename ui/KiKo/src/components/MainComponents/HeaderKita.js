import * as React from 'react'
import { Appbar } from 'react-native-paper'
import { Dimensions, StyleSheet, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Logo from '../../components/MainComponents/LogoHeader'
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Indexiert alle Komponeten für AdminComponents
 * @namespace Admincomponents
 */

  /**
   * @method HeaderAdmin
   * @memberof Admincomponents.HeaderAdmin
   * @async
   * @description Header Komponente für die Adminscreens, unterscheidet sich in der Farbe zu den anderen Header
   */

export default function HeaderAdmin({  items, icon, logout, onPress }) {
  const screenWidth = Dimensions.get('window').width;
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
    <View style={styles.container}>
      <Appbar.Header  mode='center-aligned' 
                      style={{ width: screenWidth, height: "auto"}}
                    >
        <Appbar.Action icon={icon} onPress={onLogout} />
        <Appbar.Content title={items}/>
        <Logo/>
      </Appbar.Header>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0
  }
})
