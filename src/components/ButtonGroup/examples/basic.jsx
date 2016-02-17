import React from 'react';
import Button from '../../Button/Button';
import ButtonGroup from '../ButtonGroup';

export default React.createClass({
	render() {
		return (
			<ButtonGroup>
				<Button>One</Button>
				<Button>Two</Button>
				<Button>Three</Button>
				<Button isActive={true}>Four</Button>
				<Button isDisabled={true}>Five</Button>
				<Button>Six</Button>
			</ButtonGroup>
		);
	}
});
