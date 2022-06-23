#!/usr/bin/env nodejs

require('dotenv').config();

const axios = require('axios');

var objects = {};

async function main() {
  const s3client = await require("../../src/shared-s3-client").CreateS3Client();

  for (;;) {
    const data = await listObjects(s3client);

    for (obj of  data.Contents) {
      const newObjEtag = obj.ETag.replace(/"/g, "");
      const existing = objects[obj.Key];

      if (!obj.Key.match(/.pdf$/)) {
        continue // ignore all non pdf files
      }

      if (existing) {
        if (existing == newObjEtag) {
          // same, do nothing
        } else {
          // updated
          console.log("updated", obj);
          try {
            await notify(s3client, obj);
          } catch(err) {
            console.log("failed to notify:", err.response.data)
          }
          objects[obj.Key] = newObjEtag;
        }
      } else {
        // created
        console.log("created", obj);
        try {
          await notify(s3client, obj);
        } catch(err) {
          console.log("failed to notify:", err.response.data)
        }
        objects[obj.Key] = newObjEtag;
      }
    }
    
    await sleep(1000);
  }
}

async function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve();
    }, ms)
  })
}

async function listObjects(s3client) {
  return new Promise((resolve, reject) => {
    s3client.s3.listObjects({
      Bucket: s3client.bucket, 
      MaxKeys: 1000,
    }, function(err, data) {
      if (err) {
        console.error(err);
        reject(err);
      }

      resolve(data);
    });
  })
}

async function notify(s3client, obj) {
  const event = {
    "Records": [
      {
        "eventVersion": "2.0",
        "eventSource": "aws:s3",
        "awsRegion": s3client.region,
        "eventTime": obj.LastModified,
        "eventName": "ObjectCreated:Put",
        "userIdentity": {
          "principalId": obj.Owner.ID,
        },
        "requestParameters": {
          "sourceIPAddress": "127.0.0.1"
        },
        "responseElements": {
          "x-amz-request-id": "-",
          "x-amz-id-2": "-"
        },
        "s3": {
          "s3SchemaVersion": "1.0",
          "configurationId": "static-s3-watcher",
          "bucket": {
              "name": s3client.bucket,
              "ownerIdentity": {
              "principalId": obj.Owner.ID,
              },
              "arn": "arn:aws:s3:::" + s3client.bucket,
          },
          "object": {
            "key": obj.Key,
            "size": obj.Size,
            "versionId": "-",
            "eTag": obj.ETag.replace(/"/g, ""),
            "sequencer": "-"
          }
        }
      }
    ]
  };

  var resp = await axios.post(process.env.IONOS_FAAS_ENDPOINT, event, {
    headers: {
      "api-key": process.env.IONOS_FAAS_APIKEY,
      "Content-Type": "application/json",
    },
  });

  return resp;
} 

main();
