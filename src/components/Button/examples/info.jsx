import React from 'react';
import Button from '../Button';

export default React.createClass({
	render() {
		return (
			<section>
				<article>
					<Button kind='info'>Info</Button>
					<Button kind='info' isDisabled={true}>is disabled</Button>
				</article>
				<article>
					<Button kind='info' size='short'>short</Button>
					<Button kind='info' size='short' isDisabled={true}>short is disabled</Button>
				</article>
				<article>
					<Button kind='info' size='small'>small</Button>
					<Button kind='info' size='small' isDisabled={true}>small is disabled</Button>
				</article>
				<article>
					<Button kind='info' size='large'>large</Button>
					<Button kind='info' size='large' isDisabled={true}>large is disabled</Button>
				</article>
			</section>
		);
	}
});
