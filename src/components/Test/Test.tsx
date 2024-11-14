import React from 'react';
import RunProjectButton from '../Section2/RunProjectButton';
import ProjectLinks from '../Section2/ProjectLinks';
const Test: React.FC = () => {
    return (
        <div>
            <RunProjectButton projectName="Test" />
            <ProjectLinks />
        </div>
    );
};

export default Test;