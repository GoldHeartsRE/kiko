import * as React from 'react'
import { Appbar } from 'react-native-paper'
import { Dimensions, SafeAreaView, SafeAreaViewBase, Platform } from 'react-native'
import Logo from '../../components/KitaCreationComponents/LogoHeader'

export default function Header({  items, icon, logout }) {
  const screenWidth = Dimensions.get('window').width;

  return (
    <Appbar.Header  mode='center-aligned' 
                    style={{ width: screenWidth, height: "auto", top: -10 }}
                    statusBarHeight={Platform.OS === 'ios' ? SafeAreaView : SafeAreaViewBase}
                  >
      <Logo/>
      <Appbar.Content title={items}/>
      <Appbar.Action icon={icon} onPress={logout} />
    </Appbar.Header>
  );
};
