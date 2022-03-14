# Lucid Contributions

First of all, thank you for contributing. It’s appreciated.

1. Install node >= `>=14.0.0`
2. Clone the repo and install dependencies with `npm install`.
3. Make sure the core team, including design, approves your idea. This step is really important because, if you skip it, your PR might be rejected.

4. Below are some important commands for developing. Don't commit before fixing all errors and warnings.

- `npm run dev` starts Storybook for quick, iterative development
- `npm run watch` runs tests and watches for changes, optimized for speed

5. Ensure your changes work properly on the latest versions of Chrome, Firefox, Safari, and IE Edge. Currently this step is manual.
6. Reference the issue's number in your commit. E.g.: "Did this #12".
7. Make a pull request.

## Process

- All PRs should at minimum have a label _semver-major/minor/patch/none_. This helps identify what kind of version bump the PR represents.
- Branches should follow this convention (where 1234 is a GitHub issue):
  - 1234-add-something
  - 1234-fix-something
  - release/2.0.0
- We use an Pull Request Template that provides a check list of tasks for every PR.

## Writing Components

### Create a new Component (automated)

Run command:
`npm run create-component MyNewComponent`

### Create a new Component (manual)

Here are some basic steps to get you started building your first component.
Go to `http://localhost:6006/` and navigate to the `ExampleComponent` for a starter template component.

1. Create your new component folder
   `src/components/MyNewComponent/`

2. Create your component file(s). The required file are:

- `MyNewComponent.tsx`
- `MyNewComponent.spec.ts`
- `MyNewComponent.stories.ts`

3. Add an import and export for your component's JSX file in `/src/index.ts`.

```javascript
import MyNewComponent from './components/MyNewComponent/MyNewComponent';

export { MyNewComponent };
```

5. (optional) - Add your component's style file to `/src/styles/components.less`

```css
@import '../components/MyNewComponent/MyNewComponent';
```

### Prop Conventions

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

### Styling

- _All_ css classes must be prefixed by the name of the component. E.g. `.lucid-Button-foo`. Use `const cx = lucidClassNames.bind('&-ExampleComponent');` to bind and auto-prefix classnames and include in your component with `<MyComponent classNames={cx}>`.
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

### Code styling

- We use our own wrapper around `createClass`.
- Folders should use kebab case e.g. "this-is-a-folder/and-a-javascript-file.js".
- Components should use start case e.g.:
  - "MyComponent"
  - "AnotherComponentHere.jsx"
- We define component description & meta data in static property of components called `peek`.

```javascript
MyExampleComponent.peek = {
	description: `...`,
	isPrivate: true,
};
```

- We set the `isPrivate` boolean to indicate that the component isn't intended for external consumption yet. This will hide the component from the docs.

### Tests

- Components should have a `Component.spec.tsx` that lives alongside the component `.tsx` file.
- Most tests should be shallow rendered using `enzyme`.
- Use `expect` and `jest` rather than `assert` or `sinon`, which we are moving away from.
- Sometimes we have tests with flaky timing, i.e. we're using `setTimeout`. In those rare cases we put the text `[mostly stable]` in the name of the test as a kind of tag for future reference.
- Our test files have a certain structure to them, here's an example of it:

```javascript
describe('MyComponent', () => {
	common(MyComponent);

	describe('render', () => {});

	describe('props', () => {
		describe('myProp', () => {});

		describe('myOtherProp', () => {});
	});

	describe('child components', () => {
		describe('Foo', () => {});

		describe('Bar', () => {});
	});
});
```

[perf]: https://medium.com/@esamatti/react-js-pure-render-performance-anti-pattern-fb88c101332f

### Statistics

To get statistics on the module dependencies, both internal to the project and external NPM packages, run the following command:

```bash
NODE_ENV=development npx webpack --config webpack.config.bundle.cjs --json --stats > stats.json
```

## Troubleshooting Frequent Component Errors

#### `Uncaught ReferenceError: [object] is not defined`

Similar errors include saying `string`, `bool`, `boolean`, `node`, etc. are not defined. If you get this error, double check that all your defined propTypes in your component class are also destructured from PropTypes.

```javascript
import PropTypes from 'prop-types';

const {
	bool,
	func,
	object, //<-- destructuring the appropriate prop-type from PropTypes will solve the problem.
} = PropTypes;
```
