const path = require("path");
const fs = require("fs");
const os = require("os");
const { createWorker } = require("tesseract.js");

exports.ExtractTextFromImagesAndConvertToPDF = async (job) => {
  for (image of job.vars.imageLocations) {
    console.log(`Recognizing ${image}`);
    const worker = createWorker();
    console.log("load worker");
    await worker.load();
    console.log("load language");
    await worker.loadLanguage("deu+eng");
    console.log("initialize worker");
    await worker.initialize("deu+eng");
    console.log(`recognize image ${image}`);
    const {
      data: { text },
    } = await worker.recognize(image);
    console.log(`PDFText:\n${text}`);
    // job.vars.metadata.text+=text;
    const { data } = await worker.getPDF("Tesseract OCR Result");
    const filename = path.join(
      os.tmpdir(),
      `${image}.pdf`
    );
    console.log("write file");
    fs.writeFileSync(filename, Buffer.from(data));
    job.vars.pdfLocations.push(filename);
    console.log("terminate worker");
    await worker.terminate();
  }
};
