// import React from 'react'
// import { Provider } from 'react-native-paper'
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
// import {
//   StartScreen,
//   LoginScreen,
//   RegisterScreen,
//   ResetPasswordScreen,
//   Dashboard,
// } from './src/screens'

// const Stack = createStackNavigator()

// export default function App() {
//   // return (
//   //   <View style={styles.container}>
//   //     <Text> OK</Text>
//   //     <StatusBar style="auto" />
//   //   </View>
//   // );
// return (
//   <Provider theme={theme}>
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="StartScreen"
//         screenOptions={{
//           headerShown: false,
//         }}>
//       <Stack.Screen name="StartScreen" component={StartScreen} />

//       </Stack.Navigator>
//     </NavigationContainer>
//   </Provider>
// )
// }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// // });

import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/theme/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterRoleScreen,
  RegisterKitaScreen,
  RegisterPartnerScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens/LoginScreens'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterRoleScreen" component={RegisterRoleScreen} />
          <Stack.Screen name="RegisterKitaScreen" component={RegisterKitaScreen} />
          <Stack.Screen name="RegisterPartnerScreen" component={RegisterPartnerScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}