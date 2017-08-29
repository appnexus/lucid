import React from 'react';
import createReactClass from 'create-react-class';
import { CaretIcon } from '../../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<div>
					<CaretIcon isClickable />
				</div>
				<div>
					<CaretIcon isClickable direction="up" />
					<CaretIcon isClickable direction="down" />
					<CaretIcon isClickable direction="left" />
					<CaretIcon isClickable direction="right" />
				</div>
				<div>
					<CaretIcon isClickable direction="up" isBadge />
					<CaretIcon isClickable direction="down" isBadge />
					<CaretIcon isClickable direction="left" isBadge />
					<CaretIcon isClickable direction="right" isBadge />
				</div>
			</div>
		);
	},
});
