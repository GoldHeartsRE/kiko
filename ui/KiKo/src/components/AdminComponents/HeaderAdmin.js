import * as React from 'react'
import { Appbar } from 'react-native-paper'
import { Dimensions, StyleSheet, View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header({  items, icon, logout, onPress }) {
  const screenWidth = Dimensions.get('window').width;

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
                      style={{ width: screenWidth, height: "auto", backgroundColor: '#5882FA'}}
                    >
        <Appbar.Action icon={icon} onPress={onPress} />
        <Appbar.Content title={items}/>
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