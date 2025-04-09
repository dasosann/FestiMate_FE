import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/styles/Festival/FestivalInfo.css';
import ActiveFestival from './ActiveFestival';
import DeactiveFestival from './DeactiveFestival';
import Navbar from './Navbar';

const FestivalInfo = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    return (
        <>
            <Navbar />
            { isActive ? <ActiveFestival /> : <DeactiveFestival /> }
        </>
    );
};

export default FestivalInfo;
