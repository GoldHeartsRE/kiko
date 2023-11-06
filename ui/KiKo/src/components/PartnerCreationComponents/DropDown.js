import React, { useState } from 'react';
import { StyleSheet } from 'react-native'
import { View, Text } from 'react-native';
import { theme } from '../../theme/theme'
import RNPickerSelect from 'react-native-picker-select';

export default function DropdownComponent({  items, onValueChange }) {
  const [selectedValue, setSelectedValue] = useState(null);
  return (
    <View style={styles.container}>
      <RNPickerSelect style={styles.text}
        placeholder={{label: 'Anrede', value: null, color: 'grey'}}
        onValueChange={(value) => {
          setSelectedValue(value);
          onValueChange(value);
        }}
        items={items}
        value={selectedValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: theme.colors.surface,
    // marginLeft: '-40%',
    // width: '219%',
    // height: 200,
    // marginVertical: 12,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  text: {
      fontWeight: 'bold',
      fontSize: 15,
      lineHeight: 26,
      backgroundColor: theme.colors.surface,
    },
})