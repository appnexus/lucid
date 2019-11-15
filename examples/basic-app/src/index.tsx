import * as React from 'react';
import { render } from 'react-dom';
import { Button, ButtonGroup } from 'lucid-ui';

import 'lucid-ui/src/index.less';

function App(): React.ReactElement {
	return (
		<div className='App'>
			<h1>Hello CodeSandbox</h1>
			<h2>Start editing to see some magic happen!</h2>
			<ButtonGroup></ButtonGroup>
			<Button onClick={() => console.log('hello')}>hello</Button>
		</div>
	);
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
