import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie"; //새로고침
axios.defaults.withCredentials = true; //node.js 서버와 동일 기원이어야함(localhost:3000같아야함)
const headers = { withCredentials: true }; //headers에 넘겨줌

class LoginForm extends Component { //component를 상속받은 class
  
join =() => {
    const send_param = { //send_param으로 묶어서
      headers, //통신할 때마다 headers 넘겨주기
      email: this.joinEmail.value, //email이라는 key 값에 넣어준다
      name: this.joinName.value,
      password: this.joinPw.value
    };
    axios
      .post("http://localhost:8080/member/join", send_param) //서버 주소를 호출해서 parameter를 넘겨주고(비동기(페이지이동x))
      //정상 수행됐을 때 then
      .then(returnData => {
        if (returnData.data.message) { //return data에 바로 안보내고 returnData의 data에 보내줌
          alert(returnData.data.message);
    
        } else {
          alert("회원가입 실패");
        }
      })
      //에러
      .catch(err => {
        console.log(err);
      });
  };
  login = () => {//로그인도 비슷
 

    const send_param = { //이메일과 pw넣어주고
      headers, //cors 설정하는 속성들 넘겨줌
      email: this.loginEmail.value, 
      password: this.loginPw.value
    };
    axios
      .post("http://localhost:8080/member/login", send_param)//axios로 send_param을 파라미터로 넘겨주고, 다른주소
      //정상 수행
      .then(returnData => {
        if (returnData.data.message) {
          // console.log("login_id:" + returnData.data._id); 정보노출이 있기 때문에 console창은 안 띄우는 게 좋다고 함
          $.cookie("login_id", returnData.data._id);// 대신 받아온 아이디로 쿠키 세팅
          
          alert(returnData.data.message); //로그인 처리되면 메시지 띄워줌
          window.location.reload(); //페이지 새로고침(로그인이 된 상태의 페이지)
        } else {
          alert("로그인 실패");
        }
      })
      //에러
      .catch(err => {
        console.log(err);
      });
  };
  render() { //react에서는 style을 입힐 때 render 안에서 입힘
    const formStyle = {
      margin: 50
    };
    const buttonStyle = {
      marginTop: 10
    };

    return ( //이런식으로, 부트스트랩 이용
       <Form style={formStyle}>
        <Form.Group controlId="joinEmailGroup">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            id="joinEmail"
            ref={ref => (this.joinEmail = ref)} //reference(리액트에서는 이런식으로 아이디 값을 부여)
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          </Form.Group>
          <Form.Group controlId="joinNameGroup">
            <Form.Label>Name</Form.Label>
            <Form.Control
             type="text"
             id="joinName"
             maxLength="20"
             ref={ref => (this.joinName = ref)}
             placeholder="Name"
            />
          </Form.Group>

          <Form.Group controlId="joinPasswordGroup">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="joinPassword"
              maxLength="64"
              ref={ref => (this.joinPw = ref)}
              placeholder="Password"
            />
          </Form.Group>
          <Button
            style={buttonStyle}
            onClick={this.join} //click 할 때 마다 join을 호출하겠다
            variant="primary" //파란색
            type="button"
            block //버튼을 끝까지 길게
          >
            회원가입
          </Button>
      

          <Form.Group controlId="loginEmailGroup">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              id="loginEmail"
              maxLength="100"
              ref={ref => (this.loginEmail = ref)}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group controlId="loginPasswordGroup">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="loginPassword"
              maxLength="20"
              ref={ref => (this.loginPw = ref)}
              placeholder="Password"
            />
          <Button
            style={buttonStyle}
            onClick={this.login}// click 할 때 마다 login 호출
            variant="primary" 
            type="button"
            block 
          >
            로그인
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

export default LoginForm;