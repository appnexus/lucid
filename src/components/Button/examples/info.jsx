import React from 'react';
import Button from '../Button';

export default React.createClass({
	render() {
		return (
			<section>
				<Button kind='info'>Info</Button>
				<Button kind='info' isDisabled={true}>Info</Button>
				<Button kind='info' size='short'>Info</Button>
				<Button kind='info' size='short' isDisabled={true}>Info</Button>
				<Button kind='info' size='small'>Info</Button>
				<Button kind='info' size='small' isDisabled={true}>Info</Button>
				<Button kind='info' size='large'>Info</Button>
				<Button kind='info' size='large' isDisabled={true}>Info</Button>
			</section>
		);
	}
});
