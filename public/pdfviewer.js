let highlightColor = "yellow";
let unhighlightColor = "lightblue";
let fieldOfView = 1;
let wordPrefix = "w";

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
    for(let highlightIndex = startOfFieldOfView; highlightIndex <= endOfFieldOfView; highlightIndex++) {
        let wordId = wordPrefix + highlightIndex;
        let wordInFieldOfView = document.getElementById(wordId);
        wordInFieldOfView.style.backgroundColor = highlightColor;
    }
}

/** Removes highlightColor from words that have been read and moved away from the field of view */
function unhighlight(word) {
    let idOfWordBeingLookedAt = getWordNumber(word);
    let startOfFieldOfView = idOfWordBeingLookedAt - fieldOfView;
    let endOfFieldOfView = idOfWordBeingLookedAt + fieldOfView;
    for(let highlightIndex = startOfFieldOfView; highlightIndex <= endOfFieldOfView; highlightIndex++) {
        let wordId = wordPrefix + highlightIndex;
        let wordInFieldOfView = document.getElementById(wordId);
        wordInFieldOfView.style.backgroundColor = unhighlightColor;
    }
}