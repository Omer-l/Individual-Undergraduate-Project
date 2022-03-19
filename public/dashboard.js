let userDetails = {
    name: 'omer',
    preferences: '',
};

function outputDashboard() {
    document.getElementById("CheckLoginDiv").innerHTML =
        '<input type="file" id="FileInput">' +
        '<button onclick="uploadFile()">Upload PDF</button>' +
        '<div id="ServerResponse"></div>';
}