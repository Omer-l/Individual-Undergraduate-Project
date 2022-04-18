//Set up page when window has loaded
window.onload = init;

/** Get pointers to parts of the DOM after the page has loaded. */
function init() {
}

/** Checks Express sessions if user is logged in */
function userLoggedIn() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {//Called when data returns from server
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //Convert JSON to a JavaScript object
            let response = JSON.parse(xhttp.responseText);
            let userLoggedIn = response.login;
            let userInfo = {
                name: response.username,
                preferences: response.preferences
            };
            let sessionActive = true;
            if (!userLoggedIn)
                sessionActive = false;
            else {
                sessionActive = true;
                userDetails = userInfo;
                wordsBeforeQuiz = userDetails.preferences.words_before_quiz;
                document.getElementById("NameHolder").innerHTML = userDetails.name;
            }
            outputPage(sessionActive);
        }
    };

    //Request data from all users
    xhttp.open("GET", "/checklogin", true);
    xhttp.send();
}

/** Posts a new user to the server. */
function addUser() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let usrName = document.getElementById("RegistrationUsername").value;
    let usrEmail = document.getElementById("RegistrationPassword").value;

    //Create object with user data
    let usrObj = {
        name: usrName,
        password: usrEmail,
        //the user's chosen preferences, some are default when signing up
        preferences: {
            readingMode: (readingMode == 0 ? "Paragraph" : "Rapid Serial Visual Presentation"),
            wordsBeforeQuiz: numberOfWordsBeforeQuiz,
            highlightColor: "yellow", //default
            unhighlightColor: "lightblue", //default
            backgroundColor: "white", //default
            fieldOfView: 1, //default
        },
    };

    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function () {
        if (xhttp.responseText.length > 0) {
            if (this.readyState == 4 && this.status == 200) {
                //Convert JSON to a JavaScript object
                let details = JSON.parse(xhttp.responseText);
                let registrationSuccessful = details.registration;
                let page = "http://localhost:8080/index.html?register";
                let name = details.name;
                if (registrationSuccessful) {
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
    xhttp.send(JSON.stringify(usrObj));
}

/** GETs a user from the server and logs them in if valid details. */
function loginUser(name, password) {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Create object with user data
    let usrObj = {
        name: name,
        password: password,
    };

    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //Convert JSON to a JavaScript object
            let details = JSON.parse(xhttp.responseText);
            let loginSuccessful = details.login;
            let page = "http://localhost:8080/index.html";
            let name = details.name;
            console.log(details);
            if (loginSuccessful) {
                console.log(name);
                page = "http://localhost:8080/index.html";
            } else {
                page += "?login=" + name;
            }
            location.href = page;
        } else {
            console.log("Error logging in user");
        }
    };

    //Send new user data to server
    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(usrObj));

}/** GETs a user from the server and logs them in if valid details. */
function logoutUser(name, password) {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        } else {
            console.log("Error logging out user");
        }
    };

    //Send new user data to server
    xhttp.open("GET", "/logout", true);
    xhttp.send();
}

/** Uploads file to server side */
function uploadFile() {
//        Reference to the div element for server responses
    let serverResponse = $('#ServerResponse');
    serverResponse.text("");

//    Gets the file to send and upload to server-side
    let fileArray = document.getElementById("FileInput").files;
//    Ensures file is selected
    if (fileArray.length !== 1) {
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
        if ("error" in response) //pdf could not be uploaded
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

/** gets a user's clicked PDF */
function loadPdf(pdfName) {
    nameOfPdf = pdfName; //update name of pdf
    const xhttp = new XMLHttpRequest();
    let serverResponse = $('#ServerResponse');
    let pdfDetails = {
        pdfName: pdfName
    };
    let stringifiedpdfDetails = JSON.stringify(pdfDetails);
    xhttp.onreadystatechange = () => {//Called when pdf data returns from server
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let response = JSON.parse(xhttp.responseText);
            html = response.html;
            previouslyReadWordIndex = response.read_position;
            maxWordsForQuiz = previouslyReadWordIndex + wordsBeforeQuiz;
            serverResponse.text("Displaying " + pdfName);
            outputPdfToPage();
        }
        // else {//could not load PDF
        //     // serverResponse.text("Unable to load PDF, either try again/sign in again/try a different PDF'");
        // }
    };
    //Send new user data to server
    xhttp.open("POST", "/loadpdf", true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(stringifiedpdfDetails);
}

/** removes user's clicked pdf */
function removePdf(pdfName) {
    let serverResponse = document.getElementById("ServerResponse");
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let response = JSON.parse(xhttp.responseText);
            console.log(response);
            serverResponse.innerHTML = "Removed " + response.pdfName;
            getUserPdfs();
        }
    }

    xhttp.open("POST", "/removepdf");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("{ \"pdfName\": \"" + pdfName + "\" }")
}

