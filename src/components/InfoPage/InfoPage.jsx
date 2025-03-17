import React, { useState } from 'react';
import '/src/styles/InfoPage/InfoPage.css';
import FirstSection from './FirstSection';
import SecondSection from './SecondSection';
import Navbar from './Navbar';

const InfoPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <div className="section-container">
            <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            { currentPage === 1 &&
            <FirstSection 
                setCurrentPage={setCurrentPage}
                setPhone={setPhone}
                setName={setName}
                name={name}
                phone={phone}
            /> }
            { currentPage === 2 && <SecondSection /> }
        </div>
    );
};

export default InfoPage;
