import React, {useState} from 'react'
import Background from '../../components/MainComponents/Background'
import Paragraph from '../../components/LoginComponents/Paragraph'
import { Drawer } from 'react-native-paper';

export default function ChatScreen({ navigation }) {
  const [active, setActive] = React.useState('');

  return (
    <Background>
      <Paragraph>
        In Bearbeitung
      </Paragraph>
    </Background>
  )
}