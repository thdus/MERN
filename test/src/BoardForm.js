import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials : true };

class BoardRow extends Component {
    state = {
        board: []
    };

    getBoard = _id => {
        const send_param = {
            headers,
            _id
        };
        axios
            .post("http://localhost:8080/board/detail", send_param)
            //정상수행
            .then(returnData => {
                if (returnData.data.board[0]) {
                    const board = (
                        <Table striped bordered hover>
                            <thread>
                                <tr>
                                    <th>returnData.data.board[0].title</th>
                                </tr>
                            </thread>
                            <tbody></tbody>
                        </Table>
                    );
                    this.setState({
                        board: board
                    });
                } else {
                    alert("글 상세 조회 실패");
                }
            })
            //에러
            .catch(err => {
                console.log(err);
            });
    };
    //onClick={this.getBoard.bind(null, this.props._id)}
    render() {
        return (
            // 테이블로 나타내기 위해
            <tr> 
                <td>
                    <NavLink
                    to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
                    >
                        {this.props.createdAt.sustring(0, 10)}
                    </NavLink>
                </td>
                <td>
                    <NavLink
                        to={{ pathname: "/board/detail", query: {_id: this.props._id } }}
                        >
                            {this.props.title}
                        </NavLink>
                </td>
            </tr>
        );
    }
}

class BoardForm extends Component {
    state = {
        boardList: []
    };

    componentDidMount() { //랜더링 다 됐을 때 가져옴
        this.getBoardList();
    }

    getBoardList = () => {
        const sent_param = {
            headers,
            _id: $.cookie("login_id") // 쿠키값으로 아이디 가져와서 그 아이디 값에 해당하는 게시글 목록을 가져옴
        };
        axios
            .post("http://localhost:8080/board/getBoardList", send_param)
            .then(returnData => {
                if (returnData.data.list) {
                   // console.log(returnData.data.list.length);
                    const boards = returnData.data.list;
                    const boardList = boards.map(item => ( //map = 반복문을 돌려서 같은 형식을 반복해줌, for문을 돌리면 object로 인식하기 때문
                        <BoardRow
                            key={Data.now() + Math.random() * 500}
                            _id={item._id}
                            createdAt={item.createAt}
                            title={item.title}
                            ></BoardRow>
                    ));
                    // console.log(boardList);
                    this.setState({
                        boardList: boardList
                    });
                } else {
                    alert("글 목록 조회 실패");
                    window.location.reload(); //페이지 새로고침
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        const divStyle = {
            margin: 50
        };

        return (
            <div>
                <div style={divStyle}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>날짜</th>
                                <th>글 제목</th>
                            </tr>
                        </thead>
                        <tbody>{this.state.boardList}</tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default BoardForm;