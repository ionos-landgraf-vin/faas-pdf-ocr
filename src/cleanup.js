const path = require("path");
const fs = require("fs");

exports.Cleanup = async (job) => {
  filesToRemove = [job.vars.localFilename, ...job.vars.imageLocations, ...job.vars.pdfLocations, job.vars.finalPDFWithTextLocation];
  for (file of filesToRemove){
    fs.unlinkSync(file);
  }
};
