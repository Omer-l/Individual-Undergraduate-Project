let userDetails = {
    name: '',
    preferences: '',
};

function renderPDF(url, canvasContainer, options) {
    console.log("RENDERING");
    var options = options || { scale: 1 };

    function renderPage(page) {
        var viewport = page.getViewport(options.scale);
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        canvasContainer.appendChild(canvas);

        page.render(renderContext);
    }

    function renderPages(pdfDoc) {
        for(var num = 1; num <= pdfDoc.numPages; num++)
            pdfDoc.getPage(num).then(renderPage);
    }

    PDFJS.disableWorker = true;
    PDFJS.getDocument(url).then(renderPages);

}

function outputDashboard() {
    document.getElementById("CheckLoginDiv").innerHTML =
        '<input type="file" id="FileInput">' +
        '<button onclick="uploadFile()">Upload PDF</button>' +
        '<div id="ServerResponse"></div>' +
        '<h1>Your PDFs</h1>' +
        '<div id="UserPdfsList"></div>' +
        '<div id="holder"></div>';
    //Output list of logged in user's pdfs
    getUserPdfs();
    renderPDF("./Handwritten_digits_recognition_with_decision_tree_.pdf", document.getElementById("holder"));
}