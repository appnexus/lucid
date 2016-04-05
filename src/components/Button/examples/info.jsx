import React from 'react';
import Button from '../Button';

export default React.createClass({
	render() {
		return (
			<section>
				<article>
					<Button kind='info'>Info</Button>
					<Button kind='info' isDisabled={true}>Info</Button>
					<Button kind='info' isActive={true}>Info</Button>
				</article>
				<article>
					<Button kind='info' size='short'>Info</Button>
					<Button kind='info' size='short' isDisabled={true}>Info</Button>
					<Button kind='info' size='short' isActive={true}>Info</Button>
				</article>
				<article>
					<Button kind='info' size='small'>Info</Button>
					<Button kind='info' size='small' isDisabled={true}>Info</Button>
					<Button kind='info' size='small' isActive={true}>Info</Button>
				</article>
				<article>
					<Button kind='info' size='large'>Info</Button>
					<Button kind='info' size='large' isDisabled={true}>Info</Button>
					<Button kind='info' size='large' isActive={true}>Info</Button>
				</article>
			</section>
		);
	}
});
