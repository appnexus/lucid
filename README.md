# Lucid [![Build Status](https://travis-ci.org/appnexus/lucid.svg?branch=master)](https://travis-ci.org/appnexus/lucid) [![Stories in Ready](https://badge.waffle.io/appnexus/lucid.png?label=ready&title=Ready)](https://waffle.io/appnexus/lucid)

A UI component library from AppNexus.

## Install

Lucid can be installed with npm.

    npm install --save lucid-ui

## Usage

    import React from 'react';
    import ReactDOM from 'react-dom';
    import { Button } from 'lucid-ui';

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
we support React 15.

Example package.json:

    {
      "dependencies": {
        "lucid-ui": "^2.0.0",
        "react": "^15.0.0",
        "react-dom": "^15.0.0",
        "react-addons-css-transition-group": "^15.0.0"
      }
    }

To contribute to lucid, please see `CONTRIBUTING.md`.

### Credits

- [BrowserStack] for providing cross-browser testing infrastructure.
- [Travis CI] for providing continuous integration infrastructure.

[BrowserStack]: https://www.browserstack.com/
[Travis CI]: https://travis-ci.org/
