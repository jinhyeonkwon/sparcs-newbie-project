import React from "react";
import { useState } from "react";
import axios from "axios";
import { SAPIBase } from '../tools/api';

import '../css/mystyles.css';

// 1. 로그인 누르면 홈 화면으로
// 2. 회원가입 누르면 아이디 비번을 확인 없이 DB에 저장
// 3. 로그인 누르면 DB에 저장된 값과 비교

const JoinPage = () =>{
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const asyncFun = async () => {
      const response = await axios.post(SAPIBase + '/join/adduser', {
        userId: userId,
        name: name,
        password: password
      });
      if (response.status === 200) {
        alert("회원가입 성공!");
      } else {
        alert("DB 저장 실패!");
      }
    }
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  }

  return (
    <div>
      <h2 className='message' style={{textAlign:'center', color:'red', fontWeight:'bold'}}>비밀번호가 암호화되지 않는 점 주의하세요!</h2>
      <form style={{padding: '10px'}} onSubmit={onSubmit}>
        <div className='field'>
          <label className='label'>아이디</label>
          <div className='control'>
            <input className='input' onChange={(e) => setUserId(e.target.value)} value={userId} type="text" pattern="[A-Za-z]+" maxLength={15} required placeholder='15글자 이하의 알파벳' />
          </div>
        </div>
        <div className='field'>
          <label className='label'>이름</label>
          <div className='control'>
            <input className='input' onChange={(e) => setName(e.target.value)} value={name} type="text" maxLength={15} placeholder='15글자 이하' />
          </div>
        </div>
        <div className='field'>
          <label className='label'>비밀번호</label>
          <div className='control'>
            <input className='input' onChange={(e) => setPassword(e.target.value)} value={password} type="password" maxLength={30} placeholder='30글자 이하' />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" >회원가입</button>
          </div>
        </div>
      </form>
    </div>
  )
};

export default JoinPage;