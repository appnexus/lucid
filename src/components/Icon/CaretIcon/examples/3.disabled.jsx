import React from 'react';
import createClass from 'create-react-class';
import { CaretIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<div>
					<CaretIcon isDisabled />
				</div>
				<div>
					<CaretIcon isDisabled direction="up" />
					<CaretIcon isDisabled direction="down" />
					<CaretIcon isDisabled direction="left" />
					<CaretIcon isDisabled direction="right" />
				</div>
				<div>
					<CaretIcon isDisabled direction="up" isBadge />
					<CaretIcon isDisabled direction="down" isBadge />
					<CaretIcon isDisabled direction="left" isBadge />
					<CaretIcon isDisabled direction="right" isBadge />
				</div>
			</div>
		);
	},
});
