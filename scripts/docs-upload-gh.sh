#!/bin/bash

# exit with nonzero exit code if anything fails
set -e

# This script is meant to be run by Travis CI. It leverages an encrypted token
# to commit our built static documentation to the `gh-pages` branch of our
# repo. It was heavily inspired by https://gist.github.com/domenic/ec8b0fc8ab45f39403dd

# Only run this script if we're on `master` and not sourced from a PR
if [ "$TRAVIS_PULL_REQUEST" = "false" ] && [ "$TRAVIS_BRANCH" = "master" ]; then
	# Clear out the old docs if they exist
	rm -rf ./dist/docs

	# Build the new docs
	gulp docs-build

	cd ./dist/docs
	git init

	# inside this git repo we'll pretend to be a new user
	git config user.name "Travis CI"
	git config user.email "jdelamotte@appnexus.com"

	# The first and only commit to this new Git repo contains all the
	# files present with the commit message "Deploy to GitHub Pages".
	git add .
	git commit -m "Deploy to GitHub Pages"

	# Force push from the current repo's master branch to the remote
	# repo's gh-pages branch. (All previous history on the gh-pages branch
	# will be lost, since we are overwriting it.) We redirect any output to
	# /dev/null to hide any sensitive credential data that might otherwise be exposed.
	git push --force --quiet "https://${GH_TOKEN}@github.com/appnexus/lucid" master:gh-pages > /dev/null 2>&1
fi

