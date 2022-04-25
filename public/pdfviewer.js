/** Determines whether a word is already highlighted */
function highlighted(word, color) {
    if(word != null)
        return word.style.backgroundColor == color;
    else
        return false;
}

/** Highlights words in the field of view */
function highlight(word) {
    let idOfWordBeingLookedAt = getWordNumber(word);
    let startOfFieldOfView = idOfWordBeingLookedAt - fieldOfView;
    let endOfFieldOfView = idOfWordBeingLookedAt + fieldOfView;
    //Highlights actively read
    for(let highlightIndex = startOfFieldOfView; highlightIndex <= endOfFieldOfView; highlightIndex++) {
        let wordId = wordIdPrefix + highlightIndex;
        let wordInFieldOfView = document.getElementById(wordId);
        if(wordInFieldOfView != null)
            wordInFieldOfView.style.backgroundColor = highlightColor;
    }
}

/** Removes highlightColor from words that have been read and moved away from the field of view */
function unhighlight(word) {
    idOfWordBeingLookedAt = getWordNumber(word);
    let startOfFieldOfView = idOfWordBeingLookedAt - fieldOfView < 0 ? 0 : idOfWordBeingLookedAt - fieldOfView;
    let endOfFieldOfView = idOfWordBeingLookedAt + fieldOfView;
    //unhighlights words not currently being read
    for(let unhighlightIndex = startOfFieldOfView; unhighlightIndex <= endOfFieldOfView; unhighlightIndex++) {
        let wordId = wordIdPrefix + unhighlightIndex;
        let wordInFieldOfView = document.getElementById(wordId);
        if(unhighlightIndex > previouslyReadWordIndex && wordInFieldOfView != null)
            wordInFieldOfView.style.backgroundColor = backgroundColor;
        else if(wordInFieldOfView != null)
            wordInFieldOfView.style.backgroundColor = unhighlightColor;
    }
    //Unhighlights all previous words
    let readingAtCorrectPace = idOfWordBeingLookedAt <= previouslyReadWordIndex + fieldOfViewError &&
                                idOfWordBeingLookedAt >= previouslyReadWordIndex;
    let tooManyReadingJumpErrors = fieldOfViewErrorCounter == maximumFieldOfViewError;
    console.log(idOfWordBeingLookedAt + " COMP TO: " + (previouslyReadWordIndex + fieldOfViewError));
    if(readingAtCorrectPace || tooManyReadingJumpErrors) { //ensures reader is not jumping text
        // let previouslyReadWord = idOfWordBeingLookedAt < previouslyReadWordIndex;
        if(tooManyReadingJumpErrors)
            wordCount = 0;

        //highlights words not currently being read
        for(let highlightIndex = previouslyReadWordIndex; highlightIndex <= endOfFieldOfView; highlightIndex++) {
            let wordId = wordIdPrefix + highlightIndex;
            let wordInFieldOfView = document.getElementById(wordId);
            let alreadyUnhighlighted = highlighted(wordInFieldOfView, unhighlightColor);
            if(!alreadyUnhighlighted && wordInFieldOfView != null) {
                wordInFieldOfView.style.backgroundColor = unhighlightColor;
                wordCount++;
                console.log(wordCount);
            }
        }
        previouslyReadWordIndex = idOfWordBeingLookedAt;
        // if(idOfWordBeingLookedAt >= wordsBeforeQuiz) {
        //     wordsBeforeQuiz = idOfWordBeingLookedAt + userDetails.preferences.words_before_quiz;
        //     let wordsForQuiz = [];
        //     let pdfWordsIndex = (getWordStartingIndexInPdfWordsArray("w" + idOfWordBeingLookedAt) - numberOfWordsForQuiz < 0) ? 0 : getWordStartingIndexInPdfWordsArray("w" + idOfWordBeingLookedAt) - numberOfWordsForQuiz;
        //     for(let quizWordCounter = 0; pdfWordsIndex < pdfWords.length && quizWordCounter < numberOfWordsForQuiz; pdfWordsIndex++, quizWordCounter++) {
        //         let word = pdfWords[pdfWordsIndex];
        //         wordsForQuiz.push($(word).text());
        //     }
        //     let wordsJoined = putWordsTogether(wordsForQuiz);
        //     let sentences = extractSentences(wordsJoined);
        //     console.log(wordsJoined);
        //     sentencesForQuizzing = sentences;
        //     getQuiz(sentences);
        // }

        fieldOfViewErrorCounter = 0;
    } else
        fieldOfViewErrorCounter++;
}

/** Displays the next set of words */
function nextPage() {
    let pdfHolderElement = document.getElementById(pdfHolderId);// div element
    pdfHolderElement.innerHTML = ""; //clear page
    for(; previouslyReadWordIndex < pdfWords.length && !pageFullOfWords(pdfHolderElement); previouslyReadWordIndex++) {
        let word = pdfWords[previouslyReadWordIndex].outerHTML;
        pdfHolderElement.innerHTML += word;
    }
    if(pdfHolderElement.innerHTML == "") {
        pdfHolderElement.innerHTML = '<button type="button" class="btn btn-lg btn-primary" onclick="restartPdf()">Back to start</button>';
    }
    fieldOfViewErrorCounter = 0; //reset error counter
    wordsOnPage = $("#" + pdfHolderId).find("span");
    // updateWordVariables()
    uploadReadPosition(previouslyReadWordIndex);
}