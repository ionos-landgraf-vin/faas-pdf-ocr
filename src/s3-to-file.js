var ssc = require("./shared-s3-client");

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

