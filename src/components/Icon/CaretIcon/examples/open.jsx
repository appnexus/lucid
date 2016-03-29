import React from 'react';
import CaretIcon from '../CaretIcon';

export default React.createClass({
	render() {
		return (
			<div>
				<div>
					<CaretIcon isOpen={true} />
				</div>
				<div>
					<CaretIcon direction='up' isOpen={true} />
					<CaretIcon direction='down' isOpen={true} />
					<CaretIcon direction='left' isOpen={true} />
					<CaretIcon direction='right' isOpen={true} />
				</div>
				<div>
					<CaretIcon direction='up' isBadge isOpen={true} />
					<CaretIcon direction='down' isBadge isOpen={true} />
					<CaretIcon direction='left' isBadge isOpen={true} />
					<CaretIcon direction='right' isBadge isOpen={true} />
				</div>
			</div>
		);
	}
});
