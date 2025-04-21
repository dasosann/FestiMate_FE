import React, { useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import '/src/styles/MyPage/MainInfo.css';
import Navbar from './Navbar';
import InfoMenu from './InfoMenu';
import MyProfile from './MyProfile';
import Point from './Point';
import EditContact from './EditContact';
import EditMessage from './EditMessage';

const MainInfo = () => {
    const festivalId = useParams().festivalId;

    return (
        <div className="section-container">
            <Navbar/>
            <Routes>
                <Route path="/" element={<InfoMenu festivalId={festivalId}/>} />
                <Route path="myprofile" element={<MyProfile festivalId={festivalId}/>} />
                <Route path="point" element={<Point festivalId={festivalId}/>} />
                <Route path="editContact" element={<EditContact festivalId={festivalId}/>} />
                <Route path="editMessage" element={<EditMessage festivalId={festivalId}/>} />
            </Routes>
        </div>
    );
};

export default MainInfo;
