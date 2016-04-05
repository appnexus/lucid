import React from 'react';
import Button from '../Button';

export default React.createClass({
	render() {
		return (
			<section>
				<article>
					<Button kind='danger'>Danger</Button>
					<Button kind='danger' isDisabled={true}>is disabled</Button>
					<Button kind='danger' isActive={true}>is active</Button>
				</article>
				<article>
					<Button kind='danger' size='short'>short</Button>
					<Button kind='danger' size='short' isDisabled={true}>short is disabled</Button>
					<Button kind='danger' size='short' isActive={true}>short is active</Button>
				</article>
				<article>
					<Button kind='danger' size='small'>small</Button>
					<Button kind='danger' size='small' isDisabled={true}>small is disabled</Button>
					<Button kind='danger' size='small' isActive={true}>small is active</Button>
				</article>
				<article>
					<Button kind='danger' size='large'>large</Button>
					<Button kind='danger' size='large' isDisabled={true}>large is disabled</Button>
					<Button kind='danger' size='large' isActive={true}>large is active</Button>
				</article>
			</section>
		);
	}
});
