let highlightColor = "yellow";
let unhighlightColor = "lightblue";

function highlight(word) {
    word.style.backgroundColor = highlightColor;
    let id = word.id;
    let prevWord = document.getElementById("" + (id - 1));
    prevWord.style.backgroundColor = highlightColor;
}

function unhighlight(word) {
    word.style.backgroundColor = unhighlightColor;
    let id = word.id;
    let prevWord = document.getElementById("" + (id - 1));
    prevWord.style.backgroundColor = unhighlightColor;
}