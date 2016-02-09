import React from 'react';
import Button from '../Button';

export default React.createClass({
	render() {
		return (
			<div>
				<Button>Plain</Button>
				<Button type='primary'>Primary</Button>
				<Button type='cancel'>Cancel</Button>
				<Button isActive={true}>Active</Button>
				<Button isDisabled={true}>Disabled</Button>
			</div>
		);
	}
});
