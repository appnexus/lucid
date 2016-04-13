import React from 'react';
import Button from '../Button';

export default React.createClass({
	render() {
		return (
			<section>
				<article>
					<Button kind='warning'>Warning</Button>
					<Button kind='warning' isDisabled={true}>is disabled</Button>
				</article>
				<article>
					<Button kind='warning' size='short'>short</Button>
					<Button kind='warning' size='short' isDisabled={true}>short is disabled</Button>
				</article>
				<article>
					<Button kind='warning' size='small'>small</Button>
					<Button kind='warning' size='small' isDisabled={true}>small is disabled</Button>
				</article>
				<article>
					<Button kind='warning' size='large'>large</Button>
					<Button kind='warning' size='large' isDisabled={true}>large is disabled</Button>
				</article>
			</section>
		);
	}
});
