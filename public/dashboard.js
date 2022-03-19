
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
//    Wrap file inside FormData object
    const formData = new FormData();
    formData.append('myFile', fileArray[0]);
//    Sets up HTTP req to send file and receive message of confirmation
    let httpReq = new XMLHttpRequest();
    httpReq.onload = () => {
        console.log(httpReq.responseText);
        let response = JSON.parse(httpReq.responseText);
        if("error" in response) //pdf could not be uploaded
            serverResponse.text(response.error);
        else //success
            serverResponse.text("File uploaded successfully");
    };

//    Sends off message to upload file
    httpReq.open("POST", '/upload');
    httpReq.send(formData);
}

function outputDashboard() {
    document.getElementById("CheckLoginDiv").innerHTML =
        '<input type="file" id="FileInput">' +
        '<button onclick="uploadFile()">Upload PDF</button>' +
        '<div id="ServerResponse"></div>';
}