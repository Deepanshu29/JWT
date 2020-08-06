const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/users';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.connection;
conn.on('connected', () => {
    console.log('connected');
});

const userSchema = mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
});

const model = mongoose.model('user', userSchema, 'users');
module.exports = model;