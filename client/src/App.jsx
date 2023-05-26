import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from "react-router-dom";
import { CookiesProvider, useCookies } from 'react-cookie';
import HomePage from "./pages/home";
import JoinPage from "./pages/join";
import LoginPage from "./pages/login";
import PageNotFound from "./pages/404";

//import './App.css'
import './css/mystyles.css';
import axios from 'axios';
import { SAPIBase } from './tools/api';

const activeStyle = {
  color: '#8A4D76',
  fontWeight: 'bold'
}

const deactiveStyle = {
  color: 'black',
  testDecoration: 'none'
}

function App() {
  const [cookie, setCookie, removeCookie] = useCookies(['loggedinId']);
  const [loggedinId, setLoggedinId] = useState(null);
  const [roleId, setRoleId] = useState(null);
  const [reRenderCount, setReRenderCount] = useState(0); // 로그아웃하면 다시 그려야

  const asyncRoleCheck = async () => {
    const response = await axios.post(SAPIBase + `/getroleid?userId=${loggedinId}`);
    if (response.status === 200) {
      alert(`roleId 확인 성공! : ${response.data.roleId}`);
      setRoleId(response.data.roleId);
    } else {
      alert("roleId 확인 실패!");
    }
  }

  React.useEffect(() => {
    console.log(cookie.loggedinId);
    if (cookie.loggedinId !== undefined) {
      setLoggedinId(cookie.loggedinId);
    }

  }, [])

  React.useEffect(() => {
    if ((loggedinId !== null) && (loggedinId !== undefined)) {
      alert('roleId를 확인해야 함.');
      asyncRoleCheck().catch((e) => window.alert(`roleId 확인 중에 망함! ${e}`));
    }
  }, [loggedinId]);

  const logout = (event) => { // 마찬가지로 단순 쿠키 삭제!
    event.preventDefault();
    removeCookie('loggedinId', {path: '/'});
    setLoggedinId(null);
    setReRenderCount(reRenderCount + 1);
    window.location.href = `${window.location.href}`; // 리다이렉트
  }
  
  console.log(cookie);
  console.log('아이디');
  console.log(loggedinId);
  return (
    <CookiesProvider>
      <div>
        <Router>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navber-brand">
            <a href="https://sparcs.org" className="navbar-item">
              <img src="/Symbol_black.png" className="navbar-brand" style={{marginRight: '10px', marginBottom: '5px'}}/>
              <h1 className="title">Issue</h1>
            </a>
          </div>
          <div className="navbar-menu">
            <div className="navbar-item">
              <NavLink to="/" style={({isActive}) => {
                return isActive ? activeStyle : deactiveStyle;
              }}>홈</NavLink>
            </div>
            <div className="navbar-item">
              <NavLink to="/login" style={({isActive}) => {
                return isActive ? activeStyle : deactiveStyle;
              }}>로그인</NavLink>
            </div>
            <div className="navbar-item">
              <NavLink to="/join" style={({isActive}) => {
                return isActive ? activeStyle : deactiveStyle;
              }}>회원가입</NavLink>
            </div>
          </div>
          <div className='navbar-end'>
            <div className="navbar-item">
              <img src="public/Sample_User_Icon.png"></img>
              <p style={{marginRight: '10px', marginLeft: '10px', color: 'black'}}>{(loggedinId !== undefined) && (loggedinId !== null) ? loggedinId : "로그인해 주세요"}</p>
              <button className="button" style={(loggedinId === undefined) || (loggedinId === null) ? {display: 'none'} : {}} onClick={logout}>로그아웃</button>
            </div>
          </div>
        </nav>
        <div>
        
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/join" element={<JoinPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
          </Routes>
        </div>
        </Router>
      </div>
    </CookiesProvider>
  )

  // return (
  //   <>
  //     <p>환경변수 쓰기 - client: { process.env.TEST }</p>
  //     <div>
  //       <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank" rel="noreferrer">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App