import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from "react-router-dom";
import HomePage from "./pages/home";
import JoinPage from "./pages/join";
import PageNotFound from "./pages/404";

//import './App.css'
import './css/mystyles.css';

const activeStyle = {
  color: '#8A4D76',
  fontWeight: 'bold'
}

const deactiveStyle = {
  color: 'black',
  testDecoration: 'none'
}

function App() {
  return (
    <div>
      <Router>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navber-brand">
          <a href="https://sparcs.org" className="navbar-item">
            <img src="/Symbol_black.png" className="navbar-brand" />
            <h1 className="title">&nbsp;&nbsp;Issue</h1>
          </a>
        </div>
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
      </nav>
      <div>
      
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/join" element={<JoinPage/>}/>
        </Routes>
      </div>
      </Router>
    </div>
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
