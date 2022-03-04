// app.js
const express = require('express');
// Create Express app
const app = express();
// API Keys
const dotenv = require('dotenv');
//MongoDB
const mongoose = require("mongoose");
dotenv.config();

const database = process.env.MONGOLAB_URI;
mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('e don connect'))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');
//Routes
app.use('/', require('./routes/login'));
// A sample route
app.get('/', (req, res) => res.send('Hello World!'));

// Start the Express server
const PORT = 8080;
app.listen(PORT, () => console.log('Server running on port ' + PORT));