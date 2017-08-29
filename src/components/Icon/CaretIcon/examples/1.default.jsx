import React from 'react';
import createReactClass from 'create-react-class';
import { CaretIcon } from '../../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<div>
					<CaretIcon />
				</div>
				<div>
					<CaretIcon direction="up" />
					<CaretIcon direction="down" />
					<CaretIcon direction="left" />
					<CaretIcon direction="right" />
				</div>
				<div>
					<CaretIcon direction="up" isBadge />
					<CaretIcon direction="down" isBadge />
					<CaretIcon direction="left" isBadge />
					<CaretIcon direction="right" isBadge />
				</div>
			</div>
		);
	},
});
