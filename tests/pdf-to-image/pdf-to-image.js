var ConvertPDFtoImages = require("../../src/get-img-from-pdf").ConvertPDFtoImages;

const job = {
  vars: {
    localFilename: "./tests/pdf-to-image/DummyPDF/sample.pdf",
    outputImages: [],
  },
};

ConvertPDFtoImages(job);
