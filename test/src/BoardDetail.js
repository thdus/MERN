import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true};

class BoardDetail extends Component {
    state = { //state:동적인 데이터를 다룰 때 사용하는 변수, 배열에 값을 넣어서 세팅
        board: []
    };

    componentDidMount() { //리액트에서 쓰는 생명주기에서 랜더링이 다 됐을 때 실행되는 함수
        if (this.props.location.query !== undefined) { //this.props.location으로 아까 받아왔던 parameter들을 넘겨줌(query로 이름을 지었던 parameter들)
            this.getDetail(); // undefined 아니면 this.getDetail에서 호출
        }   else {
            window.location.href = "/"; // 만약에 값이 undefined라면 홈페이지로 이동시키겠다(로그인이 안되있거나 풀렸거나하면 로그인하는 창으로 보냄)
        }
    }

    deleteBoard = _id => {
        const send_param = {
            headers, //Cors 설정으로 withCredential true 값으로 설정함
            _id
        };
            if(window.confirm("정말 삭제하시겠습니까?")){
                axios
                .post("http://localhost:8080/board/delete", send_param)
                //정상수행
                .then(returnData => {
                    alert("게시글이 삭제 되었습니다.");
                    window.location.href = "/";
                })
                //에러
                .catch(err => {
                    console.log(err);
                    alert("글 삭제 실패");
                });
            }
    };

    getDetail = () => {
        const send_param = {
            headers,
            _id: this.props.location.query._id //_id 값으로 글의 상세페이지 조회
        };
        axios
            .post("http://localhost:8080/board/detail", send_param) //axios를 통해서 post 방식으로 local8080 nodejs 서버 쪽으로 BoardDetail을 타서 parameter를 보내서 가져오겠다
            //정상수행 됐을 때 return data로 받아옴
            .then(returnData => {
                if (returnData.data.board[0]) { //리스트가 아니라 상세페이지이기 때문에 데이터 1개 밖에 없으므로 0
                    const board = ( //board 변수에 넣고
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>{returnData.data.board[0].title}</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td
                                            dangerouslySetInnerHTML={{ //태그를 이용해서 화면에 적용시키려 하고 있으므로 화면에 글자를 보여주는 처리, ckeditor 사용하므로 따로 처리해야함 
                                             __html: returnData.data.board[0].content
                                            }}
                                        ></td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div>
                            <NavLink
                                to={{ pathname: "/boardWrite", query: { title: returnData.data.board[0].title, conent: returnData.data.board[0].content, _id: this.props.location.query._id}}}
                            >
                                <Button>글 수정</Button>
                            </NavLink>
                            <Button
                                onClick={this.deleteBoard.bind(
                                    null,
                                    this.props.location.query._id
                                )}
                            >
                                글삭제
                            </Button>
                        </div>
                    </div>
                );
                this.setState({
                    board: board
                });
            } else {
                alert("글 상세 조회 실패");
            }
        })//에러
        .catch(err => {
            console.log(err);
        });
    };

//onClick={this.getBoard.bind(null, this.props._id)}
    render() {
        const divStyle = {
            margin: 50
        };
        return <div style={divStyle}>{this.state.board}</div>; //this.state.board에 테이블이 들어감
    }
}

export default BoardDetail;