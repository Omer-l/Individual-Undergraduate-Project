const pdfHolderId = "Holder"; //holds PDF words
let html = ""; //holds pdf content
let pdfPreferences = {}; //Holds all of user's preferences
let highlightColor = ""; //Word currently being read
let unhighlightColor = ""; //already read words
let userBackgroundColor = "white"; //For completely removing of all highlighting
let readMode = ""; //RSVP or paragraph mode
let fieldOfView = 0; //how much the user can read in field of view
let fieldOfViewError = 0; //Room for error in reading accident jumps
let fieldOfViewErrorCounter = 0; //For counting the number of times user reads ahead mistakenly
let pdfWords = [];//Holds all the words in PDF
let wordsOnPage = []; //Words currently on the page
let previouslyReadWordIndex = 0;//For highlighting the words correctly, to prevent accidental jumps in reading
const wordIdPrefix = "w"; //Prefix of word's DOM element ID
const maximumFieldOfViewError = 10; //Maximum times user can read ahead by accident
let startingIdOnPage = 0; //first word on page
let endingIdOnPage = 0; //last word on page
let wordCount = 0; //for quiz popups
let nameOfPdf = ""; //PDF currently being read
let wordsBeforeQuiz = 0; //For quizzing
let maxWordsForQuiz = 0; //Changes depending on user's current reading position.
let sentencesForQuizzing = []; //sentences for quizzing
let temporarySentence = ""; //in case user reaches word count and the sentence is not complete

//Points to a div element where user combo will be inserted.
let userDetails = {
    name: "",
    preferences: {
        reading_mode: "",
        words_before_quiz: 0,
        highlight_color: "",
        unhighlight_color: "",
        background_color: "",
        field_of_view: 0,
    }
};

/** For quizzing */
class Question {
    constructor(questions, answers, correctAnswer) {
        this.questions = questions;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }
}

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
function switchContent(pdfElementsOn) {
    let pdfContent = ['#HolderDiv', '#Holder', '#pageDownBarDiv', '#pageUpBarDiv'];
    let dashboardContent = ["#ServerResponse", "#UploadFileButton", "#FileInput", "#UserPdfsList", "#UserDetailsHolder"];
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

/** True if element is overflowing its parent element */
function pageFullOfWords(elem) {
    const elemWidth = elem.getBoundingClientRect().height;
    const parentWidth = elem.parentElement.getBoundingClientRect().height
    // console.log("BOOL : " + elemWidth + " > " + parentWidth);
    return elemWidth > parentWidth;
}

/** Gets number from an id i.e., id='w4' would return 4*/
function getWordNumber(word) {
    word = word.id.substring(1);
    return parseInt(word);
}

/** updates variables i.e., words on page, starting element etc */
function updateWordVariables() {
    let firstWordId = wordsOnPage[0].id;
    let lastWordId = wordsOnPage[wordsOnPage.length - 1].id;
    console.log("FIRST: " + firstWordId + " LAST: " + lastWordId);
    wordsOnPage = $("#" + pdfHolderId).find("span");
    startingIdOnPage = getWordNumber(firstWordId);
    endingIdOnPage = getWordNumber(lastWordId);
}

/** Outputs PDF as HTML */
function outputPdfToPage() {
    let pdfHolderElement = document.getElementById(pdfHolderId);// div element
    //set pdf background color
    pdfHolderElement.style.backgroundColor = userBackgroundColor;
    //hide dashboard
    switchContent(true);
    pdfHolderElement.innerHTML = html;
    //places words into an array to not overfill the page
    pdfWords = $("#" + pdfHolderId).find("span"); //all words wrapped inside the span element
    pdfHolderElement.innerHTML = ""; //clear PDF view
    for (; previouslyReadWordIndex < pdfWords.length && !pageFullOfWords(pdfHolderElement); previouslyReadWordIndex++) {
        let word = pdfWords[previouslyReadWordIndex].outerHTML;
        console.log(word);
        pdfHolderElement.innerHTML += word;
    }

    if (pdfHolderElement.innerHTML == "") {
        pdfHolderElement.innerHTML = '<button type="button" class="btn btn-lg btn-primary" onclick="restartPdf()">Back to start</button>';
    }

    wordsOnPage = $("#" + pdfHolderId).find("span");
    // updateWordVariables();
}

/** Sets read position back to 0 and reloads PDF */
function restartPdf() {
    uploadReadPosition(0);
    previouslyReadWordIndex = 0;
    maxWordsForQuiz = wordsBeforeQuiz;
    outputPdfToPage();
}

/** Assigns HTML strings as objects */
function getWordStartingIndexInPdfWordsArray(idOfWord) {
    let index = 0;
    for (let elementIndex = 0; elementIndex < pdfWords.length; elementIndex++) {
        let element = pdfWords[elementIndex];
        let elementId = $(element).attr('id');
        if (elementId == idOfWord) {
            index = elementIndex;
            break;
        }
    }
    return index;
}

/** Joins an array of words into a string */
function putWordsTogether(words) {
    let wordsJoined = "";
    for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
        let word = words[wordIndex];
        wordsJoined += word;
    }
    return wordsJoined;
}

