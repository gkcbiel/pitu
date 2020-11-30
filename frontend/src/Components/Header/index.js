import React from 'react';
import { Logo, HeaderContainer } from './styles';
import Icone from '../../assets/icone.png';



function Header(props) {
    return (
        <>
            <HeaderContainer>
                <Logo src={Icone} alt='Pitu - Encurtador de URL' />
                <h2>Pitu</h2>
                <p>{props.children}</p>

            </HeaderContainer>
            
        </>
    )
}

export default Header;