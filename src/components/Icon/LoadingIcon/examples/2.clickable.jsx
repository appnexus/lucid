import React from 'react';
import createClass from 'create-react-class';
import { LoadingIcon } from '../../../../index';

export default createClass({
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
