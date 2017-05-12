import React from 'react';
import ChevronThinIcon from '../ChevronThinIcon';

export default React.createClass({
	render() {
		return (
			<div>
				<div>
					<ChevronThinIcon isDisabled />
				</div>
				<div>
					<ChevronThinIcon isDisabled direction="left" />
					<ChevronThinIcon isDisabled direction="right" />
				</div>
			</div>
		);
	},
});
