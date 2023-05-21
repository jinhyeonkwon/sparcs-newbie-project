import React from "react";
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


  return (
    <div className="columns">
      <div className="column" style={{padding: '10px'}}>
        <img src="/transparent_kaist_map.png"></img>
      </div>
      <div className="column">
        First column
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