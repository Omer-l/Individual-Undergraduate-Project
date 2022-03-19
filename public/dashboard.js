let userDetails = {
    name: '',
    preferences: '',
};

function outputDashboard() {
    document.getElementById("CheckLoginDiv").innerHTML =
        '<input type="file" id="FileInput">' +
        '<button onclick="uploadFile()">Upload PDF</button>' +
        '<div id="ServerResponse"></div>' +
        '<h1>Your PDFs</h1>' +
        '<div id="UserPdfsList"></div>';
    //Output list of logged in user's pdfs
    getUserPdfs();
}