/** Evaluates and extracts sentences then places them into an array */
function extractSentences(words) {
    let splitWordsByFullStops = words.split(".");
    let sentences = [];
    for (let splitWordIndex = 0; splitWordIndex < splitWordsByFullStops.length; splitWordIndex++) {
        let sentence = splitWordsByFullStops[splitWordIndex];
        if (sentence.length > 0)
            sentences.push(sentence)
    }
    return sentences;
}

/** Searched array for the given word type and returns its index */
function wordTypeExists(sentenceAnalysis, desiredWordType) {
    let indexOfWordType = -1;

    for (let currentWordIndex = 0; currentWordIndex < sentenceAnalysis.length; currentWordIndex++) {
        let currentWordAnalysis = sentenceAnalysis[currentWordIndex];
        let currentWordType = currentWordAnalysis.PartOfSpeech.Tag;
        if (currentWordType == desiredWordType) {
            indexOfWordType = currentWordIndex;
            break;
        }
    }
    return indexOfWordType;
}

/** Chooses the best word based on its type, the hierarchy being: TAG/NICKNAME (TAG) > PROPER NOUN (PROPN) >
 *  PRONOUN (PRON) > NOUN (NOUN) >
 */
function findBestMissingWord(sentenceAnalysis) {
    let bestMissingWord = sentenceAnalysis[0].Text;
    //hiearchy of word types and their indexes (in the array wordTypeIndex), first one that is not -1 along the array is nominated
    let properNounIndex = wordTypeExists(sentenceAnalysis, "PROPN");
    let pronounIndex = wordTypeExists(sentenceAnalysis, "PRON");
    let numberNounIndex = wordTypeExists(sentenceAnalysis, "NUM");
    let nounIndex = wordTypeExists(sentenceAnalysis, "NOUN");
    let adjectiveIndex = wordTypeExists(sentenceAnalysis, "ADJ");
    let verbIndex = wordTypeExists(sentenceAnalysis, "VERB");
    let adverbIndex = wordTypeExists(sentenceAnalysis, "ADVERB");
    let otherIndex = wordTypeExists(sentenceAnalysis, "O");
    let determinerIndex = wordTypeExists(sentenceAnalysis, "DET");
    let auxiliaryIndex = wordTypeExists(sentenceAnalysis, "AUX");
    let sconjIndex = wordTypeExists(sentenceAnalysis, "SCONJ");
    let adpositionIndex = wordTypeExists(sentenceAnalysis, "ADP");
    let interjectionIndex = wordTypeExists(sentenceAnalysis, "INTJ");
    let partIndex = wordTypeExists(sentenceAnalysis, "PART");
    let symbolIndex = wordTypeExists(sentenceAnalysis, "SYM");
    let conjunctionIndex = wordTypeExists(sentenceAnalysis, "CONJ");
    let coordinatingConjunctionIndex = wordTypeExists(sentenceAnalysis, "CCONJ");
    let punctuationIndex = wordTypeExists(sentenceAnalysis, "PUNCT");
    let wordTypesIndexes = [properNounIndex, pronounIndex, numberNounIndex, nounIndex, adjectiveIndex, verbIndex, adverbIndex, otherIndex, determinerIndex, auxiliaryIndex, sconjIndex, adpositionIndex, interjectionIndex, partIndex, symbolIndex, conjunctionIndex, coordinatingConjunctionIndex, punctuationIndex];
    //choose first word type with an index
    console.log(wordTypesIndexes);
    for(let wordTypesIndex = 0; wordTypesIndex < wordTypesIndexes.length; wordTypesIndex++) {
        if(wordTypesIndexes[wordTypesIndex] > -1)
            return sentenceAnalysis[wordTypesIndexes[wordTypesIndex]].Text;

    }

    return bestMissingWord;
}

/** Generates questions given an array of syntax analysis of AWS Comprehend */
function generateQuestions(sentencesSyntaxAnalysis) {
    console.log("ANALYSIS: " + sentencesSyntaxAnalysis[0].SyntaxTokens);
    for (let sentenceAnalysisIndex = 0; sentenceAnalysisIndex < sentencesSyntaxAnalysis.length; sentenceAnalysisIndex++) {
        let questions = []; //The sentence
        let answers = []; //The missing word in sentence AKA possibilities
        let correctAnswer = ""; //The correct missing word

        let sentenceAnalysis = sentencesSyntaxAnalysis[sentenceAnalysisIndex].SyntaxTokens;
        correctAnswer = findBestMissingWord(sentenceAnalysis);
        console.log("BEST MISSING WORD: " + correctAnswer);
    }
}
