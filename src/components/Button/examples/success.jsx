import React from 'react';
import { Button } from '../../../index';

export default React.createClass({
	render() {
		return (
			<section>
				<article>
					<Button kind='success'>Success</Button>
					<Button kind='success' isDisabled={true}>is disabled</Button>
				</article>
				<article>
					<Button kind='success' size='short'>short</Button>
					<Button kind='success' size='short' isDisabled={true}>short is disabled</Button>
				</article>
				<article>
					<Button kind='success' size='small'>small</Button>
					<Button kind='success' size='small' isDisabled={true}>small is disabled</Button>
				</article>
				<article>
					<Button kind='success' size='large'>large</Button>
					<Button kind='success' size='large' isDisabled={true}>large is disabled</Button>
				</article>
			</section>
		);
	}
});
