# faas-pdf-ocr

# development

## installation

- install correct node version

  - initial use : `nvm install`

  - all further installations : `nvm use`

- install dependencies : `npm ci`

## ocr

Language specific training data files (`*.traineddata`) should be located within the root level directory.

It's recommended to save them here (for performance reasons), otherwise they will get downloaded everytime the faas function get's spawned in a new container.

Trainingdata can be downloaded from here : https://github.com/tesseract-ocr/tessdata

## tests

Create individual test cases in individual directories inside directory `tests`.

## config

Done via environnement variables:

    IONOS_S3_KEY_ID="..."
    IONOS_ACCESS_KEY="...."
    IONOS_S3_REGION="eu-central-2"
    IONOS_S3_ENDPOINT="s3-eu-central-1.ionoscloud.com"
    IONOS_S3_BUCKET="..."

### watcher

Configure the FaaS function with environment variables:

    IONOS_FAAS_ENDPOINT="..."
    IONOS_FAAS_APIKEY="..."
