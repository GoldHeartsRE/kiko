import React, { useState } from 'react';
import { StyleSheet } from 'react-native'
import { View, Text } from 'react-native';
import { theme } from '../../theme/theme'
import DropDownPicker from 'react-native-dropdown-picker';

export default function DropdownComponent({  items, onValueChange, placeh, setVal, val }) {
  
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.container}>
    <DropDownPicker style={styles.dropdown}
        open={open}
        value={val}
        items={items}
        setOpen={setOpen}
        setValue={setVal}
        placeholder={placeh}
    />
</View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: 300,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    zIndex: 100
  },
  container: {
    width: '100%',
    marginVertical: 12,
  },
})