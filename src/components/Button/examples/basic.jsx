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
					<Button kind='primary'>Primary</Button>
					<Button kind='primary' isDisabled={true}>Primary</Button>
					<Button kind='primary' size='short'>Primary</Button>
					<Button kind='primary' size='short' isDisabled={true}>Primary</Button>
					<Button kind='primary' size='small'>Primary</Button>
					<Button kind='primary' size='small' isDisabled={true}>Primary</Button>
					<Button kind='primary' size='large'>Primary</Button>
					<Button kind='primary' size='large' isDisabled={true}>Primary</Button>
				</div>
				<div>
					<Button kind='success'>Success</Button>
					<Button kind='success' isDisabled={true}>Success</Button>
					<Button kind='success' size='short'>Success</Button>
					<Button kind='success' size='short' isDisabled={true}>Success</Button>
					<Button kind='success' size='small'>Success</Button>
					<Button kind='success' size='small' isDisabled={true}>Success</Button>
					<Button kind='success' size='large'>Success</Button>
					<Button kind='success' size='large' isDisabled={true}>Success</Button>
				</div>
				<div>
					<Button kind='warning'>Warning</Button>
					<Button kind='warning' isDisabled={true}>Warning</Button>
					<Button kind='warning' size='short'>Warning</Button>
					<Button kind='warning' size='short' isDisabled={true}>Warning</Button>
					<Button kind='warning' size='small'>Warning</Button>
					<Button kind='warning' size='small' isDisabled={true}>Warning</Button>
					<Button kind='warning' size='large'>Warning</Button>
					<Button kind='warning' size='large' isDisabled={true}>Warning</Button>
				</div>
				<div>
					<Button kind='danger'>Danger</Button>
					<Button kind='danger' isDisabled={true}>Danger</Button>
					<Button kind='danger' size='short'>Danger</Button>
					<Button kind='danger' size='short' isDisabled={true}>Danger</Button>
					<Button kind='danger' size='small'>Danger</Button>
					<Button kind='danger' size='small' isDisabled={true}>Danger</Button>
					<Button kind='danger' size='large'>Danger</Button>
					<Button kind='danger' size='large' isDisabled={true}>Danger</Button>
				</div>
				<div>
					<Button kind='info'>Info</Button>
					<Button kind='info' isDisabled={true}>Info</Button>
					<Button kind='info' size='short'>Info</Button>
					<Button kind='info' size='short' isDisabled={true}>Info</Button>
					<Button kind='info' size='small'>Info</Button>
					<Button kind='info' size='small' isDisabled={true}>Info</Button>
					<Button kind='info' size='large'>Info</Button>
					<Button kind='info' size='large' isDisabled={true}>Info</Button>
				</div>
				<div>
					<Button kind='link'>Link</Button>
					<Button kind='link' isDisabled={true}>Link</Button>
				</div>
			</div>
		);
	}
});
