#!/bin/bash

# exit with nonzero exit code if anything fails
set -e

! grep -r --include "*.spec.*" "\.only" src
