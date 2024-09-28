// Footer.tsx

import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    width: 100%;
    padding: 20px;
    background-color: black; /* Black background */
    color: white; /* White text */
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const Copyright = styled.div`
    font-size: 14px;
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
        color: gray; /* Change color on hover */
    }
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <Copyright>© 2024 Built by Zed</Copyright>
            <SocialIcons>
                <a href="https://github.com/Zed" target="_blank" rel="noopener noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" style={{ width: '24px', height: '24px' }} />
                </a>
            </SocialIcons>
        </FooterContainer>
    );
};

export default Footer;
