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
        alert("로그인 성공!");
      } else {
        alert("로그인 실패!");
      }
    }
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
    }

  return (
    <div>
      <form style={{padding: '10px'}} onSubmit={onSubmit}>
        <div className='field'>
          <label className='label'>아이디</label>
          <div className='control'>
            <input className='input' onChange={(e) => setTypedId(e.target.value)} value={typedId} type="text" pattern="[A-Za-z]+" maxLength={15} required placeholder='15글자 이하의 알파벳' />
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
      <div className={modalClass}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <p>modal 테스트</p>
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </div>
    </div>
  )
};

export default LoginPage;