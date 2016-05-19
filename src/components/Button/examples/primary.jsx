import React from 'react';
import { Button } from '../../../index';

export default React.createClass({
	render() {
		return (
			<section>
				<article>
					<Button kind='primary'>Primary</Button>
					<Button kind='primary' isDisabled={true}>is disabled</Button>
				</article>
				<article>
					<Button kind='primary' size='short'>short</Button>
					<Button kind='primary' size='short' isDisabled={true}>short is disabled</Button>
				</article>
				<article>
					<Button kind='primary' size='small'>small</Button>
					<Button kind='primary' size='small' isDisabled={true}>small is disabled</Button>
				</article>
				<article>
					<Button kind='primary' size='large'>large</Button>
					<Button kind='primary' size='large' isDisabled={true}>large is disabled</Button>
				</article>
			</section>
		);
	},
});
