/** Due to asynchronous functions, this function intialises user preferences after promises */
function initialisePreferences() {
    pdfPreferences = userDetails.preferences;
    highlightColor = pdfPreferences.highlight_color; //Word currently being read
    unhighlightColor = pdfPreferences.unhighlight_color; //already read words
    backgroundColor = pdfPreferences.background_color; //For completely removing of all highlighting
    readMode = pdfPreferences.reading_mode; //RSVP or paragraph mode
    wordsBeforeQuiz = pdfPreferences.words_before_quiz; //for quiz menu
    fieldOfView = pdfPreferences.field_of_view; //how much the user can read in field of view
}

/** Outputs the HTML for the dashboard () */
function outputDashboard() {
    initialisePreferences();
    document.getElementById("CheckLoginDiv").innerHTML =
        '<input type="file" id="FileInput">' +
        '<button class="btn btn-lg btn-dark"  onclick="uploadFile()">Upload PDF</button>' +
        '<div id="ServerResponse"></div>' +
        '<span id="w1" onmouseover=highlight(this) onmouseout="unhighlight(this)">Testing</span> <span id="w2" onmouseover=highlight(this) onmouseout="unhighlight(this)">Hover</span> <span id="w3" onmouseover=highlight(this) onmouseout="unhighlight(this)">Ipsum</span> <span id="w4" onmouseover=highlight(this) onmouseout="unhighlight(this)">Sit</span> <span id="w5" onmouseover=highlight(this) onmouseout="unhighlight(this)">Ame</span>' +
        '<span id="w6" onmouseover=highlight(this) onmouseout="unhighlight(this)">Testing</span> <span id="w7" onmouseover=highlight(this) onmouseout="unhighlight(this)">Hover</span> <span id="w8" onmouseover=highlight(this) onmouseout="unhighlight(this)">Ipsum</span> <span id="w9" onmouseover=highlight(this) onmouseout="unhighlight(this)">Sit</span> <span id="w10" onmouseover=highlight(this) onmouseout="unhighlight(this)">Ame</span>' +
        '<h1>Your PDFs</h1>' +
        '<div id="UserPdfsList"></div>' +
        '<div id="holder"></div>';
    //Output list of logged in user's pdfs
    getUserPdfs();
}