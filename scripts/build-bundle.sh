#!/usr/bin/env bash
set -e

node_modules/.bin/webpack --config webpack.config.bundle.js &
node_modules/.bin/webpack --config webpack.config.bundle.js --minify &
wait
