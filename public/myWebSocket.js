let connection = new WebSocket("wss://d6ofnknxme.execute-api.us-east-1.amazonaws.com/prod");

//Log errors
connection.onerror = function (error) {
    console.log("WebSocket Error: " + JSON.stringify(error));
}

connection.onopen = function(event) {
    console.log("Connected: " + JSON.stringify(event));
    getQuiz(["HELLO", " DARKNESS", " MY",  " OLD", " FRIEND"]);
}

connection.onmessage = function(msg) {
    let message = msg.data;
    console.log(message);
}

function getQuiz(words) {
    wordsJoined = putWordsTogether(words);
    let messageObject = {
        sendData: "analyseText",
        data: "words"
    }
    //Send message TODO
    connection.send(JSON.stringify(messageObject));

    //Log result
    console.log("Message sent: " + JSON.stringify(messageObject));
}