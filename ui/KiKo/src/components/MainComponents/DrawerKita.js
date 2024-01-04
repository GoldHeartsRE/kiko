import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Drawer, Text } from 'react-native-paper'

/**
 * @method DrawerKita
 * @memberof MainComponents.DrawerKita
 * @async
 * @description DrawerKita für die MainComponents, setzt im Profil den Drawer fest, welcher ermöglicht auf andere Komponente zu navigieren oder sich auszuloggen
 */

export default function DrawerKita () {
  const [active, setActive] = React.useState('')
  const navigation = useNavigation()

  const onLogout = async () => {
    try {
      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('id')
    } catch (e) {}
    console.log('Ausgeloggt')
    navigation.navigate('StartScreen')
  }

  return (
    <View>
      <Drawer.Section
        title={<Text style={{ fontWeight: 'bold' }}>Übersicht</Text>}
      >
        <Drawer.Item
          label='Aktuelle Kooperationen'
          active={active === 'first'}
          onPress={() => {
            setActive('first'),
              navigation.navigate('UebersichtKitaKooperationen')
          }}
        />
        <Drawer.Item
          label='Eigene Anfragen'
          active={active === 'second'}
          onPress={() => {
            setActive('second'),
              navigation.navigate('UebersichtKitaAnfragenAngebote')
          }}
        />
      </Drawer.Section>
      <Drawer.Section>
        <Drawer.Item label='Logout' onPress={onLogout} />
      </Drawer.Section>
    </View>
  )
}

const styles = StyleSheet.create({
  titel: {
    fontWeight: 'bold',
    fontSize: 25
  }
})
