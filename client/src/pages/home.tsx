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

const HomePage = (props) => {
  const [locFilter, setLocFilter] = useState({locFilter:'N10', locName:'교양분관'});
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [issueList, setIssueList] = useState([]);
  const [editIssueId, setEditIssueId] = useState(0);
  const [CUDCount, setCUDCount] = useState(0); // 리렌더링을 위해
  const [newIssueTitle, setNewIssueTitle] = useState('');
  const [newIssueStartTime, setNewIssueStartTime] = useState(null);
  const [newIssueEndTime, setNewIssueEndTime] = useState(null);
  const [newIssueContent, setNewIssueContent] = useState('');
  const [editIssueTitle, setEditIssueTitle] = useState('');
  const [editIssueStartTime, setEditIssueStartTime] = useState(null);
  const [editIssueEndTime, setEditIssueEndTime] = useState(null);
  const [editIssueContent, setEditIssueContent] = useState('');
  const [createModalClass, setCreateModalClass] = useState("modal");
  const [createFailModalClass, setCreateFailModalClass] = useState("modal");
  const [deleteModalClass, setDeleteModalClass] = useState("modal");
  const [deleteFailModalClass, setDeleteFailModalClass] = useState("modal");
  const [editModalClass, setEditModalClass] = useState("modal");
  const [editFailModalClass, setEditFailModalClass] = useState("modal");
  const [badReqModalClass, setBadReqModalClass] = useState("modal");
  const [badTimeModalClass, setBadTimeModalClass] = useState("modal");
  const [timeFilter, setTimeFilter] = useState(false);
  const roleId = props.roleId;

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
  const closeEditModal = (event) => {
    event.preventDefault();
    setEditModalClass('modal');
  }
  const closeEditFailModal = (event) => {
    event.preventDefault();
    setEditFailModalClass('modal');
  }
  const closeBadReqModal = (event) => {
    event.preventDefault();
    setBadReqModalClass('modal');
  }
  const closeBadTimeModal = (event) => {
    event.preventDefault();
    setBadTimeModalClass('modal');
  }

  const getIssues = (event) => {
    event.preventDefault();
    const asyncFun = async () => {
      const response = await axios.post(SAPIBase + '/getissuelist', 
        (timeFilter === false) ? {locFilter: {locationNum: locFilter.locFilter}} 
        : {locFilter: {AND:[ {locationNum: locFilter.locFilter}, {OR:[{endTime: {gte: new Date()}}, {endTime: new Date(0)}]} ] }});
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
      const response = await axios.post(SAPIBase + '/deleteissue', {deleteIssueId: deleteIssueId, userId: loggedinId, id: deleteIssueId});
      if (response.status === 200) {
        setDeleteModalClass('modal is-active');
      } else {
        setDeleteFailModalClass('modal is-active');
      }
      setCUDCount(CUDCount + 1);
    }
    asyncFun().catch((e) => {
      if (e.code === "ERR_BAD_REQUEST") {
        setBadReqModalClass('modal is-active');
      } else {
        window.alert(`AN ERROR OCCURED! ${e}`)
      }
    });
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
  
  
  const locNameList = Array.from( locMap.keys() )
  const dropdownList = locNameList.map((locName) => {
    return (<button className="dropdown-item button is-ghost" style={{color: 'black'}} onClick={() => setFilter(locName)}>
      {`${locName} ${locMap.get(locName)}`}
    </button>)
  });
  //console.log(Array.from( locMap.keys() ));
  
  useEffect(() => { // 지우거나 edit하면 새로 리스트 가져와서 리렌더링 하세요 (효율성은 안좋은 듯)
    const asyncFun = async () => {
      const response = await axios.post(SAPIBase + '/getissuelist', {locFilter: {locationNum: locFilter.locFilter}});
      if (response.status === 200) {
        console.log(response.data.issueList);
        setIssueList(response.data.issueList); // 이것까지는 제대로 들어옴
        //console.log(`issueList : ${issueList}`); 
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
      if (newIssueStartTime !== null && newIssueEndTime !== null && (newIssueStartTime > newIssueEndTime)) {
        setBadTimeModalClass('modal is-active');
        return;
      }
      const response = await axios.post(SAPIBase + '/createissue', {
        title: newIssueTitle, 
        content: newIssueContent, 
        startTime: newIssueStartTime, 
        endTime: newIssueEndTime, 
        locationNum: locFilter.locFilter,
        authorUserId: loggedinId,
        userId: loggedinId }); // middleware 위해 이름 맞춰서 더..
        if (response.status === 200) {
          setCUDCount(CUDCount + 1);
          setNewIssueTitle('');
          setNewIssueStartTime(null);
          setNewIssueEndTime(null);
          setNewIssueContent('');
          setCreateModalClass('modal is-active');
        } else {
          setCreateFailModalClass('modal is-active');
        }
        
      }
      asyncFun().catch((e) => {
        if (e.code === "ERR_BAD_REQUEST") {
          setBadReqModalClass('modal is-active');
        } else {
          window.alert(`AN ERROR OCCURED! ${e}`)
        }
      });
    }
    
    const editButton = (event, id) => {
      event.preventDefault();
      setEditIssueId(id);
    }

    const editIssue = ((event, issue) => {
      event.preventDefault();
      if (editIssueStartTime !== null && editIssueEndTime !== null && (editIssueStartTime > editIssueEndTime)) {
        setBadTimeModalClass('modal is-active');
        return;
      }
      const asyncFun = async () => {
        const response = await axios.post(SAPIBase + '/editissue', {
          title: editIssueTitle, 
          content: editIssueContent, 
          startTime: editIssueStartTime, 
          endTime: editIssueEndTime, 
          locationNum: locFilter.locFilter,
          authorUserId: issue.authorUserId,
          userId: loggedinId,
          id: issue.id }); // middleware 위해 이름 맞춰서 더..
          if (response.status === 200) {
            setCUDCount(CUDCount + 1);
            setEditIssueId(null);
            setEditIssueTitle('');
            setEditIssueStartTime(null);
            setEditIssueEndTime(null);
            setEditIssueContent('');
            setEditModalClass('modal is-active');
          } else {
            setEditFailModalClass('modal is-active');
          }
          
        
      }
      asyncFun().catch((e) => {
        if (e.code === "ERR_BAD_REQUEST") {
          setBadReqModalClass('modal is-active');
        } else {
          window.alert(`AN ERROR OCCURED! ${e}`)
        }
      });
    });

    const editCancel = (event) => {
      event.preventDefault();
      setEditIssueId(null);
      setEditIssueTitle('');
      setEditIssueStartTime(null);
      setEditIssueEndTime(null);
      setEditIssueContent('');
    }

    const toggleTimeFilter = () => {
      if (timeFilter) {
        setTimeFilter(false);
      } else {
        setTimeFilter(true);
      }
    }

    const cardList = issueList.map((issue) => (
      <div className="card" style={{marginTop:'5px', marginBottom:'5px'}}>
        <form onSubmit={(event) => editIssue(event, issue)}>
          <header className="card-header">
            <p className="card-header-title" style={issue.id !== editIssueId ? {} : {display: 'none'}}>
              {issue.title}
            </p>
            <input className='input' style={issue.id === editIssueId ? {} : {display: 'none'}} required aria-required="true" type='text' placeholder='issue 제목 수정' value={editIssueTitle} onChange={(e) => setEditIssueTitle(e.target.value)}></input>
          </header>
          <div className="card-content">
            <div className="content">
              <p>작성자 : {issue.authorUserId}</p>
              <p style={(issue.startTime === '1970-01-01T00:00:00.000Z') ||(issue.id === editIssueId)  ? {display: 'none'} : {} } >시작 시각 : {new Date(issue.startTime).toLocaleString()}</p>
              <div style={(issue.id !== editIssueId)  ? {display: 'none'} : {} }>
                <p>시작 시각 수정 : </p>
                <input className='input' type='datetime-local' value={editIssueStartTime} onChange={(e) => setEditIssueStartTime(e.target.value)} />
              </div>
              <p style={(issue.endTime === '1970-01-01T00:00:00.000Z') ||(issue.id === editIssueId) ? {display: 'none'} : {} } >종료 시각 : {new Date(issue.endTime).toLocaleString()}</p>
              <div style={(issue.id !== editIssueId)  ? {display: 'none'} : {} }>
                <p>종료 시각 수정 : </p>
                <input className='input' type='datetime-local' value={editIssueEndTime} onChange={(e) => setEditIssueEndTime(e.target.value)} />
              </div>
              <div style={(issue.id === editIssueId) ? {display: 'none'} : {} }>
                {issue.content}
              </div>
              <div style={(issue.id !== editIssueId) ? {display: 'none'} : {} }>
                <p className='content' style={{margin: '5px', marginBottom: '0px'}}>설명 : </p>
                <textarea className="textarea has-fixed-size"  required aria-required="true" placeholder="issue 설명 수정" value={editIssueContent} onChange={(e) => setEditIssueContent(e.target.value)}></textarea>
              </div>
            </div>
            <footer className="card-footer" style={((loggedinId === issue.authorUserId) && (roleId !== 2)) || (roleId === 3) ? {} : {display: 'none'}}>
              <button style={(issue.id === editIssueId) ? {marginTop: '7px', marginLeft:'5px', marginRight:'5px', display: 'none'} : {marginTop: '7px', marginLeft:'5px', marginRight:'5px'}} className="button" onClick={(event) => editButton(event, issue.id)}>수정</button>
              <button type="submit" style={(issue.id !== editIssueId) ? {marginTop: '7px', marginLeft:'5px', marginRight:'5px', display: 'none'} : {marginTop: '7px', marginLeft:'5px', marginRight:'5px'}} className="button is-primary">수정하기!</button>
              <button style={(issue.id === editIssueId) ? {marginTop: '7px', marginLeft:'5px', marginRight:'5px', display: 'none'} : {marginTop: '7px', marginLeft:'5px', marginRight:'5px'}} className="button" onClick={(event) => deleteIssue(event, issue.id)}>삭제</button>
              <button style={(issue.id !== editIssueId) ? {marginTop: '7px', marginLeft:'5px', marginRight:'5px', display: 'none'} : {marginTop: '7px', marginLeft:'5px', marginRight:'5px'}} className="button" onClick={(event) => editCancel(event)}>수정 취소</button>
            </footer>
          </div>
        </form>
      </div>
    ));
    
    //console.log(issueList);
  return (
    <CookiesProvider>
      <h2 className='message' style={roleId === 2 ? {textAlign:'center', color:'red', fontWeight:'bold'} : {display: 'none'}}>정지된 사용자입니다! issue 추가, 수정, 삭제가 불가능합니다.</h2>
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
              {/* 안에 콘텐츠들 : 나중에 DB에서 모든 장소의 locationNum 끌어와서 자동화할 수 있으면 좋을 듯 // map 함수 쓸랬는데 실패ㅠㅠ */}

              <div className="dropdown-content">
                {dropdownList}
              </div>

            </div>
          </div>
          <button type="button" className="button" onClick={getIssues}>리스트 가져오기</button>
          <br/>
          <span>
            &nbsp;&nbsp;
            <input type="checkbox" className="is-large" onClick = {toggleTimeFilter}/>
            &nbsp;&nbsp;종료 시각이 과거인 issue 제외하기
          </span>

          <div className="card" style={roleId === 1 || roleId === 3 ? {marginTop:'5px', marginBottom:'5px'} : {marginTop:'5px', marginBottom:'5px', display: 'none'}}>
            <form onSubmit={createIssue}>
              <header className="card-header">
                <p className='card-header-title'>issue 추가하기 : {`${locFilter.locFilter} ${locMap.get(locFilter.locFilter)}`}</p>
              </header>
              <span style={{marginBottom: '3px'}}>
                <p className='content' style={{margin: '5px', marginBottom: '0px'}} >제목</p>
                <input className='input'  required aria-required="true" type='text' placeholder='issue 제목' value={newIssueTitle} onChange={(e) => setNewIssueTitle(e.target.value)}></input>
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
        <div className={editModalClass} id='fail-modal'>
            <div className="modal-background"></div>
            <div className="modal-content">
              <div className='card'>
                <div className='card-content'>
                  issue가 수정되었습니다.
                </div>
                <footer className='modal-card-foot'>
                  <button className="button" aria-label="close" onClick={closeEditModal}>닫기</button>
                </footer>
              </div>
            </div>
          </div>
          <div className={editFailModalClass} id='fail-modal'>
            <div className="modal-background"></div>
            <div className="modal-content">
              <div className='card'>
                <div className='card-content'>
                  issue 수정에 실패했습니다.
                </div>
                <footer className='modal-card-foot'>
                  <button className="button" aria-label="close" onClick={closeEditFailModal}>닫기</button>
                </footer>
              </div>
            </div>
          </div>
          <div className={badReqModalClass} id='fail-modal'>
            <div className="modal-background"></div>
            <div className="modal-content">
              <div className='card'>
                <div className='card-content'>
                  잘못된 요청입니다.
                </div>
                <footer className='modal-card-foot'>
                  <button className="button" aria-label="close" onClick={closeBadReqModal}>닫기</button>
                </footer>
              </div>
            </div>
          </div>
          <div className={badTimeModalClass} id='fail-modal'>
            <div className="modal-background"></div>
            <div className="modal-content">
              <div className='card'>
                <div className='card-content'>
                  시작 시각이 종료 시각보다 뒤입니다.
                </div>
                <footer className='modal-card-foot'>
                  <button className="button" aria-label="close" onClick={closeBadTimeModal}>닫기</button> 
                </footer>
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