import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const DocumentPickerComponent = () => {
  const [pickedDocument, setPickedDocument] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      console.log(result);
      // Hier können Sie die ausgewählte Datei verarbeiten

      // Beispiel: Setzen des Dateinamens im Zustand
      setPickedDocument(result.name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // Benutzer hat die Auswahl abgebrochen
        console.log('Picker wurde abgebrochen');
      } else {
        throw err;
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Dokument auswählen" onPress={pickDocument} />
      {pickedDocument && (
        <Text>Ausgewähltes Dokument: {pickedDocument}</Text>
      )}
    </View>
  );
};

export default DocumentPickerComponent;
