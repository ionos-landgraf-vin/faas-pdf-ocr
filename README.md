# faas-pdf-ocr

# development

## installation

- install correct node version

  - initial use : `nvm install`

  - all further installations : `nvm use`

- install dependencies : `npm ci`

## tests

Create individual test cases in individual directories inside directory `tests`.

## config

Done via environnement variables:

    IONOS_S3_KEY_ID="..."
    IONOS_ACCESS_KEY="...."
    IONOS_S3_REGION="eu-central-2"
    IONOS_S3_ENDPOINT="s3-eu-central-1.ionoscloud.com"
    IONOS_S3_BUCKET="..."
