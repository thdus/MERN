import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import {HashRouter} from 'react-router-dom';


 ReactDOM.render(
    <HashRouter>
        <Header/>
        <Body/>
        <Footer/>
    </HashRouter>,
  document.querySelector("#container")
 );