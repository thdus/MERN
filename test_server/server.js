const express = require("express") //nodejs 서버를 만들기 위한 express 프레임워크 
const app = express(); //express 모듈 이 함수로 실행, app이라는 변수에 넣어줌
const cors = require("cors");
const session = require("express-session");
const connect = require("./schemas")

connect();

const corsOptions = {
    origin: true,
    credentials: true
};

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: "soyeon",
        cookie: {
            httpOnly: true,
            secure: false
        }
    })
);

app.use(cors(corsOptions));

app.use(express.json()); //express에서 json함수 호출
app.use(express.urlencoded({ extended: true })); //배열을 잘 받아오기 위해

app.use("/member", require("./routes/memberRouter"))//server.js에서 전부 다 하기에는 가독성이 없어서 라우터로 분리
app.use("/board", require("routes/boardRouter"))

app.listen(8080, () => {
    console.log("listen umm..umm..un..");
});