#!/usr/bin/env bash
set -e

NODE_ENV=production node_modules/.bin/webpack --config webpack.config.bundle.js &
NODE_ENV=production node_modules/.bin/webpack --config webpack.config.bundle.js --minify &
wait
