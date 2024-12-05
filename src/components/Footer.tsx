// Footer.tsx

import React from 'react';
import styled from 'styled-components';
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
const FooterContainer = styled.footer`
    width: 100%;
    padding: 40px 20px;
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 2px solid white;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
`;

const FooterContent = styled.div`
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
`;

const Section = styled.div`
    flex: 1;
    min-width: 200px;
`;

const SectionTitle = styled.h3`
    font-size: 1.25rem;
    margin-bottom: 10px;
`;

const Link = styled.a`
    color: #BF40BF;
    text-decoration: none;
    margin-bottom: 5px;
    display: block;
    transition: color 0.3s;

    &:hover {
        color: purple; 
    }
`;

const SocialIcons = styled.div`
    display: flex;
    gap: 10px;
`;

const SocialIcon = styled.a`
    color: #BF40BF;
    font-size: 1.5rem;
    transition: color 0.3s;

    &:hover {
        color: purple; 
    }
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <FooterContent>
                <Section>
                    <SectionTitle>Navigation</SectionTitle>
                    <Link href="/">Home</Link>
                    <Link href="/projects">Projects</Link>
                    <Link href="/community">Community</Link>
                    <Link href="/resources">Resources</Link>
                    <Link href="/contact">Contact</Link>
                </Section>
                <Section>
                    <SectionTitle>Social Media</SectionTitle>
                    <SocialIcons>
                        <SocialIcon href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
                            <FaTwitter />
                        </SocialIcon>
                        <SocialIcon href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
                            <FaFacebook />
                        </SocialIcon>
                        <SocialIcon href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </SocialIcon>
                        <SocialIcon href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer">
                            <FaGithub />
                        </SocialIcon>
                    </SocialIcons>
                </Section>
                <Section>
                    <SectionTitle>Contact</SectionTitle>
                    <p>Email: contact@perceptai.com</p>
                    <p>Phone: +1 (123) 456-7890</p>
                    <p>Address: 123 AI Street, Tech City, AI World</p>
                </Section>
            </FooterContent>
            <p style={{ marginTop: '20px', textAlign: 'center' }}>
                &copy; {new Date().getFullYear()} PerceptAI. All rights reserved.
            </p>
        </FooterContainer>
    );
};

export default Footer;
