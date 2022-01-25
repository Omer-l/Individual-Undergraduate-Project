function addToSVG(pageContent) {
    var svgNS = "http://www.w3.org/2000/svg";
    var newText = document.createElementNS(svgNS,"text");
    newText.setAttributeNS(null,"x",200);
    newText.setAttributeNS(null,"y",350);
    newText.setAttributeNS(null,"font-size","50");
    var textNode = document.createTextNode(pageContent);
    newText.appendChild(textNode);
    document.getElementById("output").appendChild(newText);
}