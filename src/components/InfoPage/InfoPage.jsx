import React, { useState } from 'react';
import '/src/styles/InfoPage/InfoPage.css';
import FirstSection from './FirstSection';
import Navbar from './Navbar';

const InfoPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
 
    return (
        <div className="section-container">
            <Navbar currentPage={currentPage}/>
            <FirstSection />
        </div>
    );
};

export default InfoPage;
