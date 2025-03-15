import React, { useState } from 'react';
import I from '../../styles/pages/Main/InputCodeStyle'
const InputCode = () => {
    const [codeValue, setCodeValue] = useState('');
    const handleChange = (e) => {
        setCodeValue(e.target.value);
      };
    return (
        <div>
            <I.HeaderDiv>
                <img src="/assets/Main/back-arrow.svg" alt="뒤로" />
            </I.HeaderDiv>
            <I.BodyDiv>
                <I.TitleDiv>페스티벌 입장하기</I.TitleDiv>
                <I.DetailDiv>
                    <img src="/assets/Main/red-check.svg" alt="체크" />
                    <span>참여하고 싶은 페스티벌의 초대 코드를 입력해주세요</span>
                </I.DetailDiv>
                <I.CodeInput type='text' placeholder='초대 코드 입력' value={codeValue} onChange={handleChange} hasText={codeValue.length>0 }/>
                <I.CodeSubmitButton isActive={codeValue.length>0}>입장하기</I.CodeSubmitButton>
            </I.BodyDiv>
        </div>
    );
};

export default InputCode;