import React from 'react';
import {Logo, HeaderContainer} from './styles.js' ; 

import Icone from '../../assets/icone.png'

function Header(props) { // eslint-disable-next-line 
    return(
        <>
            <HeaderContainer>
                <Logo src={Icone} alt='Pitu - Encurtador de URL' />
                <h1>Pitu</h1>
                <p>{props.children}</p>
            </HeaderContainer>
        </>
    )
}

export default Header;