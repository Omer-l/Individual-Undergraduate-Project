/** Due to asynchronous functions, this function intialises user preferences after promises */
function initialisePreferences() {
    pdfPreferences = userDetails.preferences;
    highlightColor = pdfPreferences.highlight_color; //Word currently being read
    unhighlightColor = pdfPreferences.unhighlight_color; //already read words
    backgroundColor = pdfPreferences.background_color; //For completely removing of all highlighting
    readMode = pdfPreferences.reading_mode; //RSVP or paragraph mode
    wordsBeforeQuiz = pdfPreferences.words_before_quiz; //for quiz menu
    fieldOfView = pdfPreferences.field_of_view; //how much the user can read in field of view
    fieldOfViewError = fieldOfView + 5; //Room for error in reading accident jumps
    document.getElementById("ReadingModeHolder").innerHTML += readMode;
    document.getElementById("WordsBeforeQuizHolder").innerHTML += wordsBeforeQuiz;
    document.getElementById("HighlightColorHolder").innerHTML += highlightColor;
    document.getElementById("UnhighlightColorHolder").innerHTML += unhighlightColor;
    document.getElementById("BackgroundColorHolder").innerHTML += backgroundColor;
    document.getElementById("FieldOfViewHolder").innerHTML += fieldOfView;
}

/** Outputs the HTML for the dashboard () */
function outputDashboard() {
    initialisePreferences();
    document.getElementById("CheckLoginDiv").innerHTML =
        '<input type="file" id="FileInput">' +
        '<button class="btn btn-lg btn-dark"  onclick="uploadFile()" id="UploadFileButton">Upload PDF</button>' +
        '<div id="ServerResponse"></div>' +
        '<div id="UserPdfsList"><h1>Your PDFs</h1><br></div>' +
        '<button';
    //Output list of logged in user's pdfs
    getUserPdfs();
}