import React from 'react';
import Button from '../../Button/Button';
import ButtonGroup from '../ButtonGroup';

export default React.createClass({
	render() {
		return (
			<div>
				<ButtonGroup>
					<Button>One</Button>
					<Button>Two</Button>
					<Button>Three</Button>
					<Button kind='primary'>Four</Button>
					<Button isDisabled={true}>Five</Button>
					<Button>Six</Button>
				</ButtonGroup>
			</div>
		);
	}
});
