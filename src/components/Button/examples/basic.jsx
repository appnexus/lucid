import React from 'react';
import Button from '../Button';

export default React.createClass({
	render() {
		return (
			<div>
				<div>
					<Button>Default</Button>
					<Button isDisabled={true}>Default</Button>
					<Button isActive={true}>Default</Button>
					<Button size='short'>Default</Button>
					<Button size='short' isDisabled={true}>Default</Button>
					<Button size='small'>Default</Button>
					<Button size='small' isDisabled={true}>Default</Button>
					<Button size='large'>Default</Button>
					<Button size='large' isDisabled={true}>Default</Button>
				</div>
				<div>
					<Button type='primary'>Primary</Button>
					<Button type='primary' isDisabled={true}>Primary</Button>
					<Button type='primary' size='short'>Primary</Button>
					<Button type='primary' size='short' isDisabled={true}>Primary</Button>
					<Button type='primary' size='small'>Primary</Button>
					<Button type='primary' size='small' isDisabled={true}>Primary</Button>
					<Button type='primary' size='large'>Primary</Button>
					<Button type='primary' size='large' isDisabled={true}>Primary</Button>
				</div>
				<div>
					<Button type='success'>Success</Button>
					<Button type='success' isDisabled={true}>Success</Button>
					<Button type='success' size='short'>Success</Button>
					<Button type='success' size='short' isDisabled={true}>Success</Button>
					<Button type='success' size='small'>Success</Button>
					<Button type='success' size='small' isDisabled={true}>Success</Button>
					<Button type='success' size='large'>Success</Button>
					<Button type='success' size='large' isDisabled={true}>Success</Button>
				</div>
				<div>
					<Button type='warning'>Warning</Button>
					<Button type='warning' isDisabled={true}>Warning</Button>
					<Button type='warning' size='short'>Warning</Button>
					<Button type='warning' size='short' isDisabled={true}>Warning</Button>
					<Button type='warning' size='small'>Warning</Button>
					<Button type='warning' size='small' isDisabled={true}>Warning</Button>
					<Button type='warning' size='large'>Warning</Button>
					<Button type='warning' size='large' isDisabled={true}>Warning</Button>
				</div>
				<div>
					<Button type='danger'>Danger</Button>
					<Button type='danger' isDisabled={true}>Danger</Button>
					<Button type='danger' size='short'>Danger</Button>
					<Button type='danger' size='short' isDisabled={true}>Danger</Button>
					<Button type='danger' size='small'>Danger</Button>
					<Button type='danger' size='small' isDisabled={true}>Danger</Button>
					<Button type='danger' size='large'>Danger</Button>
					<Button type='danger' size='large' isDisabled={true}>Danger</Button>
				</div>
				<div>
					<Button type='info'>Info</Button>
					<Button type='info' isDisabled={true}>Info</Button>
					<Button type='info' size='short'>Info</Button>
					<Button type='info' size='short' isDisabled={true}>Info</Button>
					<Button type='info' size='small'>Info</Button>
					<Button type='info' size='small' isDisabled={true}>Info</Button>
					<Button type='info' size='large'>Info</Button>
					<Button type='info' size='large' isDisabled={true}>Info</Button>
				</div>
				<div>
					<Button type='link'>Link</Button>
					<Button type='link' isDisabled={true}>Link</Button>
				</div>
			</div>
		);
	}
});
