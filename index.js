const pdf = require('pdfjs')
const fs = require('fs')

const MergePagesToOnePDF = async (job) => {
    const doc = new pdf.Document({})
    for (path of job.vars.pdfLocations) {
        const src = fs.readFileSync(path)
        const ext = new pdf.ExternalDocument(src)
        doc.addPagesOf(ext)
    }
    doc.pipe(fs.createWriteStream(job.vars.finalPDFWithTextLocation))
    await doc.end();
}

var pipeline = [
  DownloadFileFromS3,
  ConvertPDFtoImages,
  ExtractTextFromImageAndConvertToPDF,
  MergePagesToOnePDF,
  UploadPDFToS3,
];

exports.handler = async function (event, context) {
  var job = {
    event: event, // original from request
    context: context, // original from request
    vars: {
      localFilename: "", // location of the file on disk
      s3Location: "", // s3 location of the file
      s3client: null, // shared between upload/download
      imageLocations: [], // locations of the images on disk
      pdfLocations: [], // locations of the generated pdf files
      finalPDFWithTextLocation: "", // location of the merged pdf with text
      metadata: {},
    },
    env: process.env,
  };

  for (fn of pipeline) {
    fn(job);
  }

  console.log(JSON.stringify(job.vars.metadata));
};
