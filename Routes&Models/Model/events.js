const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/RegisterUser';
mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology:true});
const db = mongoose.connection;
db.on('connected',()=>{
    console.log('connected');
});

const eventSchema = new mongoose.Schema({
    EventDate: Date,
    EventName: String,
    EventDesc: String
});

const eventModel = mongoose.model('events',eventSchema);

module.exports = eventModel;