let connection = new WebSocket("wss://d6ofnknxme.execute-api.us-east-1.amazonaws.com/prod");

//Log errors
connection.onerror = function (error) {
    console.log("WebSocket Error: " + JSON.stringify(error));
}

connection.onopen = function(event) {
    console.log("Connected: " + JSON.stringify(event));
    // TODO DEL
    // let testString = "Gulls, or colloquially seagulls, are seabirds of the family Laridae in the suborder Lari. They are most closely related to the terns and only distantly related to auks, skimmers and even more distantly to waders.";
    // let sentences = extractSentences(testString); //2 sentences
    // getQuiz(sentences);
}

connection.onmessage = function(msg) {
    // console.log("for TESTING: "  + msg.data);
    let sentencesSyntaxAnalsis = JSON.parse(msg.data);
    console.log(sentencesSyntaxAnalsis);
    generateQuiz(sentencesSyntaxAnalsis.data);
}

function getQuiz(sentences) {
    loadingScreen(true);
    let messageObject = {
        sendData: "analyseText",
        data: sentences
    }
    //Send message TODO
    connection.send(JSON.stringify(messageObject));

    //Log result
    console.log("Message sent: " + JSON.stringify(messageObject));

    // TODO DEL
    // let sentencesSyntaxAnalsis = JSON.parse('{"data":[{"SyntaxTokens":[{"TokenId":1,"Text":"Gulls","BeginOffset":0,"EndOffset":5,"PartOfSpeech":{"Tag":"NOUN","Score":0.6037513017654419}},{"TokenId":2,"Text":",","BeginOffset":5,"EndOffset":6,"PartOfSpeech":{"Tag":"PUNCT","Score":0.9999974966049194}},{"TokenId":3,"Text":"or","BeginOffset":7,"EndOffset":9,"PartOfSpeech":{"Tag":"CONJ","Score":0.9999995231628418}},{"TokenId":4,"Text":"colloquially","BeginOffset":10,"EndOffset":22,"PartOfSpeech":{"Tag":"ADV","Score":0.9754641056060791}},{"TokenId":5,"Text":"seagulls","BeginOffset":23,"EndOffset":31,"PartOfSpeech":{"Tag":"NOUN","Score":0.9792764186859131}},{"TokenId":6,"Text":",","BeginOffset":31,"EndOffset":32,"PartOfSpeech":{"Tag":"PUNCT","Score":0.9999996423721313}},{"TokenId":7,"Text":"are","BeginOffset":33,"EndOffset":36,"PartOfSpeech":{"Tag":"VERB","Score":0.9890145659446716}},{"TokenId":8,"Text":"seabirds","BeginOffset":37,"EndOffset":45,"PartOfSpeech":{"Tag":"NOUN","Score":0.9997709393501282}},{"TokenId":9,"Text":"of","BeginOffset":46,"EndOffset":48,"PartOfSpeech":{"Tag":"ADP","Score":0.999203622341156}},{"TokenId":10,"Text":"the","BeginOffset":49,"EndOffset":52,"PartOfSpeech":{"Tag":"DET","Score":0.9999943971633911}},{"TokenId":11,"Text":"family","BeginOffset":53,"EndOffset":59,"PartOfSpeech":{"Tag":"NOUN","Score":0.9987234473228455}},{"TokenId":12,"Text":"Laridae","BeginOffset":60,"EndOffset":67,"PartOfSpeech":{"Tag":"PROPN","Score":0.9655162692070007}},{"TokenId":13,"Text":"in","BeginOffset":68,"EndOffset":70,"PartOfSpeech":{"Tag":"ADP","Score":0.9999232292175293}},{"TokenId":14,"Text":"the","BeginOffset":71,"EndOffset":74,"PartOfSpeech":{"Tag":"DET","Score":0.9999959468841553}},{"TokenId":15,"Text":"suborder","BeginOffset":75,"EndOffset":83,"PartOfSpeech":{"Tag":"NOUN","Score":0.923448383808136}},{"TokenId":16,"Text":"Lari","BeginOffset":84,"EndOffset":88,"PartOfSpeech":{"Tag":"PROPN","Score":0.990548312664032}}]},{"SyntaxTokens":[{"TokenId":1,"Text":"They","BeginOffset":1,"EndOffset":5,"PartOfSpeech":{"Tag":"PRON","Score":0.999972939491272}},{"TokenId":2,"Text":"are","BeginOffset":6,"EndOffset":9,"PartOfSpeech":{"Tag":"VERB","Score":0.5397569537162781}},{"TokenId":3,"Text":"most","BeginOffset":10,"EndOffset":14,"PartOfSpeech":{"Tag":"ADV","Score":0.9901806116104126}},{"TokenId":4,"Text":"closely","BeginOffset":15,"EndOffset":22,"PartOfSpeech":{"Tag":"ADV","Score":0.9999079704284668}},{"TokenId":5,"Text":"related","BeginOffset":23,"EndOffset":30,"PartOfSpeech":{"Tag":"ADJ","Score":0.7710780501365662}},{"TokenId":6,"Text":"to","BeginOffset":31,"EndOffset":33,"PartOfSpeech":{"Tag":"ADP","Score":0.9996366500854492}},{"TokenId":7,"Text":"the","BeginOffset":34,"EndOffset":37,"PartOfSpeech":{"Tag":"DET","Score":0.9999669790267944}},{"TokenId":8,"Text":"terns","BeginOffset":38,"EndOffset":43,"PartOfSpeech":{"Tag":"NOUN","Score":0.999131977558136}},{"TokenId":9,"Text":"and","BeginOffset":44,"EndOffset":47,"PartOfSpeech":{"Tag":"CONJ","Score":0.9999988079071045}},{"TokenId":10,"Text":"only","BeginOffset":48,"EndOffset":52,"PartOfSpeech":{"Tag":"ADV","Score":0.9179707765579224}},{"TokenId":11,"Text":"distantly","BeginOffset":53,"EndOffset":62,"PartOfSpeech":{"Tag":"ADV","Score":0.9993985891342163}},{"TokenId":12,"Text":"related","BeginOffset":63,"EndOffset":70,"PartOfSpeech":{"Tag":"VERB","Score":0.917506217956543}},{"TokenId":13,"Text":"to","BeginOffset":71,"EndOffset":73,"PartOfSpeech":{"Tag":"ADP","Score":0.9969712495803833}},{"TokenId":14,"Text":"auks","BeginOffset":74,"EndOffset":78,"PartOfSpeech":{"Tag":"NOUN","Score":0.9977808594703674}},{"TokenId":15,"Text":",","BeginOffset":78,"EndOffset":79,"PartOfSpeech":{"Tag":"PUNCT","Score":0.9999984502792358}},{"TokenId":16,"Text":"skimmers","BeginOffset":80,"EndOffset":88,"PartOfSpeech":{"Tag":"NOUN","Score":0.9996113181114197}},{"TokenId":17,"Text":"and","BeginOffset":89,"EndOffset":92,"PartOfSpeech":{"Tag":"CONJ","Score":0.9999998807907104}},{"TokenId":18,"Text":"even","BeginOffset":93,"EndOffset":97,"PartOfSpeech":{"Tag":"ADV","Score":0.9989027976989746}},{"TokenId":19,"Text":"more","BeginOffset":98,"EndOffset":102,"PartOfSpeech":{"Tag":"ADV","Score":0.9872953295707703}},{"TokenId":20,"Text":"distantly","BeginOffset":103,"EndOffset":112,"PartOfSpeech":{"Tag":"ADV","Score":0.9792769551277161}},{"TokenId":21,"Text":"to","BeginOffset":113,"EndOffset":115,"PartOfSpeech":{"Tag":"ADP","Score":0.958304762840271}},{"TokenId":22,"Text":"waders","BeginOffset":116,"EndOffset":122,"PartOfSpeech":{"Tag":"NOUN","Score":0.9990425705909729}}]}]} ').data;
    // console.log(sentencesSyntaxAnalsis);
    // sentencesForQuizzing = sentencesSyntaxAnalsis;
    // let questions = generateQuiz(sentencesSyntaxAnalsis);
    // console.log(questions);
}