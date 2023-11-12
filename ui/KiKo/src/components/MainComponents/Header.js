import * as React from 'react'
import { Appbar } from 'react-native-paper'
import { Dimensions, StyleSheet, View } from 'react-native'
import Logo from '../../components/MainComponents/LogoHeader'

export default function Header({  items, icon, logout }) {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Appbar.Header  mode='center-aligned' 
                      style={{ width: screenWidth, height: "auto"}}
                    >
        <Logo/>
        <Appbar.Content title={items}/>
        <Appbar.Action icon={icon} onPress={logout} />
      </Appbar.Header>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0}
})
