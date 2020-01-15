# Releasing Lucid UI

Lucid UI is released to the public NPM. The release workflow is similar to most npm modules.

The basic steps are:

1. Update CHANGELOG.md
2. Increment the version number of Lucid UI
3. Publish the new version to NPM
4. Publish the release

## Installation requirements

- `node@10.x.x`: You can use `nvm` or otherwise to manage node versions.
- `npm@>=6.0.0`: Use `npm i -g npm` to update your npm version.
- `git`: You probably already have this...
- `.npmrc` file in you \$HOME directory (see below) - 'check vim npmrc'
- An authorized npm account

## Versioning

Determine a suitable version number based on the changes in the release.

We follow [semver](https://semver.org/), which presrcribes that:

- None - documentation changes that don't impact consumers. no api changes.
- Fixes are a "patch" version (the right-most number).
- Features are "minor" versions (the middle number).
- Breaking changes are "major" (the left-most number).

## Releasing

Release steps:

1. `git pull origin master`: Ensure that `master` is clean and in sync with stash.
2. Go through get log and find merge pull requests - add them to the changelog
3. Release a beta version'npm version 5.5.0-beta.1'
4. `npm install`: Ensure that you have the latest dependencies.
5. `npm login`: Ensure that you're logged-in to our npm repo.
6. `vim CHANGELOG.md`: Update the changelog file with details about the release.
7. `npm publish` actually publishes from what is on disk in package json.
8. `git commit`: Commit the changelog.
9. `git push --follow-tags`

## Back-porting a fix

In cases of critical issues in legacy version of anx-react, you might have to "back-port" a fix. This is generally easiest to do if your fix is a single commit since we'll be cherry-picking commits into older branches. If the fix includes multiple commits you can, alternatively, cherry-pick multiple commits _or_ merge a branch of fixes so long as it can be merged. For the purposes of this document, we'll assume your fix is in a hypothetical commit `bada55e5`, and that the _most recent major tag_ of the version we're back-porting to is `10.10.1`.

1. `git checkout 10.10.1`: This will put you in a "detached" state, worry not we'll branch out from here.
2. `git checkout -b bugfix/backport-10-my-fix`: Create a branch name that makes sense for what you're fixing. More information can be helpful here.
3. `git cherry-pick bada55e5`: This will apply any fixes into your new branch, based off of the old version.
4. `npm run test`: This will verify things haven't broken.
5. `g push origin bugfix/backport-10-my-fix`: Push the commit to ensure it's present in the remote repository.
6. `np`: This will do all the tagging necessary. Be sure to pick a `patch` release as we don't back-port features.

## .npmrc

`npm config get registry`

The `.npmrc` file is what tells `npm` _where_ the registry is.

## What's actually going on

in package.json:
== npm prepublishOnly
== npm postpoublish

## Update ANX React

- package.json - update lucid-ui version to the latest. no carret.
- yarn (update Lucid UI and the lock file)
- add the files and commit them "bump Lucid to ..."
- branch anx-react (in case people are )
- npm version 13.7.0-beta.1
- npm publish --tag beta

## Test the Build Out

you can use an app like:
app_buyside-setup-ui
bmw

update packages
npm run typecheck: run TypeScript
npm i
