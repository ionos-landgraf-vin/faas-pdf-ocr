var Cleanup = require('../src/cleanup').Cleanup;

job = {
    vars:{
        localFilename: '', 
        imageLocations: ['input.png', 'input2.png'], 
        pdfLocations:  ['input.png.pdf', 'input2.png.pdf'], 
        finalPDFWithTextLocation: 'output.pdf'
    }
}

Cleanup(job);