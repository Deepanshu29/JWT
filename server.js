const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080; 
const api = require('./Routes&Models/routes/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.static(path.join(__dirname,'dist/auth/index.html')));
 
app.use('/api',api);

app.get('/', (req,res)=>{
    res.send('<h1>Hello Check</h1>');
})

app.listen(PORT, ()=>{
    console.log(`running server on http://localhost:${PORT}`)
});