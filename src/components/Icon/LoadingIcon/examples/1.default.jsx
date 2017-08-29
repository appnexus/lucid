import React from 'react';
import createReactClass from 'create-react-class';
import { LoadingIcon } from '../../../../index';

export default createReactClass({
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
