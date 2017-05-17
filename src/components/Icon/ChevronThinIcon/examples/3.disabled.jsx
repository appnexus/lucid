import React from 'react';
import createClass from 'create-react-class';
import ChevronThinIcon from '../ChevronThinIcon';

export default createClass({
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
