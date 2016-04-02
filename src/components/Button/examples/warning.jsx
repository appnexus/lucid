import React from 'react';
import Button from '../Button';

export default React.createClass({
	render() {
		return (
			<section>
				<Button kind='warning'>Warning</Button>
				<Button kind='warning' isDisabled={true}>Warning</Button>
				<Button kind='warning' size='short'>Warning</Button>
				<Button kind='warning' size='short' isDisabled={true}>Warning</Button>
				<Button kind='warning' size='small'>Warning</Button>
				<Button kind='warning' size='small' isDisabled={true}>Warning</Button>
				<Button kind='warning' size='large'>Warning</Button>
				<Button kind='warning' size='large' isDisabled={true}>Warning</Button>
			</section>
		);
	}
});
