import React from 'react';
import Button from '../Button';

export default React.createClass({
	render() {
		return (
			<div>
				<Button>Plain</Button>
				<Button className='BertButton-primary'>Primary</Button>
				<Button className='BertButton-success'>Success</Button>
				<Button className='BertButton-info'>Info</Button>
				<Button className='BertButton-warning'>Warning</Button>
				<Button className='BertButton-danger'>Danger</Button>
				<Button className='BertButton-link'>link</Button>
				<Button isActive={true}>Active</Button>
				<Button isDisabled={true}>Disabled</Button>
			</div>
		);
	}
});
