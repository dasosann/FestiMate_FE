import React from 'react';
import I from '../../styles/pages/Main/InputCodeStyle';

const TypeTest = () => {
    return (
        <div>
            <I.HeaderDiv>
                <img src="/assets/Main/back-arrow.svg" alt="뒤로" onClick={()=>navigate("/mainpage")} />
            </I.HeaderDiv>
        </div>
    );
};

export default TypeTest;