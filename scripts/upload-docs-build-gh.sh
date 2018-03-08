#!/bin/bash

# exit with nonzero exit code if anything fails
set -e

# Get the current branch name
CURRENT_BRANCH=`git symbolic-ref -q --short HEAD`

# Only run this script if we're on `master`
if [ "$CURRENT_BRANCH" = "master" ]; then
	cd ./dist/docs
	git init

	# The first and only commit to this new Git repo contains all the
	# files present with the commit message "Deploy to GitHub Pages".
	git add .
	git commit -m "Deploy to GitHub Pages"

	# Force push from the current repo's master branch to the remote
	# repo's gh-pages branch. (All previous history on the gh-pages branch
	# will be lost, since we are overwriting it.) We redirect any output to
	# /dev/null to hide any sensitive credential data that might otherwise be exposed.
	git push --force --quiet "git@github.com:appnexus/lucid.git" master:gh-pages > /dev/null 2>&1
fi

