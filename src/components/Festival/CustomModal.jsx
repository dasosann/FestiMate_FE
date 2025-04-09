import React, { useState, useRef } from 'react';
import '/src/styles/Festival/CustomModal.css';
import usePoint from '/assets/Festival/usePoint.svg';
import noPoint from '/assets/Festival/noPoint.svg';

const CustomModal = ({ isOpen, onConfirm, onCancel, isAble }) => {
    if (!isOpen) return null;
    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal">
                <img src={isAble ? usePoint : noPoint} />
                <div>
                    <div className="modal-message1">
                        {isAble ? "포인트를 사용하시겠습니까?" 
                                : "포인트가 부족합니다"
                        }
                    </div>

                    <div className="modal-message2">
                        {isAble ? "매칭 1회 당 1P씩 차감됩니다"
                                : "마이페이지에서 충전해주세요"
                        }
                    </div>
                </div>
                <div className="modal-buttons">
                    <button className="modal-cancel-btn"onClick={onCancel}>취소</button>
                    <button className="modal-confirm-btn" onClick={onConfirm}>확인</button>
                </div>
            </div>
        </div>
    );
};

export default CustomModal;