const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/api/account', require('./routes/AccountRouter'));
app.use('/api/subscription', require('./routes/SubscriptionRouter'));

app.listen(process.env.port || 8000, () => console.log("server started..."));
