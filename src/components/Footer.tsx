// Footer.tsx

import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    width: 100%;
    padding: 20px;
    background-color: black; /* Black background */
    color: white; /* White text */
    display: flex;
    justify-content: center; /* Distribute space between items */
    align-items: center; /* Center align items vertically */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const Copyright = styled.div`
    font-size: 14px;
    text-align: center; /* Center the text */
`;

const SocialIcons = styled.div`
    display: flex;
    gap: 15px;
    
    & a {
        color: white; /* White icons */
        font-size: 20px; /* Size of the icon */
        transition: color 0.3s; /* Transition for hover effect */
        
    }

    & a:hover {
        color: gray; 
    }
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <Copyright>
                © 2024 Built by <a href="https://zaid.impic.tech" style={{ color: 'white', textDecoration: 'none' }}>Zed</a>
            </Copyright>
            <SocialIcons>
                <a href="https://github.com/zaid-commits/perceptai_ts/" target="_blank" rel="noopener noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" style={{ width: '24px', height: '24px' }} />
                </a>
            </SocialIcons>
        </FooterContainer>
    );
};

export default Footer;
