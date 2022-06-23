#!/usr/bin/env node

const process = require("process");
const tesseract = require("tesseract.js");

tesseract
  .recognize("tests/img-to-text/img-to-text.png", "deu+eng", {
    logger: (m) => console.log(m),
  })
  .then(({ data: { text } }) => {
    console.log(text);
  });
