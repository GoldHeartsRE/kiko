import React, { useState, useEffect } from 'react';
import Background from '../../components/MainComponents/Background'
import Header from '../../components/MainComponents/Header'

export default  function UebersichtAngebote({ navigation }) {

    return (
        <Background>
            <Header items="Meine Angebote" icon="logout" ></Header>
        </Background>
    )
} 
