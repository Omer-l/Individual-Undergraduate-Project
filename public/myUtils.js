/** Hides given elements, given an array of their ids */
function showElementsByIds(elementIds) {
    for (let elementIndex = 0; elementIndex < elementIds.length; elementIndex++) {
        let elementId = elementIds[elementIndex];
        $(elementId).show();
    }
}

/** Hides given elements, given an array of their ids */
function hideElementsByIds(elementIds) {
    for (let elementIndex = 0; elementIndex < elementIds.length; elementIndex++) {
        let elementId = elementIds[elementIndex];
        $(elementId).hide();
    }
}

/**
 * Hides elements, given the boolean parameter
 * @param pdfElementsOn   is a boolean to determine whether to hide the PDF.
 */
function hideContent(pdfElementsOn) {
    let pdfContent = ['#HolderDiv', '#Holder', '#pageDownBarDiv', '#pageUpBarDiv'];
    let dashboardContent = ["#ServerResponse", "#UploadFileButton", "#FileInput", "#UserPdfsList"];
    if (pdfElementsOn) {
        //to show
        showElementsByIds(pdfContent);
        //to hide
        hideElementsByIds(dashboardContent);
    } else {
        //to show
        showElementsByIds(dashboardContent);
        //to hide
        hideElementsByIds(pdfContent);
    }
}

/**
 * True if element is overflowing its parent element
 */
function pageFullOfWords(elem) {
    const elemWidth = elem.getBoundingClientRect().height;
    console.log(elem.parentElement);
    const parentWidth = elem.parentElement.getBoundingClientRect().height
    console.log("BOOL : " + elemWidth + " > " + parentWidth);
    return elemWidth > parentWidth;
}

/** Outputs PDF as HTML*/
function outputPdfToPage(pdfName, html) {
    hideContent(true);
    let pdfHolderId = "Holder"; //holds PDF words
    //put words into div element
    let pdfHolderElement = document.getElementById(pdfHolderId);
    pdfHolderElement.innerHTML = html;
    //places words into an array to not overfill the page
    pdfWords = $("#" + pdfHolderId).find("span"); //all words wrapped inside the span element
    pdfHolderElement.innerHTML = ""; //clear PDF view
    for (let wordNumber = previouslyReadWordIndex; wordNumber < pdfWords.length && !pageFullOfWords(pdfHolderElement); wordNumber++) {
        let word = pdfWords[wordNumber].outerHTML;
        pdfHolderElement.innerHTML += word;

    }
}