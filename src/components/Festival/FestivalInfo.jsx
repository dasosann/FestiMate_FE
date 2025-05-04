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

    useEffect(() => {
        console.log(festivalId);
        const getFestival = async () => {
            try {
                const result = await instance.get(`/v1/festivals/${festivalId}`);
                setDate(result.data.data.festivalDate);
                setFestivalName(result.data.data.festivalName);
                
                // 현재 날짜와 축제 종료일 비교하여 isFinished 설정
                const festivalDateRange = result.data.data.festivalDate;
                if (festivalDateRange && festivalDateRange.includes('~')) {
                    const endDateStr = festivalDateRange.split('~')[1].trim();
                    const endDateParts = endDateStr.split('.');
                    const endDate = new Date(
                        parseInt(endDateParts[0]),
                        parseInt(endDateParts[1]) - 1, // 월은 0부터 시작하므로 -1
                        parseInt(endDateParts[2])
                    );
                    
                    const currentDate = new Date();
                    
                    // 종료일이 현재 날짜보다 이전이면 축제가 종료된 것
                    if (endDate < currentDate) {
                        setIsActive(false);

                    } else {            
                        setIsActive(true);
                    }
                }
                
                console.log(result);
            } catch (error) {
                console.error("[festival API Error] GET /v1/festivals/${festivalId}:", {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                });
                setIsActive(false);
            }
        }
        getFestival();
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