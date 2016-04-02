import React from 'react';
import Button from '../Button';

export default React.createClass({
	render() {
		return (
			<section>
				<Button kind='success'>Success</Button>
				<Button kind='success' isDisabled={true}>Success</Button>
				<Button kind='success' size='short'>Success</Button>
				<Button kind='success' size='short' isDisabled={true}>Success</Button>
				<Button kind='success' size='small'>Success</Button>
				<Button kind='success' size='small' isDisabled={true}>Success</Button>
				<Button kind='success' size='large'>Success</Button>
				<Button kind='success' size='large' isDisabled={true}>Success</Button>
			</section>
		);
	}
});
