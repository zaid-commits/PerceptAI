import React from 'react';
import FloatingNavbar from '../Section1/Navbar/Navbar';
import RunProjectButton from '../Section2/RunProjectButton';
const Test: React.FC = () => {
    return (
        <div>
            <FloatingNavbar/>
            <RunProjectButton projectName="Test" />
        </div>
    );
};

export default Test;