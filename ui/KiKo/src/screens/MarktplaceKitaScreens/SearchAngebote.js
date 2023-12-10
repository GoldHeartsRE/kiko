import React, { useState, useEffect } from 'react';
import Background from '../../components/MainComponents/Background'
import Header from '../../components/MainComponents/Header'

export default  function SearchAngebote({ navigation }) {

    return (
        <Background>
            <Header items="Angebote" icon="logout" ></Header>
        </Background>
    )
} 
