# Lucid Contributions

First of all, thank you for contributing. It’s appreciated.

1. Clone the repo and install dependencies with `npm install`.
2. Make a GitHub issue before doing any significant amount of work.
3. Run `npm test` to lint and test. Don't commit before fixing all errors and warnings.
4. Reference the issue's number in your commit. E.g.: "Did this #12"
5. Make a pull request.

Below is a running list of conventions we are establishing:

- Process
  - All PRs should start with [semver-major/minor/patch/none]
  - Branches should follow this convention (where 1234 is either a github PR or
    an anxr ticket):
    - feature/1234-description-here
    - bugfix/1234-fixed-something
    - refactor/1234-did-something
    - release/2.0.0
- Component structure
  - Use `isX` or `hasX` props for boolean types even when it differs from
    native
  - Make sure all components allow `className` and `style` to be extended for
    consumer convenience
  - Use `onX` props for all event handlers
    - `onVerbNoun` structure
  - Use `handleX` methods for event handlers
  - Handlers that are passing through to native handlers should include the
    `event` as the last argument
  - If the component is a thin wrapper around a native control, be sure to pass
    through any extra props through to the native component.
  - Stateless by default, uses the reducer pattern for stateful components
  - Prefer `span`s for root level component elements
- Styling
  - Css classes used for state, such as `.is-active`, should also be prefixed
    with the component name. E.g. Button should use the class
    `lucid-Button-is-active`
- Code styling
  - createClass only, no ES6 classes
  - Folders should use kebab case e.g.
    "this-is-a-folder/and-a-javascript-file.js"
  - Components should use start case e.g.:
    - "MyComponent"
    - "AnotherComponentHere.jsx"
- Tests
  - Components should have a `Component.spec.jsx` that lives alongside the
    component jsx file
  - Most tests should be shallow rendered using `enzyme`
  - If your tests need to be functional, i.e. using button clicks, then be sure
    to use the `describeWithDOM` util

