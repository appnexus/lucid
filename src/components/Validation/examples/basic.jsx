import React from 'react';
import createClass from 'create-react-class';
import { Validation } from '../../../index';

export default createClass({
	render() {
		return (
			<div>
				<Validation Error="Method one">Content</Validation>
				<Validation>
					<Validation.Error>
						<i>Method two</i>
					</Validation.Error>
					Content
				</Validation>
			</div>
		);
	},
});
