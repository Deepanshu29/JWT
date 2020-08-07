const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/RegisterUser';
mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology:true});
const db = mongoose.connection;
db.on('connected',()=>{
    console.log('connected');
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const userModel = mongoose.model('loginUser',userSchema);

module.exports = userModel;