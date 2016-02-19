# Lucid

A UI component library from AppNexus.

## Install

Lucid will soon be available on npm.

## Usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'lucid';

ReactDOM.render(
	<Button>Hello World<Button/>,
	mountNode
);
```

You must also include lucid's styles:

```less
@import "node_modules/lucid/src/index.less";
```

Or use the precompiled CSS file `node_modules/lucid/dist/index.css`.

### Dependencies

`lucid` has both `react` and `react-dom` as `peerDependency`s. This means
the consuming application is responsible for declaring a dependency on a
compatible version.

```
package.json

{
	"dependencies": {
		"lucid": "^0.0.1",
		"react": "^0.14.0",
		"react-dom": "^0.14.0"
	}
}
```

To contribute to lucid, please see `CONTRIBUTING.md`.
