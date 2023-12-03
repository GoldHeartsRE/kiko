import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, SafeAreaView, StatusBar } from 'react-native';
import { Button as PaperButton, IconButton } from 'react-native-paper'
import { theme } from '../../theme/theme'
import * as DocumentPicker from 'expo-document-picker';

export default function DocumentPickerSingle({test, mode, style, ...props}) {

    const [fileResponse, setFileResponse] = useState([]);

    // const handleDocumentSelection = useCallback(async () => {
    //   try {
    //     const response = await DocumentPicker.getDocumentAsync({
    //       type:'*/*',
    //       copyToCacheDirectory: false,
    //     });
    //     console.log(response.assets[0].uri);
    //     console.log(response);
    //     test = response.assets[0].uri
    //     setFileResponse(response.assets[0].name);
    //   } catch (err) {
    //     console.warn(err);
    //   }
    // }, []);
    
    return (
        <SafeAreaView style={styles.button}>
        <StatusBar barStyle={'dark-content'} />
          {fileResponse?.map((file, index) => (
        <Text
          key={index.toString()}
          style={styles.uri}
          numberOfLines={1}
          ellipsizeMode={'middle'}>
          {file?.assets[0].name}
        </Text>
        ))}
        <PaperButton
          // onPress={handleDocumentSelection}
          style={[
            styles.button,
            mode === 'outlined' && { backgroundColor: theme.colors.surface },
            style,
          ]}
          labelStyle={styles.text}
          mode={mode}
          {...props}
          icon={'upload'}
        />
        </SafeAreaView>
      );
    };
    
    const styles = StyleSheet.create({
      button: {
        width: '100%',
        marginVertical: 10,
        paddingVertical: 2,
        zIndex: -10
      },
      text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
      },
    })
    