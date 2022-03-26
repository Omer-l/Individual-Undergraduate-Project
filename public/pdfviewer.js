let highlightColor = "yellow"; //Word currently being read
let unhighlightColor = "lightblue"; //already read words
let backgroundColor = "white";
let fieldOfView = 1; //how much the user can read in field of view
let wordIdPrefix = "w"; //Prefix of word's DOM element ID
let previouslyReadWordIndex = 0; //For highlighting the words correctly, to prevent accidental jumps in reading
let fieldOfViewError = fieldOfView + 1; //Room for error in reading accident jumps

/** Gets word number from an id i.e., w4 would return 4*/
function getWordNumber(word) {
    word = word.id.substring(1);
    return parseInt(word);
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
    let startOfFieldOfView = idOfWordBeingLookedAt - fieldOfView;
    let endOfFieldOfView = idOfWordBeingLookedAt + fieldOfView;
    //unhighlights words not currently being read
    for(let unhighlightIndex = startOfFieldOfView; unhighlightIndex <= endOfFieldOfView; unhighlightIndex++) {
        let wordId = wordIdPrefix + unhighlightIndex;
        let wordInFieldOfView = document.getElementById(wordId);
        wordInFieldOfView.style.backgroundColor = backgroundColor;
    }
    //Unhighlights all previous words
    let readingAtCorrectPace = idOfWordBeingLookedAt <= previouslyReadWordIndex + fieldOfViewError;
    console.log(idOfWordBeingLookedAt + " COMP TO: " + (previouslyReadWordIndex + fieldOfViewError));
    if(readingAtCorrectPace) { //ensures reader is not jumping text
        previouslyReadWordIndex = idOfWordBeingLookedAt;
        console.log(readingAtCorrectPace);
        //highlights words not currently being read
        for(let highlightIndex = previouslyReadWordIndex - 1; highlightIndex <= endOfFieldOfView; highlightIndex++) {
            let wordId = wordIdPrefix + highlightIndex;
            let wordInFieldOfView = document.getElementById(wordId);
            let highlighted = wordInFieldOfView.style == unhighlightColor;
            if(!highlighted)
                wordInFieldOfView.style.backgroundColor = unhighlightColor;
        }
    }

}