import React from 'react';
import createClass from 'create-react-class';
import { LoadingIcon } from '../../../../index';

export default createClass({
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
