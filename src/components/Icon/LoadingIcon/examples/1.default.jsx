import React from 'react';
import createClass from 'create-react-class';
import { LoadingIcon } from '../../../../index';

export default createClass({
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
