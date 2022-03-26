/** Due to asynchronous functions, this function intialises user preferences after promises */
function initialisePreferences() {
    pdfPreferences = userDetails.preferences;
    highlightColor = pdfPreferences.highlight_color; //Word currently being read
    unhighlightColor = pdfPreferences.unhighlight_color; //already read words
    backgroundColor = pdfPreferences.background_color; //For completely removing of all highlighting
    readMode = pdfPreferences.reading_mode; //RSVP or paragraph mode
    wordsBeforeQuiz = pdfPreferences.words_before_quiz; //for quiz menu
    fieldOfView = pdfPreferences.field_of_view; //how much the user can read in field of view
    fieldOfViewError = fieldOfView + 3; //Room for error in reading accident jumps
}

/** Outputs the HTML for the dashboard () */
function outputDashboard() {
    initialisePreferences();
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