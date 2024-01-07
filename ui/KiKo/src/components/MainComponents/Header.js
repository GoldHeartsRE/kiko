import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import Logo from '../../components/MainComponents/LogoHeader'

/**
 * @method Header
 * @memberof MainComponents
 * @async
 * @description Header für die MainComponents, setzt für großteil des Projekt den Header
 */

export default function Header ({ items, icon, logout, onPress }) {
  const screenWidth = Dimensions.get('window').width
  const navigation = useNavigation()

  // const onLogout = async() => {
  //     try {
  //       await AsyncStorage.removeItem('token')
  //       await AsyncStorage.removeItem('id')
  //     } catch(e) {
  //     }
  //     console.log('Ausgeloggt')
  //     navigation.navigate('StartScreen')
  //   }

  return (
    <View style={styles.container}>
      <Appbar.Header
        mode='center-aligned'
        style={{ width: screenWidth, height: 'auto' }}
      >
        <Appbar.Action icon={icon} onPress={onPress} />
        <Appbar.Content title={items} />
        <Logo />
      </Appbar.Header>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    zIndex: 500
  }
})
