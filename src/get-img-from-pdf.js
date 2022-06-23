var fs = require("fs");
var pdf2img = require("pdf-img-convert");

exports.ConvertPDFtoImages = async (job) => {
  var imageLocations = await pdf2img.convert(job.vars.localFilename);
  for (i = 0; i < imageLocations.length; i++) {
    const filename = "output" + i + ".png";
    fs.writeFileSync(filename, imageLocations[i]);
    job.vars.imageLocations.push(filename);
  }
};
