const mongoose = require('mongoose');
require('dotenv').config();
const mongo_url = process.env.MONGO_URL;

mongoose.connect(mongo_url, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
});