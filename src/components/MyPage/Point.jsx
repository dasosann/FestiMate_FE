import React, { useState } from 'react';
import { Routes, Route, useNavigate, useMatch } from 'react-router-dom';
import '/src/styles/MyPage/Point.css';
import point from '/assets/MyPage/point.svg';

const Point = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();

    const transactions = [
        { type: '포인트 충전', amount: 3, date: "2025.03.24 16:07" },
        { type: '포인트 차감', amount: -3, date: "2025.03.24 16:03" },
        { type: '포인트 충전', amount: 6, date: "2025.03.24 16:00" },
    ];

    const sortedTransactions = transactions.slice().sort((a, b) => a.date.localeCompare(b.date));

    // 누적값 계산
    let cumulative = 0;
    const transactionsWithCumulative = sortedTransactions.map(item => {
        cumulative += item.amount;
        return { ...item, cumulative };
    });

    // 전체 잔액은 마지막 거래의 누적값
    const total = cumulative;

    // 최신순(내림차순)으로 화면에 표시하기 위해 역순 배열 생성
    const displayTransactions = transactionsWithCumulative.slice().reverse();

    const PointHistoryBox = ({ type, amount, date, cumulative }) => {
        const isPositive = amount > 0;
        return (
            <div className="point-history-box">
                <div className="point-history-row1">
                    {type}
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
                    <img src={point} />
                    나의 잔여 포인트
                    <span className="point-total">{total}P</span>
                </div>
            </div>

            <div className="divide-line"></div>

            {displayTransactions.map((transaction, index) => (
                <PointHistoryBox 
                    key={index}
                    type={transaction.type} 
                    amount={transaction.amount} 
                    date={transaction.date}
                    cumulative={transaction.cumulative}
                />
            ))}
        </div>
    );
};

export default Point;
