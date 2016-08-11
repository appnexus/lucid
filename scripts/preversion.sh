#!/bin/bash

# exit with nonzero exit code if anything fails
set -e

export TZ=UTC

# Clean, then run linting and tests
npm run clean
gulp lint test

# Clean again, then run the build
npm run clean
gulp build-css build-js
