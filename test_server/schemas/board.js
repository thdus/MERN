const mongoose = require("mongoose"); // mongoose 모듈 가져와서

const { Schema } = mongoose; // schema 가져와서
const {
    Types: { ObjectId } // objectId 모듈 가져와서 types 세팅
} = Schema;
const boardSchema = new Schema({
    writer: { //User 참고해서 사용(외래키를 사용해는 필드 )
        type: ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Board", boardSchema);