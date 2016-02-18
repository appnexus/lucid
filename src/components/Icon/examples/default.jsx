import React from 'react';
import Icon from '../Icon';

export default React.createClass({
	render() {
		return (
			<div>
				<Icon>
					<rect width="10" height="10" stroke="black" strokeWidth="1" fill="red" />
				</Icon>
				<Icon badge>
					<rect width="10" height="10" stroke="black" strokeWidth="1" fill="red" />
				</Icon>
			</div>
		);
	}
});
