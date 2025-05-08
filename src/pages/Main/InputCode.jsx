import React, { useState } from 'react';
import I from '../../styles/pages/Main/InputCodeStyle'
import { useNavigate } from 'react-router-dom';
import instance from '../../../axiosConfig';
const InputCode = () => {
    const [codeValue, setCodeValue] = useState('');
    const [isError, setIsError] = useState(false); // 에러 상태 (코드가 올바르지 않을 때 true)
    const [errorMessage,setErrorMessage] = useState("유효하지 않은 초대 코드입니다.")
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [festivalName, setFestivalName] = useState(''); // 축제 이름 저장
    const [category, setCategory] = useState(''); // 카테고리 저장
    const [festivalId, setFestivalId] = useState(); // 축제 ID 저장
    const navigate =useNavigate();
    const CATEGORY_LOGOS = {
      MUSIC: '/assets/Main/music-logo.svg',
      SCHOOL: '/assets/Main/school-logo.svg',
      LIFE: '/assets/Main/life-logo.svg',
    };
    const handleChange = (e) => {
        setCodeValue(e.target.value);
        if(codeValue.length>0){
            setIsError(false); // 입력 중 에러 상태 초기화
        }
      };
    const handleSubmit = async () => {
      // 빈 코드일 경우 빠른 리턴
      if (!codeValue) {
        setIsError(true);
        alert("코드를 입력해주세요.");
        return;
      }

      try {
        // 백엔드 API 예시 (실제 주소/로직에 맞게 수정)
        const response = await instance.post('/v1/festivals/verify', {
          inviteCode: codeValue,
        });
        console.log("페스티벌 코드 응답",response);
        const {code,data} = response.data; // 응답에서 valid와 festivalName 추출

        // data가 정상일 경우
        if (code===2000) {
          // 올바른 코드 - 다음 페이지로 이동 혹은 다른 로직
          setFestivalName(data.title); // 축제 이름 저장
          setCategory(data.category); // 카테고리 저장
          setFestivalId(data.festivalId);  // 혹은 parseInt(data.festivalId, 10
          console.log(data)
          setIsModalOpen(true); // 모달 표시
        } 
        else if (code===4013){
          setIsError(true);
          setErrorMessage("초대 코드가 만료되었습니다.")
        }
        else {
          // 서버가 valid=false로 응답한 경우
          setIsError(true);
        }
      } catch (error) {
        // 네트워크 에러나 throw new Error 등
        setIsError(true);
      }
    };
    const handleConfirmButton =async() =>{
      // try{
      //   const response = await instance.post(`/v1/festivals/${festivalId}/participants`)
      //   console.log(response);
      //   navigate("/mainpage")
      // }catch(error){
      //   alert("페스티벌 아이디를 가져오는 중 오류가 발생했습니다.")
      // }
      navigate('/festivaltype',{state:{festivalId,festivalName}});
    }
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
                {isError && <I.InvalidCodeText>{errorMessage}</I.InvalidCodeText>}
                <I.CodeSubmitButton isActive={codeValue.length>0} onClick={handleSubmit}>입장하기</I.CodeSubmitButton>
            </I.BodyDiv>
            {isModalOpen && (
                <>
                    <I.ModalOverlay onClick={() => setIsModalOpen(false)} />
                    <I.ConfirmModal>
                        <img src={CATEGORY_LOGOS[category]} alt="학교" />
                        <I.ModalTitle>입장하시겠습니까?</I.ModalTitle>
                        <I.ModalContent>{festivalName}</I.ModalContent>
                        <I.ModalButtonWrapper>
                            <I.ModalButton border="1px solid #e6e6eb" color="#7b7c87" backgroundColor="#fff" onClick={() => setIsModalOpen(false)}>취소</I.ModalButton>
                            <I.ModalButton color="#fff" backgroundColor="#3a3c42" onClick={handleConfirmButton}>확인</I.ModalButton>
                        </I.ModalButtonWrapper>
                    </I.ConfirmModal>
                </>
            )}
        </div>
    );
};

export default InputCode;