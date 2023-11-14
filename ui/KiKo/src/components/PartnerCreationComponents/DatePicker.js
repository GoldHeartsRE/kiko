import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from 'react-native'
import { DatePickerInput } from 'react-native-paper-dates';
import { theme } from '../../theme/theme'
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [inputDate, setInputDate] = React.useState(undefined)

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <DatePickerInput style={styles.design}
          label="Geburtsdatum"
          value={inputDate}
          onChange={(d) => setInputDate(d)}
          inputMode="start"
        />
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
    design: {
        backgroundColor: theme.colors.surface,
      },
    container: {
        width: '105%',
        justifyContent: 'center', flex: 1, 
        alignItems: 'center',
        maxHeight: 100
      },
  })