import React, { Component } from "react";
import { CKEditor } from "ckeditor4-react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardWriteForm extends Component {
    state = {
        data: ""
    };

    componentDidMount() { //랜더링이 다 됐을 때 데이터 셋팅, CKEditor 공식 문서 참조
        if (this.props.location.query !== undefined  && this.props.location !== undefined) {
            this.boardTitle.value = this.props.location.query.title;
            this.setState({
                data : this.props.location.query.content
            });
        }
    }

    writeBoard = () => {

        let url;
        let send_param;

        if (this.props.location.query !== undefined) { //undefined가 아니면 update
            send_param = {
                headers,
                _id : this.props.location.query._id,
                writer: $.cookie("login_id"),
                title : this.boardTitle.value,
                content: this.state.data
            };
            url = "http://localhost:8080/board/update";
        }else{ //아니면 write
            send_param = {
                headers,
                _id: $.cookie("login_id"),
                title: this.boardTitle.value,
                content: this.state.data
            };
            url = "http://localhost:8080/board/write";
        }

        axios
            .post(url, send_param)
            //정상 수행
            .then(returnData => {
                if (returnData.data.message) {
                    alert(returnData.data.message); //메시지 있으면 출력
                    window.location.href = "/";
                } else {
                    alert("글쓰기 실패");
                }
            })
            //에러
            .catch(err => {
                console.log(err);
            });
    };

    onEditorChange = evt => {
        this.setState({
            data: evt.editor.getData()
        });
    };

    render() {
        const divStyle = {
            margin: 50
        };
        return (
            <div style={divStyle} className="App">
                <h2>글쓰기 {this.props._id}</h2>
                <Form.Control
                    type="text"
                    placeholder="글 제목"
                    ref={ref => (this.boardTitle = ref)}
                />
                <CKEditor
                    data={this.state.data}
                    onchange={this.onEditorChange} // CKEditor 사이트에서 코드 복사
                ></CKEditor> 
                <Button onClick={this.writeBoard}>저장하기</Button>
            </div>
        );
    }
}

export default BoardWriteForm;