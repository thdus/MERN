const express = require("express");
const router = express.Router();
const board = require("../schemas/board"); // schema 폴더의 board.js를 변수에 넣어줌

router.post("/delete", async (req, res) => { //post 방식
    try {
        await Board.remove({ // board schema 삭제
            _id: req.body._id // id 값을 파라미터로 넘겨서 이 아이디 값을 가진 값을 삭제 하겠다.
        });
        res.json({ Message: true }); // 삭제 완료 후 json 데이터를 message라는 key값으로 넘겨줌
    } catch (err) { // 에러 발생시
        console.log(err); // console.log로 에러 찍어주고
        res.json({ message: false }); // json 데이터를 message key 값으로 false
    }
});

router.post("/update", async (req, res) => {
    try {
        await Board.update(
            { _id: req.body._id }, // axios에서 보내준 parameter들을 받아서 id 세팅
            {
                $set: {
                    writer: req.body.writer,
                    title: req.body.title,
                    content: req.body.content // 세가지 업데이트
                }
            }

        );
        res.json({ message: "게시글이 수정 되었습니다." }); // 업데이트 완료시 response json으로 메시지 넘겨줌
    } catch (err) { //catch해서 에러를 잡았을 땐 
        console.log(err); // log로 에러를 띄워주고
        res.json({ message: false }); // message값을 false로 넘겨줌
    }
});

    router.post("/write", async (req, res) => { //게시글 collection에 data를 넣는 작업
        try {
            const obj = { // insert할 데이터를 obj에 넣음
                writer: req.body._id,
                title: req.body.title,
                content: req.body.content
            };
            console.log(obj);
            const board = new Board(obj); // new Board로 스키마를 하나 만들어서 json 데이터 넣어줌
            await board.save(); // insert 실행, 저장
            res.json({ message: "게시글이 업로드 되었습니다."});
        } catch (err) {
            console.log(err);
            res.json({ message: false });
        }
    });

    router.post("/getBoardList", async (req, res) => { //게시글 목록 조회
        try {
            const _id = req.body._id;
            const board = await Board.find({ writer: _id}, // 로그인한 사람이 적은 글만 
                null, {
                sort: { createAt: -1 } //내림차순
            });
            res.json({ list: board }); // 조회성공하면 list라는 key값으로 board를 넣어서 보내줌
        } catch (err) { //오류가 떴을 때
            console.log(err); //console.log로 에러 출력 
            res.json({ message: false }); //response json 값을 false로 넘겨줌
        }
    });

    router.post("/detail", async (req, res) => {
        try {
            const _id = req.body._id; //id 값을 request 객체에서 가져와서 변수에 넣어주고
            const board = await Board.find({ _id }); // 이 id 값을 구분값으로 줘서
            res.json({ board }); //이 id 값이랑 일치하는 것을 보내주겠다 board라는 변수에 담아서 json data로 보냄
        } catch (err) {
            console.log(err);
            res.json({ message: false });
        }
    });
       
    module.exports = router;