import React from 'react';
import createReactClass from 'create-react-class';
import { ArrowIcon } from '../../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<div>
					<ArrowIcon isClickable />
				</div>
				<div>
					<ArrowIcon isClickable direction="up" />
					<ArrowIcon isClickable direction="down" />
					<ArrowIcon isClickable direction="left" />
					<ArrowIcon isClickable direction="right" />
				</div>
				<div>
					<ArrowIcon isClickable direction="up" isBadge />
					<ArrowIcon isClickable direction="down" isBadge />
					<ArrowIcon isClickable direction="left" isBadge />
					<ArrowIcon isClickable direction="right" isBadge />
				</div>
			</div>
		);
	},
});
