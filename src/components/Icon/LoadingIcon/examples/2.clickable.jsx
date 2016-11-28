import React from 'react';
import { LoadingIcon } from '../../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<LoadingIcon isClickable />
				<LoadingIcon isClickable speed='slow'/>
				<LoadingIcon isClickable speed='fast'/>
			</div>
		);
	},
});
