import React, { useState, useEffect } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import '/src/styles/Festival/FestivalInfo.css';
import ActiveFestival from './ActiveFestival';
import DeactiveFestival from './DeactiveFestival';
import Navbar from './Navbar';
import instance from '../../../axiosConfig';

const FestivalInfo = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const festivalId = useParams().festivalId;
    const [date, setDate] = useState('');
    const [festivalName, setFestivalName] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        
        const getFestival = async () => {
            try {
                const result = await instance.get(`/v1/festivals/${festivalId}`);
                setDate(result.data.data.festivalDate);
                setFestivalName(result.data.data.festivalName);
                

            } catch (error) {
                console.error("[festival API Error] GET /v1/festivals/${festivalId}:", {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                });
            }
        }
        getFestival();
    }, [festivalId]);

    useEffect(() => {
        
        const getFestivalStatus = async () => {
            try {
                const result = await instance.get(`/v1/festivals/${festivalId}/participants/me/summary`);
                
                if(result.data.data.status === 'BEFORE' || result.data.data.status === 'REFUND') {
                    setIsActive(false);
                } 
                else {
                    setIsActive(true);
                }
                
                
            } catch (error) {
                console.error("[festival API Error] GET /v1/festivals/${festivalId}:", {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                });
                setIsActive(false);
            }
        }
        getFestivalStatus();
    }, [festivalId]);

    return (
        <>
            <Navbar festivalId={festivalId}/>
            { isActive ?  
                        <ActiveFestival 
                            festivalName={festivalName}
                            festivalDate={date}
                            festivalId={festivalId}
                        />  
                        :  
                        <DeactiveFestival 
                            festivalName={festivalName}
                            festivalDate={date}
                            festivalId={festivalId}
                        />
                        
            }
        </>
    );
};

export default FestivalInfo;