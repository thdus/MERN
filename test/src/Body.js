import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import LoginForm from './LoginForm';
import BoardForm from './BoardForm';
import BoardWriteForm from "./BoardWriteForm";
import BoardDetail from "./BoardDetail";
import $ from "jquery";
import "jquery.cookie";

class Body extends Component {
  render() {
    const isLoggedIn = $.cookie("login_id"); // 로그인 상태를 확인

    return (
      <Routes>
        {/* 조건부 라우팅: 로그인 상태에 따라 다른 컴포넌트를 보여줌 */}
        <Route path="/" element={isLoggedIn ? <BoardForm /> : <LoginForm />} />

        {/* 기타 라우트 */}
        <Route path="/boardwrite" element={<BoardWriteForm />} />
        <Route path="/board/detail" element={<BoardDetail />} />
      </Routes>
    );
  }
}

export default Body;
