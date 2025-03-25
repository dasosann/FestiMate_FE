import React, { useState } from 'react';
import { Routes, Route, useLocation, useMatch } from 'react-router-dom';
import '/src/styles/MyPage/MainInfo.css';
import Navbar from './Navbar';
import InfoMenu from './InfoMenu';
import MyProfile from './MyProfile';
import Point from './Point';
import EditContact from './EditContact';
import EditMessage from './EditMessage';

const MainInfo = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="section-container">
            <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            <Routes>
                <Route path="/" element={<InfoMenu />} />
                <Route path="myprofile" element={<MyProfile />} />
                <Route path="point" element={<Point />} />
                <Route path="editContact" element={<EditContact />} />
                <Route path="editMessage" element={<EditMessage />} />
            </Routes>
        </div>
    );
};

export default MainInfo;
