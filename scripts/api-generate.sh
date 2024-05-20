#!/bin/bash

INPUT_FILE="./asyncapi.yaml"
OUTPUT_DIR="./.output/ws"
TEMPLATE="./sub_modules/asyncapi-generator-template-ts"

# Install dependencies
#npm ci --prefix ./sub_modules/asyncapi-generator-template-ts
ag ${INPUT_FILE} ${TEMPLATE} \
  --force-write \
  --output ${OUTPUT_DIR} \
  -p output=${OUTPUT_DIR}
