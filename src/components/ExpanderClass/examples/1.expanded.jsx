import React from 'react';
import createClass from 'create-react-class';
import { ExpanderClass } from '../../../index';

export default createClass({
	render() {
		return (
			<div>
				<ExpanderClass isExpanded={true} />
			</div>
		);
	},
});
