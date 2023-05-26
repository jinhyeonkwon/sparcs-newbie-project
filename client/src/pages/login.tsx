import React from "react";
import { useState } from "react";
import axios from "axios";
import { SAPIBase } from '../tools/api';

import '../css/mystyles.css';

// 1. 로그인 누르면 홈 화면으로
// 2. 회원가입 누르면 아이디 비번을 확인 없이 DB에 저장
// 3. 로그인 누르면 DB에 저장된 값과 비교

const LoginPage = () =>{
  const [typedId, setTypedId] = useState("");
  const [typedPassword, setTypedPassword] = useState("");
  const [modalClass, setModalClass] = useState("modal");

  const onSubmit = (event) => {
    event.preventDefault();
    const asyncFun = async () => {
      const response = await axios.post(SAPIBase + '/login', {
        typedId: typedId,
        typedPassword: typedPassword
      }, { withCredentials: true }); // withCredentials가 있어야 쿠키 사용 가능!
      if (response.status === 200) {
        setModalClass('modal');
        window.location.href = `${window.location.href.replace('/login', '')}`; // 리다이렉트
      } else {
        setModalClass('modal is-active');
      }
    }
    asyncFun().catch((e) => setModalClass('modal is-active'));
    }

  const closeModal = (event) => {
    event.preventDefault();
    setModalClass('modal');
  }
  
  return (
    <div>
      <form style={{padding: '10px'}} onSubmit={onSubmit}>
        <div className='field'>
          <label className='label'>아이디</label>
          <div className='control'>
            <input className='input' onChange={(e) => setTypedId(e.target.value)} value={typedId} type="text" pattern="^[a-zA-Z0-9]+$" maxLength={15} required placeholder='15글자 이하의 알파벳/숫자' />
          </div>
        </div>
        <div className='field'>
          <label className='label'>비밀번호</label>
          <div className='control'>
            <input className='input' onChange={(e) => setTypedPassword(e.target.value)} value={typedPassword} type="password" maxLength={30} placeholder='30글자 이하' />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" >로그인</button>
          </div>
        </div>
      </form>
      <div className={modalClass} id='fail-modal'>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className='card'>
            <div className='card-content'>
              로그인 실패! 아이디와 비밀번호를 확인하세요.
            </div>
            <footer className='modal-card-foot'>
              <button className="button" aria-label="close" onClick={closeModal}>닫기</button> 
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
};

export default LoginPage;