/** GETs a list of the user's uploaded PDFs */
function getUserPdfs() {
    let xhttp = new XMLHttpRequest();
    let serverResponse = document.getElementById("UserPdfsList");
    serverResponse.innerHTML = "<h1>Loading PDFs</h1>";
    let pdfListDiv = document.getElementById("PdfList");
    xhttp.onload = () => {
        if (xhttp.responseText.length == 0)
            serverResponse.innerHTML = "<h1>Upload PDFs!</h1>";
        else { //PDFs have been found
            let response = JSON.parse(xhttp.responseText);
            if ("error" in response) //could not get pdf from directory
                serverResponse.innerHTML = "<h1>Could not get any PDFs.</h1>";
            else { //files have returned
                let fileList = response;
                let pdfListLinks = "";
                let numberOfFiles = fileList.length;
                let numberOfRows = Math.ceil(numberOfFiles / 2);
                console.log(numberOfFiles + " , " + numberOfRows);
                let fileIndex = 0;
                for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
                    pdfListLinks += '<div class="row pt-1 pb-1">';
                    for (let fileNumber = 0; fileNumber < 2 && fileIndex < numberOfFiles; fileNumber++, fileIndex++) {
                        let fileName = fileList[fileNumber];
                        pdfListLinks += '<div class="col-md-6">' +
                            '<div class="bg-white card addresses-item mb-4 border border-primary shadow">' +
                            '<div class="gold-members p-4">' +
                            '<div class="media">' +
                            '<div class="mr-3"><i class="icofont-ui-home icofont-3x"></i></div>' +
                            '<div class="media-body">' +
                            '<h6 class="mb-1 text-secondary">PDF</h6>' +
                            '<p class="text-black">' + fileName +
                            '</p>' +
                            '<p class="mb-0 text-black font-weight-bold">' + '<button class="text-danger" onclick="loadPdf(\'' + fileName + '\')"><i class="icofont-ui-delete"></i> READ</button></p>' + '<button class="text-danger" onclick="removePdf(\'' + fileName + '\')"><i class="icofont-ui-delete"></i> DELETE</button></p>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        // pdfListLinks += "<div class='container-fluid'><button class=\"btn btn-lg btn-primary\" href=\"javascript:void(0)\" onclick=\"loadPdf(\'" + fileName + "\');\">" + fileName + "</button>"
                        // pdfListLinks += "<button class=\"btn btn-lg btn-warning\" href=\"javascript:void(0)\" onclick=\"removePdf(\'" + fileName + "\');\">Remove</button></div>"
                    }
                    pdfListLinks += '</div>';
                }
                document.getElementById("NumberOfPdfsHolder").innerHTML = "Total PDFs: " + fileList.length;
                    pdfListDiv.innerHTML = "<h4 class=\"font-weight-bold mt-0 mb-4\">Manage PDFs</h4>" + pdfListLinks + "</div";
            }
        }
    };

    xhttp.open("GET", "/userpdfs");
    xhttp.send();
}

/** update's read position in PDF for loading it next time it is opened */
function uploadReadPosition(wordPosition) {
    let serverResponse = document.getElementById("ServerResponse");
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let response = JSON.parse(xhttp.responseText);
            console.log(response);
            serverResponse.innerHTML = "Removed " + response.pdfName;
            getUserPdfs();
        }
    }

    let pdfObjectToPost = JSON.stringify({
        pdfName: nameOfPdf,
        readPosition: wordPosition
    });

    xhttp.open("POST", "/updatereadposition");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(pdfObjectToPost)
}

/** Gets similar words to a word, this helps with the quiz */
function getSimilarWordsTo(word, question, correctAnswer) {
    let serverResponse = document.getElementById("ServerResponse");
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let response = JSON.parse(xhttp.responseText);
            let answers = response;
            myQuestions.push( new Question(question, answers, correctAnswer))
            console.log(myQuestions);
        }
    }

    let pdfObjectToPost = JSON.stringify({
        word: word,
    });

    xhttp.open("POST", "/similarwords");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(pdfObjectToPost)
}