import React, { useState } from 'react';
import '/src/styles/InfoPage/InfoPage.css';
import FirstSection from './FirstSection';
import SecondSection from './SecondSection';
import ThirdSection from './ThirdSection';
import Navbar from './Navbar';

const InfoPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const [nickname, setNickname] = useState('');
    const [gender, setGender] = useState(null);
    const [year, setYear] = useState('');


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
            { currentPage === 2 && 
                <SecondSection 
                    setCurrentPage={setCurrentPage}
                    nickname={nickname}
                    setNickname={setNickname}
                    gender={gender}
                    setGender={setGender}
                    year={year}
                    setYear={setYear}
            /> }
            { currentPage === 3 &&
                <ThirdSection
                setCurrentPage={setCurrentPage}
            /> }
        </div>
    );
};

export default InfoPage;
