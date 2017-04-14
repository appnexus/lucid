import React from 'react';
import { LoadingIcon } from '../../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<LoadingIcon />
				<LoadingIcon speed="slow" />
				<LoadingIcon speed="fast" />
			</div>
		);
	},
});
