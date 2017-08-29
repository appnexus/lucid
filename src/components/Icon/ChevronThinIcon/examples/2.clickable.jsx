import React from 'react';
import createReactClass from 'create-react-class';
import ChevronThinIcon from '../ChevronThinIcon';

export default createReactClass({
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
