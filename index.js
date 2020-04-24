const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

// app.use('/api/accounts', require('./routes/AccountRouter'));

app.listen(process.env.port || 8000, () => console.log("server started..."));
