import * as React from 'react'
import { Appbar } from 'react-native-paper'
import { Dimensions, SafeAreaView, SafeAreaViewBase } from 'react-native'
import Logo from '../../components/KitaCreationComponents/Logo'

const Header = () => {
  const screenWidth = Dimensions.get('window').width;

  const headerHeight = (Dimensions.get('screen').height)*0.03;

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header  mode='center-aligned' 
                    style={{ width: screenWidth, height: "auto" }}
                  >
      <Logo/>
      <Appbar.Content title="Profil erstellen"/>
      <Appbar.Action icon="logout" onPress={_handleMore} />
    </Appbar.Header>
  );
};

export default Header;