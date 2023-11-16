const express = require("express") //nodejs 서버를 만들기 위한 express 프레임워크 
const app = express(); //express 모듈 이 함수로 실행, app이라는 변수에 넣어줌
const cors = require("cors"); //동일 기원(주소)가 아니더라도 붙을 수 있게(여기서는 3000번 대신 8080)
const session = require("express-session");
const connect = require("./schemas") // mongoose connect로 선언

connect(); // connet 함수 호출

const corsOptions = { //다른 기원이라도 서버에 접속 가능
    origin: true, //origin이 기원
    credentials: true
};

app.use( // app.use로 쿠키와 세션 세팅
    session({
        resave: false,
        saveUninitialized: true,
        secret: "soyeon",
        cookie: {
            httpOnly: true, // https 불가
            secure: false
        }
    })
);

app.use(cors(corsOptions));

app.use(express.json()); //express에서 json함수 호출
app.use(express.urlencoded({ extended: true })); //배열을 잘 받아오기 위해

app.get('/', (req, res) => {
    res.send('Welcome to the server!');
  });
  
app.use("/member", require("./routes/memberRouter"))//server.js에서 전부 다 하기에는 가독성이 없어서 라우터로 분리
app.use("/board", require("./routes/boardRouter"))

app.listen(8080, () => { //8080으로 서버 대기
    console.log("listen umm..umm..um..");
});