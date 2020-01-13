import * as React from 'react';
import { render } from 'react-dom';
import { Expander, Button, ButtonGroup } from 'lucid-ui';

import 'lucid-ui/dist/lucid.css';

function App(): React.ReactElement {
	return (
		<div className='App'>
			<h1>Hello Lucid UI</h1>
			<ButtonGroup>
				<ButtonGroup.Button>Button 1</ButtonGroup.Button>
				<ButtonGroup.Button>Button 2</ButtonGroup.Button>
			</ButtonGroup>
			<Button>hello</Button>
			<Expander>
				<Expander.Label>label</Expander.Label>
				<p>expander content</p>
			</Expander>
		</div>
	);
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
