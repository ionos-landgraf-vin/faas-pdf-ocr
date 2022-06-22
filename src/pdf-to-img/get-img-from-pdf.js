
var fs = require('fs');
var pdf2img = require('pdf-img-convert');

var outputImages1 = pdf2img.convert('src/pdf-to-img/DummyPDF/Unbenannt 1.pdf');

outputImages1.then(function(outputImages) {
    for (i = 0; i < outputImages.length; i++)
        fs.writeFile("./out/output"+i+".png", outputImages[i], function (error) {
          if (error) { console.error("Error: " + error); }
        });
    });