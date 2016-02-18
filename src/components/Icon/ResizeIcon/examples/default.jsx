import React from 'react';
import ResizeIcon from '../ResizeIcon';

export default React.createClass({
	render() {
		return (
			<div>
				<ResizeIcon />
				<ResizeIcon badge />
			</div>
		);
	}
});
