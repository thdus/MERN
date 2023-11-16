const mongoose = require("mongoose"); // mongoose 모듈을 require해서 변수에 담아놓고

const { Schema } = mongoose; // mongoose안에 있는 schema를 가져와서 
const userSchema = new Schema({ // 새로운 schema 선언
    email: {
        type: String,
        required: true, // required 필수적으로 이 값을 받겠다
        unique: true // unique는 고유한 값
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now //기본값으로 현재시간
    }
});

module.exports = mongoose.model("User", userSchema); // 모델로 설정해서 외부로 내보냄