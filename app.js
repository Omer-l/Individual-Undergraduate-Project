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
// to get registration form
app.post('/register/*', registerUser);
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
    password: "root",
    database: "eye_tracking_pdf_reader",
    debug: false
});

//Handles POST requests to our web service
function registerUser(request, response) {

    //Output the data sent to the server
    let details = request.body
    console.log("Data received: " + JSON.stringify(details));

    //Finish off the interaction.
    response.send("User added successfully.");

    console.log("username: " + details.username + " ... password: " + details.password);
    //Build query
    let sql = "INSERT INTO user_details (username, password) "
        + " VALUES ("//unique id for task
        + "\"" + details.username //task details
        + "\", \"" + details.password + "\"" //date
        + ");";
    console.log(sql);
    // Execute query and output results
    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
        }
        else {
            console.log(JSON.stringify(result));
        }
    });

}