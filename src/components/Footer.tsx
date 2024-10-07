// Footer.tsx

import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    width: 100%;
    padding: 20px;
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 2px solid white;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
`;

const Link = styled.a`
    color: #BF40BF;
    text-decoration: none;
    margin-left: 5px;
    transition: color 0.3s;

    &:hover {
        color: purple; /* Darker purple color */
    }
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            Under development by&nbsp; 
            <Link href="https://zed.impic.tech">Zed</Link>
            &nbsp;at&nbsp;
            <Link href="https://www.community.impic.tech/">Impic</Link>
        </FooterContainer>
    );
};

export default Footer;
