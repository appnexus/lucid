import React from 'react';
import createClass from 'create-react-class';
import { ModernHybridDemoSmart } from '../ModernHybridDemo';

export default createClass({
	render() {
		return (
			<div>
				<ModernHybridDemoSmart isExpanded={true} />
			</div>
		);
	},
});
