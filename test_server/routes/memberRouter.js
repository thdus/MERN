const express = require("express"); // express require
const router = express.Router(); // express router로 router 함수 실행해서 router라는 변수에 담아주고
const User = require("../schemas/user");

//회원가입
router.post("/join", async (req, res) => { // router post로 url 세팅하고 request response로 받아온 parameter들 사용
    try{
        const obj = { //post 방식은 body 쪽에 parameter를 넘겨줌
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        };
        const user = new User(obj);
        await user.save(); //mongo db에 insert
        res.json({ message: "회원가입 되었습니다!" });
    }   catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

//로그인
router.post("/login", async (req, res) => {
    try {
        const obj = {
            email: req.body.email,
            password: req.body.password
        };
        const user = await User.find(obj); // email과 password가 일치하면 가져온다
        console.log(user[0]);
        if (user[0]) { //배열로 가져오고 email과 password가 같은 사람은 어짜피 1명 밖에 없다
            console.log(req.body._id);
            res.json({ message: "로그인 되었습니다!", _id: user[0]._id }); //id값으로 쿠키를 세팅하기 때문에 id값 필요
        }   else {
            res.json({ message: false }); //user data를 id와 password로 찾아서 가져오는데 없을 수 있으므로 else 한 번 더
        }
    }   catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

module.exports = router; // router 내보내기