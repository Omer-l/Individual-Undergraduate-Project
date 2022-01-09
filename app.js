//Import the express and body-parser modules, mysql module
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

//Create express app and configure it with body-parser
const app = express();
app.use(bodyParser.json());

//Set up express to serve static files from the directory called 'public'
app.use(express.static('public')); //use public folder to load files
app.use('/css', express.static('node_modules/bootstrap/dist/css')); //bootstrap css
app.use('/js', express.static('node_modules/bootstrap/dist/js')); //boostrap js
app.use('/js', express.static('node_modules/jquery/dist')); //jquery

//Data structure that will be accessed using the web service
let todoArray = [];

//Set up application to handle GET requests sent to the task path
// app.get('/todo/*', handleGetRequest);//Returns task with specified ID
// app.get('/todo', handleGetRequest);//Returns all tasks

//set up application to handle DELETE requests sent to the task path
// app.delete('/todo', handleDeleteRequest);
//
//Set up application to handle POST requests sent to the task path
// app.post('/todo', handlePostRequest);//Adds a newtask

//Start the app listening on port 8080
app.listen(8080);

//Create a connection pool with the task details
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "todo",
    debug: false
});

const fs = require('fs'),
    PDFParser = require("pdf2json");

const pdfParser = new PDFParser(this,1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFile("text.txt", pdfParser.getRawTextContent(), ()=>{console.log("Done.");});
});

pdfParser.loadPDF("C:\\Users\\omerk\\University\\Individual-Undergraduate-Project\\public\\sample.pdf");