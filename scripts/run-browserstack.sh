# Only run this script if we're on `master` and not sourced from a PR
if [ "$TRAVIS_PULL_REQUEST" = "false" ] && [ "$TRAVIS_BRANCH" = "master" ]; then
	npm run test-browserstack && npm run test-acceptance
fi
