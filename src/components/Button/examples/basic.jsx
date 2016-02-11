import React from 'react';
import Button from '../Button';

export default React.createClass({
	render() {
		return (
			<div>
				<Button>Plain</Button>
				<Button type='primary'>Primary</Button>
				<Button type='link'>link</Button>
				<Button type='success'>Success</Button>
				<Button type='warning'>Warning</Button>
				<Button type='danger'>Danger</Button>
				<Button type='info'>Info</Button>
				<Button size='short'>Short</Button>
				<Button size='small'>Small</Button>
				<Button size='large'>Large</Button>
				<Button isActive={true}>Active</Button>
				<Button isDisabled={true}>Disabled</Button>
			</div>
		);
	}
});
