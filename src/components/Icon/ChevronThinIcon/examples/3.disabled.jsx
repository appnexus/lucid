import React from 'react';
import createReactClass from 'create-react-class';
import ChevronThinIcon from '../ChevronThinIcon';

export default createReactClass({
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
