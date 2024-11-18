import React from 'react';
import FloatingNavbar from '../Section1/Navbar/Navbar';
import RunProjectButton from '../Section2/RunProjectButton';
import CommunityForum from '../Section9/CommunityForum';
const Test: React.FC = () => {
    return (
        <div>
            <FloatingNavbar/>
            <RunProjectButton projectName="Test" />
            <CommunityForum/>
        </div>
    );
};

export default Test;