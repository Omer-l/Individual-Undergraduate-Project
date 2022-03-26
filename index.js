//Import the express, body-parser and express-session modules
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const __rootdir = path.resolve("./");
const pdfUtil = require('pdf-to-text');

//Create express app and configure it with body-parser
const app = express();
app.use(bodyParser.json());
//to use the file upload module
app.use(fileUpload());
//to use public folder
app.use(express.static('public')); //public folder to load files
//Configure express to use express-session
app.use(
    expressSession({
        secret: 'cst2120 secret',
        // cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: true
    })
);

//Array that will store data about the users.
//This is only an example - a database would be used for this in real code
let userArray = [];

//Set up application to handle GET requests
app.get('/users', getUsers);//Returns all users
app.get('/checklogin', checklogin);//Checks to see if user is logged in.
app.get('/logout', logout);//Logs user out
app.get('/userpdfs', getUserPdfs);//Getting all of a user PDF names

//Set up application to handle POST requests
app.post('/login', login);//Logs the user in
app.post('/register', register);//Register a new user
app.post('/upload', uploadPdf);//For file uploading
app.post('/loadpdf', loadPdf); //loads PDF content to front end
app.post('/removepdf', removePdf); //Removes PDF from signed in user's assigned directory


//Start the app listening on port 8080
app.listen(8080);
console.log("Listening on port 8080");

//Create a connection pool with the task details
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "fyp",
    debug: false
});

/** GET /users. Returns all the users. */
function getUsers(request, response) {
    response.send(userArray);
}

/** GET /checklogin. Checks to see if the user has logged in */
function checklogin(request, response) {
    if (!("username" in request.session))
        response.send('{"login": false}');
    else {
        let username = request.session.username;
        let preferences = JSON.stringify(request.session.preferences);
        let message = '{"login":true, "username":"' + username + '", "preferences":' + preferences + '}';
        response.send(message);
    }
}

/** GET /logout. Logs the user out. */
function logout(request, response) {
    //Destroy session.
    request.session.destroy(err => {
        if (err)
            response.send('{"error": ' + JSON.stringify(err) + '}');
        else
            response.send('{"login":false}');
    });
}

/** POST /login. Checks the user's name and password. Logs them in if they match
 Expects a JavaScript object in the body:
 {name: "user name", password: "user password"} */
function login(request, response) {
    let usrlogin = request.body;
    console.log("Data received: " + JSON.stringify(usrlogin));
    let name = usrlogin.name;
    let password = usrlogin.password;
    console.log("Name: " + name + " password: " + password);
    console.log("Name: " + usrlogin.name + " password: " + usrlogin.password);

    let sql = "SELECT * FROM users WHERE " +
        "name=\"" + name + "\" " +
        "AND password=\"" + password + "\";";
    console.log(sql);
    // Execute query and output results
    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
        } else {
            console.log(JSON.stringify(result));

            //Look to see if we have a matching user
            let userFound = result.length > 0;
            if (userFound) {
                let username = result[0].name;
                let userId = result[0].id;
                //get user preferences
                let sqlGetUserPreferences = "SELECT * FROM preferences WHERE id=" + userId + ";";
                connectionPool.query(sqlGetUserPreferences, (errorGettingPreferences, preferencesResult) => {
                    if(errorGettingPreferences)
                        console.error("Error executing query: " + JSON.stringify(errorGettingPreferences));
                    else if(preferencesResult.length > 0) {
                        let preferences = preferencesResult[0];
                        //Store details of logged in user
                        request.session.preferences = preferences;
                        request.session.username = username;
                        request.session.userId = userId;
                        //Send back appropriate response
                        let message = '{"login":true}';
                        return response.send(message);
                    } else {
                        return response.send('{"login": false, "message":"Preferences incorrect."}');
                    }
                });
            } else {
                return response.send('{"login": false, "message":"Username or password incorrect."}');
            }
        }
    });
}

