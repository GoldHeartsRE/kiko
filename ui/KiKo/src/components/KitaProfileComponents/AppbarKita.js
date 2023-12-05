// BottomNavigationBar.js
import React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

const AppbarKita = () => {
  const [index, setIndex] = React.useState(0);

  const routes = [
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'screen2', title: 'Screen 2', icon: 'bookmark' },
    { key: 'screen3', title: 'Screen 3', icon: 'search' },
    { key: 'screen4', title: 'Screen 4', icon: 'settings' },
  ];

  const renderScene = BottomNavigation.SceneMap({
    home: () => <Text>Home Content</Text>,
    screen2: () => <Text>Screen 2 Content</Text>,
    screen3: () => <Text>Screen 3 Content</Text>,
    screen4: () => <Text>Screen 4 Content</Text>,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default AppbarKita;
