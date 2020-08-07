const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/final_project');
const Schema = mongoose.Schema

const signupSchema = new Schema({
    name:String,
    username:String,
    phoneNo: Number,
    email:String,
    password: String,
    role:{
        type: String,
        default: 'user'
    }

    
});

module.exports= mongoose.model('Signupdata',signupSchema,'signupdata')