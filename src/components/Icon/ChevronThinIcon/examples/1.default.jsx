import React from 'react';
import createClass from 'create-react-class';
import ChevronThinIcon from '../ChevronThinIcon';

export default createClass({
	render() {
		return (
			<div>
				<div>
					<ChevronThinIcon />
				</div>
				<div>
					<ChevronThinIcon direction="left" />
					<ChevronThinIcon direction="right" />
				</div>
			</div>
		);
	},
});
