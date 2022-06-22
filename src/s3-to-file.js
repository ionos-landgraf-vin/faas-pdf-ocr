var ssc = require("./shared-s3-client");

exports.DownloadFileFromS3 = function(job) {
  // parse request
  let requestBody = JSON.parse(job.event.body);

  ssc.s3.headObject({
    Bucket: ssc.bucket,
    Key: 'API Key.txt'
  }, function(err, data) {
    if (err) {
      console.log("doesn't exist", err);
      return;
    }
    console.log("exist");
  });
}
