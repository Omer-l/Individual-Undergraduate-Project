let userDetails = {
    name: '',
    preferences: '',
};

function outputDashboard() {
    document.getElementById("CheckLoginDiv").innerHTML =
        '<input type="file" id="FileInput">' +
        '<button class="btn btn-lg btn-dark"  onclick="uploadFile()">Upload PDF</button>' +
        '<div id="ServerResponse"></div>' +
        '<h1>Your PDFs</h1>' +
        '<div id="UserPdfsList"></div>' +
        '<div id="holder"></div>';
    //Output list of logged in user's pdfs
    getUserPdfs();
}