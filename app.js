const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

const pdfKit = require("pdfkit");

app.get("/generate-pdf", (req, res) => {
  res.setHeader("Content-Type", "application/pdf");
  const pdfDoc = new pdfKit();

  // Optional, if you want to save to server also
  const fs = require("fs");
  const path = require("path");
  const filePath = path.join(require.main.path, "pdfs", "a.pdf");
  pdfDoc.pipe(fs.createWrite  Stream(filePath));

  pdfDoc.pipe(res);
  pdfDoc.fontSize(26).fillColor("blue").text("Hello", {
    underline: true,
    onmouseclick: ''
  });
  pdfDoc.end();
});

app.use("/", (req, res) => {
  res.render("index");
});

app.listen(8080);
