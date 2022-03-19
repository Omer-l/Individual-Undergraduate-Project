//Points to a div element where user combo will be inserted.
let userDiv;
let addUserResultDiv;

//Set up page when window has loaded
window.onload = init;

//Get pointers to parts of the DOM after the page has loaded.
function init(){
    userDiv = document.getElementById("UserDiv");
    addUserResultDiv = document.getElementById("AddUserResult");
    loadUsers();
}

/* Loads current users and adds them to the page. */
function loadUsers() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {//Called when data returns from server
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //Convert JSON to a JavaScript object
            let usrArr = JSON.parse(xhttp.responseText);

            //Return if no users
            if(usrArr.length === 0)
                return;

            //Build string with user data
            let htmlStr = "<table><tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th></tr>";
            for(let key in usrArr){
                htmlStr += ("<tr><td>" + key + "</td><td>" + usrArr[key].name + "</td>");
                htmlStr += ("<td>" + usrArr[key].email + "</td><td>" + usrArr[key].age + "</td></tr>");
            }
            //Add users to page.
            htmlStr += "</table>";
            userDiv.innerHTML = htmlStr;
        }
    };

    //Request data from all users
    xhttp.open("GET", "/users", true);
    xhttp.send();
}


/* Posts a new user to the server. */
function addUser() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let usrName = document.getElementById("RegistrationUsername").value;
    let usrEmail = document.getElementById("RegistrationPassword").value;
    let userPreferences = "12345";

    //Create object with user data
    let usrObj = {
        name: usrName,
        password: usrEmail,
        preferences: userPreferences
    };
    
    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function() {
        if(xhttp.responseText.length > 0) {
            if (this.readyState == 4 && this.status == 200) {
                //Convert JSON to a JavaScript object
                let details = JSON.parse(xhttp.responseText);
                let registrationSuccessful = details.registration;
                let page = "http://localhost:8080/index.html?register";
                let name = details.name;
                if(registrationSuccessful) {
                    console.log(name);
                    page = "http://localhost:8080/index.html?login=" + name;
                } else {
                    page = "http://localhost:8080/index.html?register=" + name;
                }
                location.href = page;
            } else {
                console.log("Error adding user");
            }
        }
    };

    //Send new user data to server
    xhttp.open("POST", "/register", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send( JSON.stringify(usrObj) );
}

/* GETs a user from the server and logs them in if valid details. */
function loginUser(name, password) {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Create object with user data
    let usrObj = {
        name: name,
        password: password,
    };

    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Convert JSON to a JavaScript object
            let details = JSON.parse(xhttp.responseText);
            let loginSuccessful = details.login;
            let page = "http://localhost:8080/index.html";
            let name = details.name;
            if(loginSuccessful) {
                console.log(name);
                page = "http://localhost:8080/index.html";
            } else {
                page += "?login=" + name;
            }
            location.href = page;
        }
        else{
            console.log("Error logging in user");
        }
    };

    //Send new user data to server
    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send( JSON.stringify(usrObj) );
}

//Checks Express sessions if user is logged in
function userLoggedIn() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {//Called when data returns from server
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //Convert JSON to a JavaScript object
            let userLoggedIn = JSON.parse(xhttp.responseText).login;
            let sessionActive = true;
            if(!userLoggedIn)
                sessionActive = false;
            else
                sessionActive = true;

            outputPage(sessionActive);
        }
    };

    //Request data from all users
    xhttp.open("GET", "/checklogin", true);
    xhttp.send();
}
//Uploads file to server side
function uploadFile() {
//        Reference to the div element for server responses
    let serverResponse = $('#ServerResponse');
    serverResponse.text("");

//    Gets the file to send and upload to server-side
    let fileArray = document.getElementById("FileInput").files;
//    Ensures file is selected
    if(fileArray.length !== 1) {
        serverResponse.text("Please select file to upload.");
        return;
    }
//    Wrap file inside message object
    const formData = new FormData();
    formData.append('myFile', fileArray[0]);
//    Sets up HTTP req to send file and receive message of confirmation
    let httpReq = new XMLHttpRequest();
    httpReq.onload = () => {
        console.log(httpReq.responseText);
        let response = JSON.parse(httpReq.responseText);
        if("error" in response) //pdf could not be uploaded
            serverResponse.text(response.error);
        else { //success
            serverResponse.text("File uploaded successfully");
            getUserPdfs();
        }
    };

//    Sends off message to upload file
    httpReq.open("POST", '/upload');
    httpReq.send(formData);
}

//gets a user's clicked PDF
function loadPdf(pdfName) {
    const xhttp = new XMLHttpRequest();
    let serverResponse = $('#ServerResponse');
    serverResponse.text("YOU CLICKED: " + pdfName);
    console.log(pdfName);
}

//GETs a list of the user's uploaded PDFs
function getUserPdfs() {
    let xhttp = new XMLHttpRequest();
    let serverResponse = document.getElementById("UserPdfsList");
    serverResponse.innerHTML = "<h1>Loading PDFs</h1>";

    xhttp.onload = () => {

        let response = JSON.parse(xhttp.responseText);
        if("error" in response) //could not get pdf from directory
            serverResponse.innerHTML = "<h1>Could not get any PDFs.</h1>";
        else { //files have returned
            let fileList = response;
            let pdfListLinks = "";
            for(let fileNumber = 0; fileNumber < fileList.length; fileNumber++) {
                let fileName = fileList[fileNumber];
                pdfListLinks += "<button class=\"btn btn-lg btn-primary\" href=\"javascript:void(0)\" onclick=\"loadPdf(\'" + fileName + "\');\">" + fileName + "</button>"
            }
            serverResponse.innerHTML = pdfListLinks;
        }
    };

    xhttp.open("GET", "/userpdfs");
    xhttp.send();
}