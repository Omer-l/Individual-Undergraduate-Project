/** Determines whether a word is already highlighted */
function highlighted(word, color) {
    if(word != null)
        return word.style.backgroundColor == color;
    else
        return false;
}

/** Highlights words in the field of view */
function highlight(word) {
    indexInPdfWordsArray = getWordStartingIndexInPdfWordsArray(word.id);
    let startOfFieldOfView = indexInPdfWordsArray - fieldOfView;
    let endOfFieldOfView = indexInPdfWordsArray + fieldOfView;
    //Highlights actively read
    for(let highlightIndex = startOfFieldOfView; highlightIndex <= endOfFieldOfView; highlightIndex++) {
        let wordId = pdfWords[highlightIndex].id;
        let wordInFieldOfView = document.getElementById(wordId);
        if(wordInFieldOfView != null) {
            wordInFieldOfView.style.backgroundColor = highlightColor;
            console.log("WordNumber: " + highlightIndex);
        }
    }
}

/** Removes highlightColor from words that have been read and moved away from the field of view */
function unhighlight(word) {
    indexInPdfWordsArray = getWordStartingIndexInPdfWordsArray(word.id);
    let startOfFieldOfView = indexInPdfWordsArray - fieldOfView < 0 ? 0 : indexInPdfWordsArray  - fieldOfView;
    let endOfFieldOfView = indexInPdfWordsArray + fieldOfView;
    //unhighlights words not currently being read
    for(let unhighlightIndex = startOfFieldOfView; unhighlightIndex <= endOfFieldOfView; unhighlightIndex++) {
        let wordId =  pdfWords[unhighlightIndex].id;
        let wordInFieldOfView = document.getElementById(wordId);
        if(unhighlightIndex > previouslyReadWordIndex && wordInFieldOfView != null)
            wordInFieldOfView.style.backgroundColor = backgroundColor;
        else if(wordInFieldOfView != null)
            wordInFieldOfView.style.backgroundColor = unhighlightColor;
    }
    //Unhighlights all previous words
    let readingAtCorrectPace = indexInPdfWordsArray <= previouslyReadWordIndex + fieldOfViewError &&
        indexInPdfWordsArray >= previouslyReadWordIndex;
    let tooManyReadingJumpErrors = fieldOfViewErrorCounter == maximumFieldOfViewError;
    console.log(indexInPdfWordsArray + " COMP TO: " + (previouslyReadWordIndex + fieldOfViewError));
    if(readingAtCorrectPace || tooManyReadingJumpErrors) { //ensures reader is not jumping text
        // let previouslyReadWord = indexInPdfWordsArray < previouslyReadWordIndex;
        // if(tooManyReadingJumpErrors)
        //     wordCount = 0;

        //highlights words not currently being read
        for(let highlightIndex = previouslyReadWordIndex; highlightIndex <= endOfFieldOfView; highlightIndex++) {
            let wordId = pdfWords[highlightIndex].id;
            let wordInFieldOfView = document.getElementById(wordId);
            let alreadyUnhighlighted = highlighted(wordInFieldOfView, unhighlightColor);
            if(!alreadyUnhighlighted && wordInFieldOfView != null) {
                wordInFieldOfView.style.backgroundColor = unhighlightColor;
                wordCount++;
                console.log(wordCount);
            }
        }
        previouslyReadWordIndex = indexInPdfWordsArray;
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