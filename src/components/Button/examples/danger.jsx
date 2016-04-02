import React from 'react';
import Button from '../Button';

export default React.createClass({
	render() {
		return (
			<section>
				<Button kind='danger'>Danger</Button>
				<Button kind='danger' isDisabled={true}>Danger</Button>
				<Button kind='danger' size='short'>Danger</Button>
				<Button kind='danger' size='short' isDisabled={true}>Danger</Button>
				<Button kind='danger' size='small'>Danger</Button>
				<Button kind='danger' size='small' isDisabled={true}>Danger</Button>
				<Button kind='danger' size='large'>Danger</Button>
				<Button kind='danger' size='large' isDisabled={true}>Danger</Button>
			</section>
		);
	}
});
