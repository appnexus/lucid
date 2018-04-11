#!/usr/bin/env bash
set -e

NODE_ENV=development `npm bin`/webpack --config webpack.config.bundle.js &
NODE_ENV=production `npm bin`/webpack --config webpack.config.bundle.js &
wait
