

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
        wordInFieldOfView.style.backgroundColor = highlightColor;
    }
}

/** Removes highlightColor from words that have been read and moved away from the field of view */
function unhighlight(word) {
    let idOfWordBeingLookedAt = getWordNumber(word);
    let startOfFieldOfView = idOfWordBeingLookedAt - fieldOfView < 0 ? 0 : idOfWordBeingLookedAt - fieldOfView;
    let endOfFieldOfView = idOfWordBeingLookedAt + fieldOfView;
    //unhighlights words not currently being read
    for(let unhighlightIndex = startOfFieldOfView; unhighlightIndex <= endOfFieldOfView; unhighlightIndex++) {
        let wordId = wordIdPrefix + unhighlightIndex;
        let wordInFieldOfView = document.getElementById(wordId);
        if(unhighlightIndex > previouslyReadWordIndex)
            wordInFieldOfView.style.backgroundColor = backgroundColor;
        else
            wordInFieldOfView.style.backgroundColor = unhighlightColor;
    }
    //Unhighlights all previous words
    let readingAtCorrectPace = idOfWordBeingLookedAt <= previouslyReadWordIndex + fieldOfViewError &&
                                idOfWordBeingLookedAt >= previouslyReadWordIndex;
    let tooManyReadingJumpErrors = fieldOfViewErrorCounter == maximumFieldOfViewError;
    console.log(idOfWordBeingLookedAt + " COMP TO: " + (previouslyReadWordIndex + fieldOfViewError));
    if(readingAtCorrectPace || tooManyReadingJumpErrors) { //ensures reader is not jumping text
        console.log(readingAtCorrectPace);
        //highlights words not currently being read
        for(let highlightIndex = previouslyReadWordIndex; highlightIndex <= endOfFieldOfView; highlightIndex++) {
            let wordId = wordIdPrefix + highlightIndex;
            let wordInFieldOfView = document.getElementById(wordId);
            let alreadyUnhighlighted = highlighted(wordInFieldOfView, unhighlightColor);
            if(!alreadyUnhighlighted && wordInFieldOfView != null)
                wordInFieldOfView.style.backgroundColor = unhighlightColor;
        }
        previouslyReadWordIndex = idOfWordBeingLookedAt;
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
        wordsOnPage.push(word);
    }
    fieldOfViewErrorCounter = 0; //reset error counter
    wordsOnPage = $("#" + pdfHolderId).find("span");
    // updateWordVariables()
}