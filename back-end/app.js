const express = require('express');
const bodyParser = require('body-parser');
const index = require('./controller/index');
const app = express();


app.use(bodyParser.json({ extended: false }));
index(app);



const sequelize = require('./database/db');
app.listen(3001);