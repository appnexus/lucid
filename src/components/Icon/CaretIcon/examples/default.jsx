import React from 'react';
import CaretIcon from '../CaretIcon';

export default React.createClass({
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
					<CaretIcon direction="up" badge />
					<CaretIcon direction="down" badge />
					<CaretIcon direction="left" badge />
					<CaretIcon direction="right" badge />
				</div>
			</div>
		);
	}
});
