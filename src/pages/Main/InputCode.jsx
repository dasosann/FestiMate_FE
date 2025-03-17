import React, { useState } from 'react';
import I from '../../styles/pages/Main/InputCodeStyle'
import { useNavigate } from 'react-router-dom';
const InputCode = () => {
    const [codeValue, setCodeValue] = useState('');
    const [isError, setIsError] = useState(false); // 에러 상태 (코드가 올바르지 않을 때 true)
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [festivalName, setFestivalName] = useState(''); // 축제 이름 저장
    const navigate =useNavigate();
    const handleChange = (e) => {
        setCodeValue(e.target.value);
      };
    const handleSubmit = async () => {
      // 빈 코드일 경우 빠른 리턴
      if (!codeValue) {
        setIsError(true);
        return;
      }

      try {
        // 백엔드 API 예시 (실제 주소/로직에 맞게 수정)
        const response = await fetch('https://your-backend-api.com/check-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: codeValue }),
        });

        if (!response.ok) {
          // 서버에서 4xx, 5xx 응답이 온 경우
          throw new Error('올바르지 않은 코드입니다.');
        }

        const data = await response.json();
        // data가 정상일 경우
        if (data.valid) {
          // 올바른 코드 - 다음 페이지로 이동 혹은 다른 로직
          setFestivalName(data.festivalName); // 응답에서 축제 이름 저장
          setIsModalOpen(true); // 모달 표시
        } else {
          // 서버가 valid=false로 응답한 경우
          setIsError(true);
        }
      } catch (error) {
        // 네트워크 에러나 throw new Error 등
        setIsError(true);
        setIsModalOpen(true);
      }
    };
    return (
        <div style={{textAlign:'left',height:'calc(100dvh - env(safe-area-inset-bottom))'}}>
            <I.HeaderDiv>
                <img src="/assets/Main/back-arrow.svg" alt="뒤로" onClick={()=>navigate("/mainpage")} />
            </I.HeaderDiv>
            <I.BodyDiv>
                <I.TitleDiv>페스티벌 입장하기</I.TitleDiv>
                <I.DetailDiv>
                    <img src="/assets/Main/red-check.svg" alt="체크" />
                    <span>참여하고 싶은 페스티벌의 초대 코드를 입력해주세요</span>
                </I.DetailDiv>
                <I.CodeInput type='text' placeholder='초대 코드 입력' value={codeValue} onChange={handleChange} isError={isError}/>
                {isError && <I.InvalidCodeText>유효하지 않은 초대 코드입니다</I.InvalidCodeText>}
                <I.CodeSubmitButton isActive={codeValue.length>0} onClick={handleSubmit}>입장하기</I.CodeSubmitButton>
            </I.BodyDiv>
            {isModalOpen && (
                <>
                    <I.ModalOverlay onClick={() => setIsModalOpen(false)} />
                    <I.ConfirmModal>
                        <img src="/assets/Main/school-logo.svg" alt="학교" />
                        <I.ModalTitle>입장하시겠습니까?</I.ModalTitle>
                        <I.ModalContent>축제 <b>{festivalName}</b>에 입장하시겠습니까?</I.ModalContent>
                        <I.ModalButtonWrapper>
                            <I.ModalButton border="1px solid #e6e6eb" color="#7b7c87" backgroundColor="#fff" onClick={() => setIsModalOpen(false)}>취소</I.ModalButton>
                            <I.ModalButton color="#fff" backgroundColor="#3a3c42" onClick={() => navigate("/mainpage")}>확인</I.ModalButton>
                        </I.ModalButtonWrapper>
                    </I.ConfirmModal>
                </>
            )}
        </div>
    );
};

export default InputCode;