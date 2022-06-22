exports.schema = {
    "type": "object",
    "properties": {
      "Records": {
        "type": "array",
        "minItems": 1,
        "items": {
            "type": "object",
            "properties": {
              "eventVersion": {
                "type": "string"
              },
              "eventSource": {
                "type": "string"
              },
              "awsRegion": {
                "type": "string"
              },
              "eventTime": {
                "type": "string"
              },
              "eventName": {
                "type": "string"
              },
              "userIdentity": {
                "type": "object",
                "properties": {
                  "principalId": {
                    "type": "string"
                  }
                },
                "required": [
                  "principalId"
                ]
              },
              "requestParameters": {
                "type": "object",
                "properties": {
                  "sourceIPAddress": {
                    "type": "string"
                  }
                },
                "required": [
                  "sourceIPAddress"
                ]
              },
              "responseElements": {
                "type": "object",
                "properties": {
                  "x-amz-request-id": {
                    "type": "string"
                  },
                  "x-amz-id-2": {
                    "type": "string"
                  }
                },
                "required": [
                  "x-amz-request-id",
                  "x-amz-id-2"
                ]
              },
              "s3": {
                "type": "object",
                "properties": {
                  "s3SchemaVersion": {
                    "type": "string"
                  },
                  "configurationId": {
                    "type": "string"
                  },
                  "bucket": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string"
                      },
                      "ownerIdentity": {
                        "type": "object",
                        "properties": {
                          "principalId": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "principalId"
                        ]
                      },
                      "arn": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "name",
                      "ownerIdentity",
                      "arn"
                    ]
                  },
                  "object": {
                    "type": "object",
                    "properties": {
                      "key": {
                        "type": "string"
                      },
                      "size": {
                        "type": "integer"
                      },
                      "versionId": {
                        "type": "string"
                      },
                      "eTag": {
                        "type": "string"
                      },
                      "sequencer": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "key",
                      "size",
                      "versionId",
                      "eTag",
                      "sequencer"
                    ]
                  }
                },
                "required": [
                  "s3SchemaVersion",
                  "configurationId",
                  "bucket",
                  "object"
                ]
              }
            },
            "required": [
              "eventVersion",
              "eventSource",
              "awsRegion",
              "eventTime",
              "eventName",
              "userIdentity",
              "requestParameters",
              "responseElements",
              "s3"
            ]
        }
      }
    },
    "required": [
      "Records"
    ]
};
