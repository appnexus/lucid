import React from 'react';
import createReactClass from 'create-react-class';
import { LoadingIcon } from '../../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<LoadingIcon isDisabled />
				<LoadingIcon isDisabled speed="slow" />
				<LoadingIcon isDisabled speed="fast" />
			</div>
		);
	},
});
