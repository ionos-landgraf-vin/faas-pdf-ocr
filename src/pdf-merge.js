const pdf = require("pdfjs");
const fs = require("fs");

exports.MergePagesToOnePDF = async (job) => {
  const doc = new pdf.Document({});
  for (_path of job.vars.pdfLocations) {
    const src = fs.readFileSync(_path);
    const ext = new pdf.ExternalDocument(src);
    doc.addPagesOf(ext);
  }

  job.vars.finalPDFWithTextLocation = job.vars.localFilename + ".out";

  const ws = fs.createWriteStream(job.vars.finalPDFWithTextLocation);
  doc.pipe(ws);
  await doc.end();

  await new Promise((resolve, reject) => {
    try {
      ws.on("close", () => resolve());
    } catch (e) {
      reject(e);
    }
  });
};
