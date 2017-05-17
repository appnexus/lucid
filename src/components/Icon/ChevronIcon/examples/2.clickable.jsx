import React from 'react';
import createClass from 'create-react-class';
import { ChevronIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<div>
					<ChevronIcon isClickable />
				</div>
				<div>
					<ChevronIcon isClickable direction="up" />
					<ChevronIcon isClickable direction="down" />
					<ChevronIcon isClickable direction="left" />
					<ChevronIcon isClickable direction="right" />
				</div>
				<div>
					<ChevronIcon isClickable direction="up" isBadge />
					<ChevronIcon isClickable direction="down" isBadge />
					<ChevronIcon isClickable direction="left" isBadge />
					<ChevronIcon isClickable direction="right" isBadge />
				</div>
			</div>
		);
	},
});
