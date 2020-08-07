const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/RegisterUser';
mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology:true});
const db = mongoose.connection;
db.on('connected',()=>{
    console.log('connected');
});

const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    uname: String,
    email: String,
    password: String
});

const userModel = mongoose.model('RegisterUser',userSchema);

module.exports = userModel;