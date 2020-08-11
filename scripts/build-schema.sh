#!/bin/bash

node ./node_modules/.bin/ts-json-schema-generator --path 'src/**/*.ts' --type 'UserConfig' --tsconfig './tsconfig.json' > src/utils/validateUserConfig/schema.json
