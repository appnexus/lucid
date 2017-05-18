import React from 'react';
import createClass from 'create-react-class';
import ChevronThinIcon from '../ChevronThinIcon';

export default createClass({
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