/** Handles POST requests to our web service */
function register(request, response) {

    //Extract details
    let details = request.body;
    let name = details.name;
    let password = details.password;
    let preferences = details.preferences;
    //Output the data sent to the server
    console.log("Data received: " + JSON.stringify(details));

    //First checks whether user exists, then attempts to add user to database, then attempts to add user preferences
    //Ensures duplicate user is not added
    let sqlCheckUserExistsQuery = "SELECT * from users where name=\"" + name + "\";";
    connectionPool.query(sqlCheckUserExistsQuery, (err, result) => {
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
        } else {
            console.log(result);
            if (result.length > 0) { // user found
                //Finish off the interaction.
                response.send('{"registration": false, "message":"Username or password incorrect.", "name":"' + name + '"}');
            } else {
                //Build query to sign user up to database
                let sqlAddUserQuery = "INSERT INTO users (name, password)  VALUES ("
                    + "\"" + name + "\","
                    + "\"" + password + "\""
                    + ");";
                // Execute query, signing user up and output results
                connectionPool.query(sqlAddUserQuery, (errAddUser, addUserResult) => {
                    if (errAddUser) {//Check for errors
                        console.error("Error executing query: " + JSON.stringify(errAddUser));
                    } else {
                        //Query to add user details to preferences table
                        let sqlAddUserPreferencesQuery = "INSERT INTO preferences (reading_mode, words_before_quiz, highlight_color, unhighlight_color, background_color, field_of_view)  VALUES ("
                            + "\"" + preferences.readingMode + "\","
                            + preferences.wordsBeforeQuiz + ","
                            + "\"" + preferences.highlightColor + "\","
                            + "\"" + preferences.unhighlightColor + "\","
                            + "\"" + preferences.backgroundColor + "\","
                            + "\"" + preferences.fieldOfView + "\""
                            + ")";
                        connectionPool.query(sqlAddUserPreferencesQuery, (errorAddPreferences, addPreferencesResult) => {
                            if(errorAddPreferences)
                                console.log("Error executing add preferences to database query: " + JSON.stringify(errorAddPreferences));
                            else
                                //Finish off the interaction.
                                response.send('{"registration": true, "message":"Successfully registered.", "name":"' + name + '"}');
                        });
                    }
                });
            }
        }
    });
}

/** Uploads file to /upload folder */
function uploadPdf(request, response) {
    if (request.session.username == undefined)  //ensures a session is active, a user is logged in
        return response.status(500).send('{"upload": false, "error": "User not logged in"}');
    //Else, user is logged in, attempt to upload PDF
    let files = request.files;

//    Check to see if a file has been submitted to this path
    if (!files || Object.keys(files).length === 0)
        return response.status(400).send('{"upload": false, "error": "Files missing"}');

//    name of the input field (i.e. "myFile") is used to retrieve the uploaded file
    let myFile = files.myFile;

//    Checks that it is a PDF file, not any other
    let notAPdfFile = !myFile.name.includes('.myPdf') && myFile.name.split('.').length > 1 && myFile.name.split('.')[1].toLowerCase() != "pdf";
    if (notAPdfFile)
        return response.status(400).send('{"upload": false, "error": "Not a PDF file"}');

    //gets user's directory, if it even exists
    let username = request.session.username;

    //Directory to add PDF to
    const directoryToUploadFileTo = __rootdir + '/uploads/' + username;
    //ensures directory for this user exists
    if (!fs.existsSync(directoryToUploadFileTo)) {
        fs.mkdirSync(directoryToUploadFileTo, {recursive: true});
    }

    //moves PDF into the directory assigned for user
    myFile.mv(directoryToUploadFileTo + "/" + myFile.name, function (err) {
        if (err)
            return response.status(500).send('{"filename": "' +
                myFile.name + '", "upload": false, "error": "' +
                JSON.stringify(err) + '"}');
        else {//   Sends back confirmation of the upload file
            /** Send pdf to database*/
                //    Path including PDF file in its directory
            const absolutePdfPath = directoryToUploadFileTo + "/" + myFile.name + "";
            //    Extract PDF words
            /** Reads PDF file and returns an array of split words by the delimiter space ' ' */
            pdfUtil.pdfToText(absolutePdfPath, function (error, data) {
                if (error)
                    throw(error);
                else {
                    //Gets the words and put separates them by spaces and new lines in an array
                    let words = data.replace(/\n/g, " ").split(" ");
                    // Put words into span tags
                    let pdfToHtml = createHtml(words);
                    //    Adds book name etc to database
                    let userId = request.session.userId;
                    let sql = "INSERT INTO documents (html, user_id, read_position, file_name)  VALUES ("
                        + "\'" + pdfToHtml + "\',"
                        + "" + userId + ","
                        + "" + 0 + ","
                        + "\"" + myFile.name + "\""
                        + ")";
                    connectionPool.query(sql, (error, result) => {
                        if (error) //ensures document is not added to user directory.
                            return response.status(500).send('{"upload": false, "error": "Unable to send document to database"}');
                    });
                    // PDF successfully parse and sent to database
                    return response.send('{"filename": "' + myFile.name +
                        '", "upload": true}');
                }
            });
        }
    });

}

