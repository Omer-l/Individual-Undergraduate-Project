// app.js
const express = require('express')

// Create Express app
const app = express()

app.set('view engine', 'ejs');
//Routes
app.use('/', require('./routes/login'));
// A sample route
app.get('/', (req, res) => res.send('Hello World!'));

// Start the Express server
const PORT = 8080;
app.listen(PORT, () => console.log('Server running on port' + PORT));