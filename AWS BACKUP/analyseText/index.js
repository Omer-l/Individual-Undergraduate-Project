//aws-sdk will be used to get DynamoDB
let AWS = require("aws-sdk");
//Import external library with websocket functions
let ws = require('websocket');

//Create instance of Comprehend
let comprehend = new AWS.Comprehend();

exports.handler = async (event) => {
    // let connectionId = event.requestContext.connectionId; TODO
    // Parameters for call to AWS Comprehend
    let params = {
        LanguageCode: "en", //Possible values include: "en", "es", "fr", "de", "it", "pt"
        Text: "I like Peas but my daddy don't"
    };
    
    
    let data = await comprehend.detectSyntax(params).promise();
    console.log(data);

    // let msg = {
    //     data : [
    //         {
    //             values: counter[0],
    //             labels: ['Positive', 'Negative', 'Neutral', 'Mixed'],
    //             type: 'pie'
    //         }, {
    //             values: counter[1],
    //             labels: ['Positive', 'Negative', 'Neutral', 'Mixed'],
    //             type: 'pie'
    //         }, {
    //             values: counter[2],
    //             labels: ['Positive', 'Negative', 'Neutral', 'Mixed'],
    //             type: 'pie'
    //         }, {
    //             values: counter[3],
    //             labels: ['Positive', 'Negative', 'Neutral', 'Mixed'],
    //             type: 'pie'
    //         }, {
    //             values: counter[4],
    //             labels: ['Positive', 'Negative', 'Neutral', 'Mixed'],
    //             type: 'pie'
    //         }
    //     ],

    //     layout : {
    //         height: 400,
    //         width: 500
    //     }
    // };
    // let msgString = JSON.stringify(msg);
    // console.log("HELLOW: " + msgString);
    // //Get promises to send messages to connected clients
    // //Get promises to send messages to connected clients
    // let sendMsgPromises = await ws.getSendMessagePromises(msgString, domainName, stage, connectionId);
    // //Execute promises
    // await Promise.all(sendMsgPromises);

    return {
        statusCode: 200,
        body: "Ok"
    };
};
