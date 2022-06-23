var fs = require("fs");
var pdf2img = require("pdf-img-convert");
var path = require('path');
var os = require('os')

exports.ConvertPDFtoImages = async (job) => {
  var imageLocations = await pdf2img.convert(job.vars.localFilename, {
    width: 1500,
  });
  for (i = 0; i < imageLocations.length; i++) {
    const filename = path.join(
      os.tmpdir(),
      "output" + i + ".png"
      );
    fs.writeFileSync(filename, imageLocations[i]);
    job.vars.imageLocations.push(filename);
  }
};
