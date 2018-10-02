const express = require('express');
const bodyParser = require('body-parser');
const index = require('./controller/index');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));
app.use(bodyParser.json({ extended: false }));
index(app);



const sequelize = require('./database/db');
app.listen(3001);