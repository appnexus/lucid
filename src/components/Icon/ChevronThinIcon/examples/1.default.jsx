import React from 'react';
import ChevronThinIcon from '../ChevronThinIcon';

export default React.createClass({
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
