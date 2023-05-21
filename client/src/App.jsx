import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import AuthPage from "./pages/auth";
import PageNotFound from "./pages/404";

import './App.css'

function App() {
  return (
    <div>
      <h1>Hello</h1>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
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
