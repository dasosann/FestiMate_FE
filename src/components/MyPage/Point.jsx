import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useMatch } from 'react-router-dom';
import '/src/styles/MyPage/Point.css';
import point from '/assets/MyPage/point.svg';
import instance from '../../../axiosConfig';

const Point = ({festivalId}) => {
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getInfo = async () => {
            try {
                const result = await instance.get(`/v1/festivals/${festivalId}/me/points`);
                
                // 서버에서 이미 최신순으로 데이터를 받아온다고 가정
                const histories = result.data.data.histories;
                const totalPoint = result.data.data.totalPoint;
                
                // 누적 포인트 계산
                let runningTotal = totalPoint;
                const historiesWithCumulative = histories.map((transaction, index) => {
                    // 현재 거래 항목의 누적 포인트를 저장
                    const currentCumulative = runningTotal;
                    
                    // 다음 항목의 누적 포인트 계산을 위해 현재 항목의 포인트를 반영
                    // CREDIT은 과거에 더해진 것이므로 현재 계산할 때는 빼고, DEBIT은 과거에 빠진 것이므로 현재 계산할 때는 더함
                    if (transaction.transactionType === 'CREDIT') {
                        runningTotal -= transaction.point;
                    } else {
                        runningTotal += transaction.point;
                    }
                    
                    return {
                        ...transaction,
                        cumulative: currentCumulative
                    };
                });
                
                setTransactions(historiesWithCumulative);
                setTotal(totalPoint);
                console.log(result);
            } catch (error) {
                console.error(`[point API Error] GET /v1/festivals/${festivalId}/me/points:`, {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                });
            }
        }
        getInfo();
    },[]);

    const PointHistoryBox = ({ type, amount, date, cumulative }) => {
        const isPositive = type === 'CREDIT';
        return (
            <div className="point-history-box">
                <div className="point-history-row1">
                    {type === "CREDIT" ? "포인트 충전" : "포인트 사용"}
                    <span className={`point-right ${isPositive ? 'positive' : 'negative'}`}>
                        {isPositive ? `+${amount}P` : `-${Math.abs(amount)}P`}
                    </span>
                </div>
                <div className="point-history-row2">
                    {date}
                    <span className="point-right">{cumulative}P</span>
                </div>
            </div>
        );
    };

    return (
        <div className="point-section-container">
            <div className="point-top-container">
                <div className="point-total-box">
                    <img src={point} alt="포인트 아이콘" />
                    나의 잔여 포인트
                    <span className="point-total">{total}P</span>
                </div>
            </div>

            <div className="divide-line"></div>

            {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                    <PointHistoryBox 
                        key={index}
                        type={transaction.transactionType} 
                        amount={transaction.point} 
                        date={transaction.date}
                        cumulative={transaction.cumulative}
                    />
                ))
            ) : (
                <div className="no-transactions">
                    포인트 내역이 없습니다.
                </div>
            )}
        </div>
    );
};

export default Point;