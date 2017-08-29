import React from 'react';
import createReactClass from 'create-react-class';
import { LoadingIcon } from '../../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<LoadingIcon isClickable />
				<LoadingIcon isClickable speed="slow" />
				<LoadingIcon isClickable speed="fast" />
			</div>
		);
	},
});
