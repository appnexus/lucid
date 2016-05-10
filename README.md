[![Stories in Ready](https://badge.waffle.io/appnexus/lucid.png?label=ready&title=Ready)](https://waffle.io/appnexus/lucid)
# Lucid [![Build Status](https://travis-ci.org/appnexus/lucid.svg?branch=master)](https://travis-ci.org/appnexus/lucid)

A UI component library from AppNexus.

## Install

Lucid can be installed with NPM.

```bash
npm install --save lucid-ui
```

## Usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'lucid-ui';

ReactDOM.render(
	<Button>Hello World<Button/>,
	mountNode
);
```

You must also include lucid's styles:

```less
@import "node_modules/lucid-ui/src/index.less";
```

Or use the precompiled CSS file `node_modules/lucid-ui/dist/index.css`.

### Dependencies

`lucid-ui` has both `react` and `react-dom` as `peerDependency`s. This means
the consuming application is responsible for declaring a dependency on a
compatible version.

```
package.json

{
	"dependencies": {
		"lucid-ui": "^0.0.1",
		"react": "^0.14.0",
		"react-dom": "^0.14.0"
	}
}
```

To contribute to lucid, please see `CONTRIBUTING.md`.
