import * as React from 'react';
import { Avatar } from 'react-native-paper';

export default function ProfilePicture() {

// Hier holen wir uns das Bild und wenn es kein Bild gibt Default setzen, eventuell aus async storage ziehen

    return (
        <Avatar.Icon size={100} icon="account"/>
    )
  }
  