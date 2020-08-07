const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/final_project');
const Schema = mongoose.Schema

const travelregSchema = new Schema({
    name:String,
    email:String, 
    phoneNo: Number,
    destination:String,
    address:String,
    dest_address:String,
    co_passengers:String,
    date:String,
    time:String,
    vehicleNo:String,
    vehicleType:String,
    driver_name:String,
    reason:String,
    token_no:String,
    approved:Boolean
    
});

module.exports= mongoose.model('Travel-reg-data',travelregSchema,'travelregdata')