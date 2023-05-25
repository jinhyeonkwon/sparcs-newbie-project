import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { SAPIBase } from '../tools/api';
import { CookiesProvider, useCookies } from 'react-cookie';
import parse from 'postgres-date';

import '../css/mystyles.css';

const paddingTen = {
  padding: '10px'
}

interface IAPIResponse {
  id: number;
  authorId: number;
  locationId: number;
  title: string;
  content: string;
}

const HomePage = () => {
  const [locFilter, setLocFilter] = useState({locFilter:'N10', locName:'교양분관'});
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [issueList, setIssueList] = useState([]);
  const [editIssueId, setEditIssueId] = useState(0);
  const [CUDCount, setCUDCount] = useState(0); // 리렌더링을 위해
  const [newIssueTitle, setnewIssueTitle] = useState('');
  const [newIssueStartTime, setNewIssueStartTime] = useState(null);
  const [newIssueEndTime, setNewIssueEndTime] = useState(null);
  const [newIssueContent, setNewIssueContent] = useState('');
  const [createModalClass, setCreateModalClass] = useState("modal");
  const [createFailModalClass, setCreateFailModalClass] = useState("modal");
  const [deleteModalClass, setDeleteModalClass] = useState("modal");
  const [deleteFailModalClass, setDeleteFailModalClass] = useState("modal");

  // 아이디 쿠키 ------
  const [cookie, setCookie, removeCookie] = useCookies(['loggedinId', 'roleId']);
  const [loggedinId, setLoggedinId] = useState('');

  React.useEffect(() => {
    console.log(cookie.loggedinId);
    if (cookie.loggedinId !== undefined) {
      setLoggedinId(cookie.loggedinId);
    }
  }, [])
  // -----------------

  const locMap = new Map();
  locMap.set('N19', '아름관');
  locMap.set('N16', '소망관');
  locMap.set('N14', '사랑관');
  locMap.set('N17', '성실관');
  locMap.set('N18', '진리관');
  locMap.set('N20', '신뢰관');
  locMap.set('N21', '지혜관');
  locMap.set('W6', '미르/나래관');
  locMap.set('W4-4', '희망관');
  locMap.set('W4-3', '다솜관');
  locMap.set('E8', '세종관');
  locMap.set('N11', '카이마루');
  locMap.set('N10', '교양분관');
  locMap.set('N12', '학사 학생회관');
  locMap.set('N13', '태울관');
  locMap.set('N13-1', '장영신학생회관');
  locMap.set('N3', '류근철 스포츠컴플렉스');
  locMap.set('N4', '디지털인문사회과학부동');
  locMap.set('N2', '행정분관');
  locMap.set('N1', '김병호 김삼열 IT융합빌딩');
  locMap.set('N6', '교수회관');
  locMap.set('E11', '창의학습관');
  locMap.set('E6-5', '궁리실험관');
  locMap.set('W8', '교육지원동');
  locMap.set('E9', '학술문화관');
  locMap.set('E21', 'KAIST 클리닉');
  locMap.set('E17', '원운동장');
  locMap.set('E0-1', '오리연못'); // 건물번호 없는 건 임의로 0-1, 0-2, ... 할 거임
  locMap.set('E11', '창의학습관');
  locMap.set('W2', '서측 학생회관');
  locMap.set('E5', '교직원회관');

  
  const locNumList = ['N19', 'N16', 'N14', 'N17', 'N18', 'N20', 'N21', 'W6', 'W4-4', 'W4-3', ];
  
  const closeCreateModal = (event) => {
    event.preventDefault();
    setCreateModalClass('modal');
  }
  const closeCreateFailModal = (event) => {
    event.preventDefault();
    setCreateFailModalClass('modal');
  }
  const closeDeleteModal = (event) => {
    event.preventDefault();
    setDeleteModalClass('modal');
  }
  const closeDeleteFailModal = (event) => {
    event.preventDefault();
    setDeleteFailModalClass('modal');
  }

  const getIssues = (event) => {
    event.preventDefault();
    const asyncFun = async () => {
      const response = await axios.post(SAPIBase + '/getissuelist', {locFilter: {locationNum: locFilter.locFilter}});
      if (response.status === 200) {
        alert("issue 가져오기 성공!");
        console.log(response.data.issueList);
        setIssueList(response.data.issueList); // 이것까지는 제대로 들어옴
        console.log(`issueList : ${issueList}`); 
      } else {
        alert("issue 가져오기 실패!");
      }
    }
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  }
  
  const setFilter = (locNum) => {
    setLocFilter({locFilter:locNum, locName:locMap.get(locNum)});
    console.log(`setFilter(${locNum})`);
  }

  const toggleIsDropdownActive = () => {
    if (isDropdownActive) {
      setIsDropdownActive(false);
    } else {
      setIsDropdownActive(true);
    }
    console.log("toggled");
  }

  const deleteIssue = (event, deleteIssueId) => {
    event.preventDefault();
    //alert(`delete 눌림 : ${deleteIssueId}`);
    const asyncFun = async () => {
      const response = await axios.post(SAPIBase + '/deleteissue', {deleteIssueId: deleteIssueId});
      if (response.status === 200) {
        setDeleteModalClass('modal is-active');
      } else {
        setDeleteFailModalClass('modal is-active');
      }
      setCUDCount(CUDCount + 1);
    }
    asyncFun().catch((e) => setDeleteFailModalClass('modal is-active'));
  }

  const issueCard = (issue) => {
    <div className="card" style={{marginTop:'5px', marginBottom:'5px'}}>
      <header className="card-header">
        <p className="card-header-title">
          {issue.title}
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          작성자 : {issue.authorUserId}
          <hr></hr>
          {issue.content}
        </div>
        <hr/>
        <div className="content">
          
        </div>
        <footer className="card-footer">
          <button style={{marginLeft:'5px', marginRight:'5px'}} className="button card-footer-item">Edit</button>
          <button style={{marginLeft:'5px', marginRight:'5px'}} className="button card-footer-item">Delete</button>
        </footer>
      </div>
    </div>
  }
  
  const cardList = issueList.map((issue) => (
    <div className="card" style={{marginTop:'5px', marginBottom:'5px'}}>
      <header className="card-header">
        <p className="card-header-title">
          {issue.title}
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          <p>작성자 : {issue.authorUserId}</p>
          <p style={issue.startTime === '1970-01-01T00:00:00.000Z' ? {display: 'none'} : {} } >시작 시각 : {new Date(issue.startTime).toLocaleString()}</p>
          {/* postgres 시간을 js 형식으로 바꿔야 함. 지금은 1970년으로 뜸 */}
          <p style={issue.endTime === '1970-01-01T00:00:00.000Z' ? {display: 'none'} : {} } >종료 시각 : {new Date(issue.endTime).toLocaleString()}</p>
          <hr></hr>
          {issue.content}
        </div>
        <hr/>
        <div className="content">
          
        </div>
        <footer className="card-footer">
          <button style={{marginLeft:'5px', marginRight:'5px'}} className="button card-footer-item">Edit</button>
          <button style={(loggedinId === issue.authorUserId) ? {marginLeft:'5px', marginRight:'5px'} : {marginLeft:'5px', marginRight:'5px', display: 'none'}} className="button card-footer-item" onClick={(event) => deleteIssue(event, issue.id)}>Delete</button>
        </footer>
      </div>
    </div>
  ));
  
  const locNameList = Array.from( locMap.keys() )
  const dropdownList = locNameList.map((locName) => {
    <button className="dropdown-item button is-ghost" style={{color: 'black'}} onClick={() => setFilter('N10')}>
      {`${locName} ${locMap.get(locName)}`}
    </button>
  });
  //console.log(Array.from( locMap.keys() ));
  
  useEffect(() => { // 지우거나 edit하면 새로 리스트 가져와서 리렌더링 하세요 (효율성은 안좋은 듯)
    const asyncFun = async () => {
      const response = await axios.post(SAPIBase + '/getissuelist', {locFilter: {locationNum: locFilter.locFilter}});
      if (response.status === 200) {
        console.log(response.data.issueList);
        setIssueList(response.data.issueList); // 이것까지는 제대로 들어옴
        console.log(`issueList : ${issueList}`); 
      } else {
      }
    }
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  }, [CUDCount]);

  // const asyncFun = async () => {
  //   const response = await axios.post(SAPIBase + '/home/getlocnumlist');
  //   console.log(response.data);
  // }
  // asyncFun();

  // React.useEffect(() => {
  //   const asyncFun = async () => {
  //     const { data } = await axios.post(SAPIBase + 'home/getloclist', {locationNum: locFilter});
      
  //   }
  // }, [locFilter])

  const createIssue = (event) => {
    event.preventDefault();
    const asyncFun = async () => {
      const response = await axios.post(SAPIBase + '/createissue', {
        title: newIssueTitle, 
        content: newIssueContent, 
        startTime: newIssueStartTime, 
        endTime: newIssueEndTime, 
        locationNum: locFilter.locFilter,
        authorUserId: loggedinId });
      if (response.status === 200) {
        setCUDCount(CUDCount + 1);
        setnewIssueTitle('');
        setNewIssueStartTime(null);
        setNewIssueEndTime(null);
        setNewIssueContent('');
        setCreateModalClass('modal is-active');
      } else {
        setCreateFailModalClass('modal is-active');
      }
      
    }
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  }

  console.log(issueList);
  return (
    <CookiesProvider>
      <div className="columns">
        <div className="column" style={{margin: '10px', marginBottom: '20px', padding: '10px'}}>
          <img src="/transparent_kaist_map.png"></img>
        </div>
        <div className="column">

          <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
              <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3" onClick={toggleIsDropdownActive}>
                <span>{`${locFilter.locFilter} ${locMap.get(locFilter.locFilter)}`}</span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu3" role="menu">
              {/* 안에 콘텐츠들 : 나중에 DB에서 모든 장소의 locationNum 끌어와서 자동화할 수 있으면 좋을 듯 */}

              <div className="dropdown-content">
                <button className="dropdown-item button is-ghost" style={{color: 'black'}} onClick={() => setFilter('N10')}>
                  {`N10 ${locMap.get('N10')}`}
                </button>
                <button className="dropdown-item button is-ghost" style={{color: 'black'}} onClick={() => setFilter('N14')}>
                  {`N14 ${locMap.get('N14')}`}
                </button>
              </div>

            </div>
          </div>
          <button type="button" className="button" onClick={getIssues}>리스트 가져오기</button>

          <div className="card" style={{marginTop:'5px', marginBottom:'5px'}}>
            <form onSubmit={createIssue}>
              <header className="card-header">
                <p className='card-header-title'>issue 추가하기 : {`${locFilter.locFilter} ${locMap.get(locFilter.locFilter)}`}</p>
              </header>
              <span style={{marginBottom: '3px'}}>
                <p className='content' style={{margin: '5px', marginBottom: '0px'}} >제목</p>
                <input className='input'  required aria-required="true" type='text' placeholder='issue 제목' value={newIssueTitle} onChange={(e) => setnewIssueTitle(e.target.value)}></input>
              </span>
              <span style={{marginBottom: '3px'}}>
                <p className='content' style={{margin: '5px', marginBottom: '0px'}}>시작 시각 (선택)</p>
                <input className='input' type='datetime-local' value={newIssueStartTime} onChange={(e) => setNewIssueStartTime(e.target.value)} />
              </span>
              <span style={{marginBottom: '3px'}}>
                <p className='content' style={{margin: '5px', marginBottom: '0px'}}>종료 시각 (선택)</p>
                <input className='input' type='datetime-local' value={newIssueEndTime} onChange={(e) => setNewIssueEndTime(e.target.value)} />
              </span>
              <span style={{marginBottom: '3px'}}>
              <p className='content' style={{margin: '5px', marginBottom: '0px'}}>설명</p>
                <textarea className="textarea has-fixed-size"  required aria-required="true" placeholder="issue 설명" value={newIssueContent} onChange={(e) => setNewIssueContent(e.target.value)}></textarea>
              </span>
              <button type="submit" className='button is-primary' style={{margin: '10px'}}>issue 추가</button>
            </form>
          </div>


          <div>
            {cardList}
          </div>
          { /* modal */ }
          <div className={createModalClass} id='fail-modal'>
            <div className="modal-background"></div>
            <div className="modal-content">
              <div className='card'>
                <div className='card-content'>
                  issue가 추가되었습니다.
                </div>
                <footer className='modal-card-foot'>
                  <button className="button" aria-label="close" onClick={closeCreateModal}>닫기</button>
                </footer>
              </div>
            </div>
          </div>
          <div className={createFailModalClass} id='fail-modal'>
            <div className="modal-background"></div>
            <div className="modal-content">
              <div className='card'>
                <div className='card-content'>
                  issue 추가에 실패했습니다.
                </div>
                <footer className='modal-card-foot'>
                  <button className="button" aria-label="close" onClick={closeCreateFailModal}>닫기</button>
                </footer>
              </div>
            </div>
          </div>
        </div>
        <div className={deleteModalClass} id='fail-modal'>
            <div className="modal-background"></div>
            <div className="modal-content">
              <div className='card'>
                <div className='card-content'>
                  issue가 삭제되었습니다.
                </div>
                <footer className='modal-card-foot'>
                  <button className="button" aria-label="close" onClick={closeDeleteModal}>닫기</button>
                </footer>
              </div>
            </div>
          </div>
          <div className={deleteFailModalClass} id='fail-modal'>
            <div className="modal-background"></div>
            <div className="modal-content">
              <div className='card'>
                <div className='card-content'>
                  issue 삭제에 실패했습니다.
                </div>
                <footer className='modal-card-foot'>
                  <button className="button" aria-label="close" onClick={closeDeleteFailModal}>닫기</button>
                </footer>
              </div>
            </div>
          </div>
        </div>
        
    </CookiesProvider>
  )
  // return (
  // <section className="section">
  //   <div className="container">
  //     <h1 className="title">
  //       Hello World
  //     </h1>
  //     <button className="button is-primary">
  //       버튼을 만들어보자
  //     </button>
  //     <span className="bulma-arrow-mixin"></span>
  //     <p className="subtitle">
  //       My first website with <strong>Bulma</strong>!
  //     </p>
  //   </div>
  // </section>

  // )
}

export default HomePage;