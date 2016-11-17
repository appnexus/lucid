import React from 'react';
import { LoadingIcon } from '../../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<LoadingIcon isDisabled />
				<LoadingIcon isDisabled speed='slow'/>
				<LoadingIcon isDisabled speed='fast'/>
			</div>
		);
	},
});
