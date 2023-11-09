import React from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../../theme/theme'

export default function Header({ mode, style, ...props }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text} {...props} />
      <Image source={require('../../assets/logo-kiko.png')} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        marginTop: -40,
        alignSelf: 'flex-end' 
      },
      container: {
        width: '100%',
        maxHeight: 60,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        top: -173
      },
      text: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 15
      }
})
