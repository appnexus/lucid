import React from 'react';
import createReactClass from 'create-react-class';
import ChevronThinIcon from '../ChevronThinIcon';

export default createReactClass({
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
