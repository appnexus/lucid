import React from 'react';
import ChevronThinIcon from '../ChevronThinIcon';

export default React.createClass({
	render() {
		return (
			<div>
				<div>
					<ChevronThinIcon isClickable />
				</div>
				<div>
					<ChevronThinIcon isClickable direction="left" />
					<ChevronThinIcon isClickable direction="right" />
				</div>
			</div>
		);
	},
});
