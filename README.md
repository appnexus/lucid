# Lucid [![codecov](https://codecov.io/gh/appnexus/lucid/branch/master/graph/badge.svg)](https://codecov.io/gh/appnexus/lucid)

A UI component library from Xandr.

## Install

Lucid can be installed with npm

```sh
  npm install --save lucid-ui
```

## Usage

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'lucid-ui';

ReactDOM.render(<Button>Hello World</Button>, mountNode);
```

Lucid uses `less` for its stylesheets. If you use `less`, you can include the
styles like so:

    @import "node_modules/lucid-ui/src/index.less";

If you don't use `less`, you can use the precompiled css file
`node_modules/lucid-ui/dist/lucid.css`.

### Custom CSS Scope

There are some _very rare_ situations where you might need to customize the
prefix for all the css class names emitted by the library and `less`. If you
find yourself in that unenviable position, you can do the following:

In your webpack config use the [`DefinePlugin`][dp] to specify
`LUCID_CSS_NAMESPACE` like so:

    new webpack.DefinePlugin({
      LUCID_CSS_NAMESPACE: "'something-custom'",
    });

When you render the `less`, make sure to [set the `prefix` variable][lmv] to the
same thing you set in in your webpack config. E.g.

    lessc node_modules/lucid-ui/src/index.less --modify-var='prefix=something-custom'

### Dependencies

`lucid-ui` has several React peer dependencies. This means **your application
is responsible for declaring dependencies** on compatible versions. Currently
we support React 15 and 16.

Example package.json:

```json
{
	"dependencies": {
		"lucid-ui": "^5.0.0",
		"react": "^16.0.0",
		"react-dom": "^16.0.0"
	}
}
```

To contribute to lucid, please see `CONTRIBUTING.md`.

### Credits

- [BrowserStack] for providing cross-browser testing infrastructure.
- [Travis CI] for providing continuous integration infrastructure.
- [CodeCov] for providing code coverage analysis infrastructure.

[browserstack]: https://www.browserstack.com/
[travis ci]: https://travis-ci.org/
[codecov]: https://codecov.io
[bpi]: https://github.com/ant-design/babel-plugin-import
[dp]: https://webpack.js.org/plugins/define-plugin/
[lmv]: http://lesscss.org/usage/