/** Gets a given user's PDFs */
function getUserPdfs(request, response) {
    if (request.session.username == undefined) { //ensures a session is active, a user is logged in
        return response.status(500).send('{"upload": false, "error": "User not logged in"}');
    }

    //for finding user's PDFs
    const username = request.session.username;
    const testFolder = './uploads/' + username;
    //Reads all file names in user's PDF list
    fs.readdir(testFolder, (err, files) => {
        response.send(files);
    });
}

/** Sends PDF text to front end */
function loadPdf(request, response) {
    if (request.session.username == undefined) { //ensures a session is active, a user is logged in
        return response.status(500).send('{"upload": false, "error": "User not logged in"}');
    }
    //for finding user's PDFs
    const username = request.session.username;
    const pdfName = request.body.pdfName;
    const userId = request.session.userId;
    let sql = "SELECT html, read_position, date_last_accessed, file_name FROM documents WHERE " +
        "file_name = \"" + pdfName + "\" AND " +
        "user_id = " + userId + ";";
    connectionPool.query(sql, (error, result) => {
        if (error) //Ensures query is fulfilled
            return response.status(500).send('{"upload": false, "error": "unable to read documents from the database"}');
        else {
            let pdfDetails = result[0];
            response.send(JSON.stringify(pdfDetails));
        }
    });
}

/** Removes a given Pdf */
function removePdf(request, response) {
    if (request.session.username == undefined) //Ensures a session is active
        return response.status(500).send('{"delete": false, "error": "User not logged in"}');
    console.log(JSON.stringify(request.body));
    //For finding the PDF location
    const username = request.session.username;
    const pdfName = request.body.pdfName;
    const pdfLocation = "./uploads/" + username + "/" + pdfName;
    const userId = request.session.userId;
    //Remove from database
    let sql = "DELETE FROM documents where " +
        "user_id = " + userId + " AND " +
        "file_name = \"" + pdfName + "\";";
    connectionPool.query(sql, (error, result) => {
        if (error) //ensures document is not removed from user directory if it can't be removed from database
            return response.status(500).send('{"delete": false, "error": "Unable to send document to database"}');
    });
    //Removes myPdf
    fs.rm(pdfLocation, (err) => {
        if (err)
            response.send("{\"message\": \"" + err + "\"}");
        else
            response.send("{\"message\": \"Found and removed PDF\"}");
    });
}

/** Turns split words into span elements */
function createHtml(words) {
    let htmlCode = "";
    for (let wordNumber = 0; wordNumber < words.length; wordNumber++) {
        let word = words[wordNumber];
        if (word.length > 0) //Ensures empty strings are not created.
            //add on span tag of new word
            htmlCode += "<span id=\"w" + wordNumber + "\" onmouseover=\"highlight(this)\" onmouseout=\"unhighlight(this)\">" + word.trim() + " </span>";
    }

    return htmlCode;
}