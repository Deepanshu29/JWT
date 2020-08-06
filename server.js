const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const path = require('path');
const cors = require('cors');
const api = require('./routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/angularAuth')));

app.use('/api', api);

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}/`);
})
