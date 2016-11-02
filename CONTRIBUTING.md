# Lucid Contributions

First of all, thank you for contributing. It’s appreciated.

1. Clone the repo and install dependencies with `npm install`.
2. Make a GitHub issue before doing any significant amount of work. Make sure the core team approves your idea. This step is really important. If you skip this, your PR might be rejected.
  - Be sure to check out our [Waffle board][waffle] for a kanban view of all our issues.
3. Below are some important commands for developing. Don't commit before fixing all errors and warnings.
  - `npm start` hosts the docs page and watches for changes
  - `npm test-tdd` runs tests and watches for changes, optimized for speed
4. Ensure your changes work properly on the latest versions of Chrome, Firefox, Safari, IE11, and IE Edge. Currently this step is manual.
5. Reference the issue's number in your commit. E.g.: "Did this #12".
6. Make a pull request.

## Process

- All PRs should at minimum have a label _semver-major/minor/patch/none_. This helps identify what kind of version bump the PR represents.
- Branches should follow this convention (where 1234 is a GitHub issue):
  - 1234-added-something
  - 1234-fixed-something
  - release/2.0.0
- We use an issue template that provides a check list of tasks to consider for every PR.

## Component structure

Some of our component conventions can be validated by running the `common` tests. Here's an example of how to do that:

```javascript
import { common } from '../../util/generic-tests';

import MyNewComponent from './MyNewComponent';

describe('MyNewComponent', () => {
  common(MyNewComponent);

  // Other tests...
});
```

- Use `isX` or `hasX` props for boolean types even when it differs from native.
- Make sure all components allow `className` and `style` to be extended for consumer convenience.
- Use `onX` props for all event handlers.
  - Use `onVerbNoun` structure.
- Use `handleX` methods for event handlers.
- Every component that wraps around native controls should callback with all its props for performance reasons. This allows consumers to avoid creating functions inside their `render` blocks by attaching identifiers to components that can then be extracted at callback time.
  - When the callback event is fired, the last argument should be an object with at least `event` and `props`.
  - See [this article][perf] for a more in depth explanation.
  - There is a test within the `controls` function of "generic-tests" to help test this convention.
- If the component is a thin wrapper around a native control, be sure to pass through any extra props through to the native component. Usually this is called `passThroughs` in the code.
- Stateless by default, use the reducer pattern for stateful components. Don't use `setState` in our components unless there is a very good reason.
- Prefer `span`s for root level component elements.

## Styling

- *All* css classes must be prefixed by the name of the component. E.g. `.lucid-Button-foo`.
- Css classes used for state, such as `.is-active`, should also be prefixed with the component name. E.g. `lucid-Button-is-active`.
- We have a naming convention for our props. Below is a list of examples that are valid. Please see the `variables.less` file for real world examples.

```
// In `variables.less`
@type-propName
@type-subType-propName

// In `MyExampleComponent.less` specific variables should be scoped
.lucid-MyExampleComponent {
  @type-propName
  @type-subType-propName
}
```

## Code styling

- We use our own wrapper around `createClass` only, no ES6 classes.
- Folders should use kebab case e.g. "this-is-a-folder/and-a-javascript-file.js".
- Components should use start case e.g.:
  - "MyComponent"
  - "AnotherComponentHere.jsx"
- We hang the `_isPrivate` boolean off our component definitions to indicate that the component isn't intended for external consumption yet. This will hide the component from the docs.

## Tests

- Components should have a `Component.spec.jsx` that lives alongside the component jsx file.
- Most tests should be shallow rendered using `enzyme`.
- Sometimes we have tests with flaky timing, i.e. we're using `setTimeout`. In those rare cases we put the text `[mostly stable]` in the name of the test as a kind of tag for future reference.
- Our test files have a certain structure to them, here's an example of it:

```javascript
describe('MyComponent', () => {
  common(MyComponent);

  describe('render', () => { });

  describe('props', () => {
    describe('myProp', () => { });

    describe('myOtherProp', () => { });
  });

  describe('child components', () => {
    describe('Foo', () => { });

    describe('Bar', () => { });
  });
});
```

[waffle]: https://waffle.io/appnexus/lucid/
[perf]: https://medium.com/@esamatti/react-js-pure-render-performance-anti-pattern-fb88c101332f
