#!/bin/bash

# Windows compatibility: Escape the POSIX paths by prefixing with /
# see https://stackoverflow.com/a/62513969
INPUT_FILE="asyncapi.yaml"
OUTPUT_DIR=".output/api/docs"

docker run --rm -it \
   --user=root \
   -v /${PWD}/${INPUT_FILE}:/app/asyncapi.yml \
   -v /${PWD}/${OUTPUT_DIR}:/app/output \
   asyncapi/cli generate fromTemplate -o //app/output //app/asyncapi.yml @asyncapi/html-template --force-write
