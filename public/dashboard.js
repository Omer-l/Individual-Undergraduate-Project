let userDetails = {
    name: '',
    preferences: '',
};

/** Outputs the HTML for the dashboard () */
function outputDashboard() {
    document.getElementById("CheckLoginDiv").innerHTML =
        '<input type="file" id="FileInput">' +
        '<button class="btn btn-lg btn-dark"  onclick="uploadFile()">Upload PDF</button>' +
        '<div id="ServerResponse"></div>' +
        '<span id="1" onmouseover=highlight(this) onmouseout="unhighlight(this)">Testing</span> <span id="2" onmouseover=highlight(this) onmouseout="unhighlight(this)">Hover</span> <span id="3" onmouseover=highlight(this) onmouseout="unhighlight(this)">Ipsum</span> <span id="4" onmouseover=highlight(this) onmouseout="unhighlight(this)">Sit</span> <span id="5" onmouseover=highlight(this) onmouseout="unhighlight(this)">Ame</span>' +
        '<h1>Your PDFs</h1>' +
        '<div id="UserPdfsList"></div>' +
        '<div id="holder"></div>';
    //Output list of logged in user's pdfs
    getUserPdfs();
}