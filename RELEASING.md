# Releasing Lucid UI

Lucid UI is released to NPM as a public module.

- The Lucid repo is at: https://github.com/appnexus/lucid <https://github.com/appnexus/lucid>.
- The Lucid NPM package is at: https://www.npmjs.com/package/lucid-ui <https://www.npmjs.com/package/lucid-ui>.

## Installation Requirements

- `node@10.x.x`: You can use `nvm` or otherwise to manage node versions.
- `npm@>=6.0.0`: Use `npm i -g npm` to update your npm version.
- `git`: You probably already have this.

## Release Requirements

- An authorized corporate npm account.
- `ssh` setup on GitHub. To check your credentials: `git remote -v`.

## Prerelease Check

Before updating the documentation and releasing to npm, follow these steps:

1. `git pull origin master`: Ensure that `master` is clean and in sync with GitHub.
2. `npm install`: Ensure that you have the latest dependencies.
3. `npm run test`: Run the test suite--if you need to update the Jest snapshots: `npm run snapshot`.
4. `npm login`: Ensure that you're logged into the npm registry at: https://registry.npmjs.org/ <https://registry.npmjs.org/>.

## Update Documentation

Document the changes contained in the release:

1. `git log`. Find and add each merged pull request (PR) since the last release and add it to the changelog.
2. `CHANGELOG.md`: Add details about the release--each PR gets a GitHub PR label, semver label, and short description.
3. At the end of the list of new `CHANGELOG.md` pull requests, add a link to the GitHub Lucid repo where people can compare the current changes to the previous version. For example:

```
https://github.com/appnexus/lucid/compare/v5.6.1...v5.7.0
```

4. Add and commit the `CHANGELOG.md` updates. For example: `git commit -am "Update the Changelog"`.

## Update Version Number

1. Based on the changes made, determine a suitable version number for the release.

We follow [semver](https://semver.org/), which prescribes that:

- `semver-major`: Breaking changes are "major" (the left-most number).
- `semver-minor`: Features are "minor" versions (the middle number).
- `semver-patch`: Fixes are a "patch" version (the right-most number).
- `semver-none`: Changes to documentation, or other changes that don't impact the api or consumers get a "none" label.

The recommended option is to update the version number using `npm version ...`.

2. Use `npm` to publish the new NPM version that matches the version number and type of change (major, minor or patch) in `package.json`--this process creates tags for you and updates the `package-json` and `package-lock.json` automatically.

- `npm version major`
- `npm version minor`
- `npm version patch`

3. Push the changes and tags: `git push origin master --follow-tags`. Note that by default, the `git push` command alone doesn't transfer tags to the repository.

Another option is to update the version number manually:

1. Update the value of the `"version"` field for Lucid in `package-json` and `package-lock.json`.
2. Commit the documentation and `package-` changes. For example: `git commit -a -m "update documentation"`.
3. Create a tag: `git tag {version number}`. For example: `git tag v5.4.0`.
4. Push the tags. For example: `git push origin v5.4.0`.

Before publishing Lucid to the the npm registry, please check that the [Lucid repo](https://github.com/appnexus/lucid) has the latest tags.

## Publish Lucid to npm

1. Publish the new Lucid version to npm: `npm publish`.

Check the [npm registry](https://www.npmjs.com/package/lucid-ui) to make sure that it published the latest version of Lucid.
