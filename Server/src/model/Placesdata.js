const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/final_project');
const Schema = mongoose.Schema

var NewPlacesSchema = new Schema({
    
    place : String,
    taluk : String,
    duration : String,
    note : String
});

module.exports= mongoose.model('Placesdata',NewPlacesSchema,'places')