# Lucid  [![Build Status](https://travis-ci.org/appnexus/lucid.svg?branch=master)](https://travis-ci.org/appnexus/lucid) [![codecov](https://codecov.io/gh/appnexus/lucid/branch/master/graph/badge.svg)](https://codecov.io/gh/appnexus/lucid) [![Stories in Ready](https://badge.waffle.io/appnexus/lucid.png?label=ready&title=Ready)](https://waffle.io/appnexus/lucid)

A UI component library from AppNexus.

## Install

Lucid can be installed with npm

    npm install --save lucid-ui

or yarn

    yarn add lucid-ui

## Usage

    import React from 'react';
    import ReactDOM from 'react-dom';
    import Button from 'lucid-ui/Button';
    // `import { Button } from 'lucid-ui'` also works but will result in larger bundle sizes

    ReactDOM.render(
      <Button>Hello World</Button>,
      mountNode
    );

Lucid uses `less` for its stylesheets. If you use `less`, you can include the
styles like so:

    @import "node_modules/lucid-ui/src/index.less";

If you don't use `less`, you can use the precompiled css file
`node_modules/lucid-ui/dist/index.css`.

### Dependencies

`lucid-ui` has several React peer dependencies. This means **your application
is responsible for declaring dependencies** on compatible versions. Currently
we support React 15 and 16.

Example package.json:

    {
      "dependencies": {
        "lucid-ui": "^2.0.0",
        "react": "^16.0.0",
        "react-dom": "^16.0.0",
      }
    }

To contribute to lucid, please see `CONTRIBUTING.md`.

### Reducing bundle size

#### Path imports

If you're starting a new project it's best to simply import all your components
by their paths. This will make sure that only the components you need will be
included in your bundle:

    import Button from 'lucid-ui/Button';
    import DataTable from 'lucid-ui/DataTable';

#### Babel plugin

If you have an existing project using lucid you should consider using [babel
plugin import][bpi] that can automatically transform your ES6 module imports
into path imports. Under the hood it will transform import code like this:

    import { Button } from 'lucid-ui';

into

    import Button from 'lucid-ui/Button';

Here's a `.babelrc` plugin configuration that works with lucid:

    "plugins": [
      [
        "import",
        {
          "libraryName": "lucid-ui",
          "libraryDirectory": "",
          "camel2DashComponentName": false
        }
      ]
    ]

### Credits

- [BrowserStack] for providing cross-browser testing infrastructure.
- [Travis CI] for providing continuous integration infrastructure.
- [CodeCov] for providing code coverage analysis infrastructure.

[BrowserStack]: https://www.browserstack.com/
[Travis CI]: https://travis-ci.org/
[CodeCov]: https://codecov.io
[bpi]: https://github.com/ant-design/babel-plugin-import
