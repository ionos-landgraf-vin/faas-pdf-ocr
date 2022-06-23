var fs = require('fs');
var pdf2img = require('pdf-img-convert');

exports.ConvertPDFtoImages = async (job) => {
  var outputImages = await pdf2img.convert(job.vars.localFilename);
  for (i = 0; i < outputImages.length; i++){
    const filename = "output"+i+".png";
    fs.writeFileSync(filename, outputImages[i]);
    job.vars.outputImages.push(filename);
  }
}