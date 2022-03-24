const PDFJS = require('pdfjs-dist');
const words = [];
module.exports = {
    /**
     * Gets all text from the specified PDF file
     */
    extractText: (dataURI) => {
        // let input = document.getElementById("file-id");
        // let fReader = new FileReader();
        // fReader.readAsDataURL(input.files[0]);
        // fReader.onloadend = function (event) {
        //     convertDataURIToBinary(dataURI);
        // }
        var filePath = path.join(__dirname, 'uploads/data/multipage.pdf')
        var extract = require('pdf-text-extract')
        extract(filePath, { splitPages: false }, function (err, text) {
            if (err) {
                console.dir(err)
                return
            }
            console.dir(text)
        })
    }
};

let BASE64_MARKER = ';base64,';

/**
 * converts text to binary for processing the words.
 */
function convertDataURIToBinary(dataURI) {

    let base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    let base64 = dataURI.substring(base64Index);
    let raw = atob(base64);
    let rawLength = raw.length;
    let array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    pdfAsArray(array)

}

/**
 * Turns PDF into an array of pages
 * @param pdfAsArray
 */
function pdfAsArray(pdfAsArray) {

    PDFJS.getDocument(pdfAsArray).then(function (pdf) {

        let pdfDocument = pdf;
        // Create an array that will contain our promises
        let pagesPromises = [];

        for (let i = 0; i < pdf.pdfInfo.numPages; i++) {
            // Required to prevent that i is always the total of pages
            (function (pageNumber) {
                // Store the promise of getPageText that returns the text of a page
                pagesPromises.push(getPageText(pageNumber, pdfDocument));
            })(i + 1);
        }

        // Execute all the promises
        Promise.all(pagesPromises).then(function (pagesText) {
            let words = [];
            let wordIndex = 0;
            for(let pageNumber = 0; pageNumber < pagesText.length; pageNumber++) {
                let page = pagesText[pageNumber];
                let wordsInPage = page.split(' ');
                for(let wordNumber = 0; wordNumber < wordsInPage.length; wordNumber++) {
                    let word = wordsInPage[wordNumber].trim();
                    if(word.length != 0) {
                        words[wordIndex++] = word;
                    }
                }
            }
            console.log("WORH: " + words);
            this.words = words; //save all the pages from the promise.
        });

    }, function (reason) {
        // PDF loading error
        console.error(reason);
    });
}

/**
 * Turns text in page to strings
 */
function getPageText(pageNum, PDFDocumentInstance) {
    // Return a Promise that is solved once the text of the page is retrieved
    return new Promise(function (resolve, reject) {
        PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
            // The main trick to obtain the text of the PDF page, use the getTextContent method
            pdfPage.getTextContent().then(function (textContent) {
                let textItems = textContent.items;
                let finalString = "";

                // Concatenate the string of the item to the final string
                for (let i = 0; i < textItems.length; i++) {
                    let item = textItems[i];

                    finalString += item.str + " ";
                }

                // Solve promise with the text retrieve from the page
                resolve(finalString);
            });
        });
    });
}
// /**
//  * Puts next page into div element of website
//  */
// function loadNextPage() {
//     addHighlightingToWords();
// }
//
// /**
//  * True if element is overflowing its parent element
//  */
// function checkOverflow(elem) {
//     const elemWidth = elem.getBoundingClientRect().height
//     const parentWidth = elem.parentElement.getBoundingClientRect().height
//
//     return elemWidth > parentWidth;
// }
//
// /**
//  * Wraps each word into a span adds a hover highlight feature, and puts into div element of website
//  */
// function addHighlightingToWords() {}