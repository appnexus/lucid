import React from 'react';
import Button from '../Button';

export default React.createClass({
	render() {
		return (
			<div>
				<Button>Plain</Button>
				<Button kind='primary'>Primary</Button>
				<Button kind='link'>link</Button>
				<Button kind='success'>Success</Button>
				<Button kind='warning'>Warning</Button>
				<Button kind='danger'>Danger</Button>
				<Button kind='info'>Info</Button>
				<Button size='short'>Short</Button>
				<Button size='small'>Small</Button>
				<Button size='large'>Large</Button>
				<Button isActive={true}>Active</Button>
				<Button isDisabled={true}>Disabled</Button>
			</div>
		);
	}
});
