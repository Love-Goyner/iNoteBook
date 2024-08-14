const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/iNoteBook";

const connectTOMongo = ()=>{
    mongoose.connect(mongoURI)
    console.log("connected to the mongoos");
}

module.exports = connectTOMongo;