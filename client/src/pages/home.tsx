import React from "react";
import { useState } from "react";
import axios from "axios";
import { SAPIBase } from '../tools/api';

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
  
  const cardList = issueList.map((issue) => (
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
  ))

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

  return (
    <div className="columns">
      <div className="column" style={{margin: '10px', padding: '10px'}}>
        <img src="/transparent_kaist_map.png"></img>
      </div>
      <div className="column">

        <div className="dropdown is-hoverable">
          <div className="dropdown-trigger">
            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3" onClick={toggleIsDropdownActive}>
              <span>건물 선택</span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu3" role="menu">
            {/* 안에 콘텐츠들 : 나중에 DB에서 모든 장소의 locationNum 끌어와서 자동화할 수 있으면 좋을 듯 */}

            <div className="dropdown-content">
              <button className="dropdown-item" onClick={() => setFilter('N10')}>
                N10 교양분관
              </button>
              <button className="dropdown-item" onClick={() => setFilter('N14')}>
                N14 사랑관
              </button>
            </div>

          </div>
        </div>
        <button type="button" className="button" onClick={getIssues}>리스트 가져와</button>
        <div>
          {cardList}
        </div>
      </div>
    </div>
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