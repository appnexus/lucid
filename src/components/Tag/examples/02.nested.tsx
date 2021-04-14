import React from 'react';
import createClass from 'create-react-class';
import { Tag } from '../../../index';
import _ from 'lodash';

const words = [
	'Fashion',
	'The',
	'Vexillologist',
	'Cold Brew',
	'This is a longer sentence that should be handled okay',
];

export default createClass({
	render() {
		return (
			<div>
				<Tag>
					Grouped items
					{_.times(8, (n) => (
						<Tag key={n}>{words[n % words.length]}</Tag>
					))}
				</Tag>

				<Tag isRemovable>
					Grouped items
					{_.times(10, (n) => (
						<Tag isRemovable key={n}>
							{words[n % words.length]}
						</Tag>
					))}
				</Tag>
			</div>
		);
	},
});

// begin-hide-from-docs
export const notes = `
Use a parent tag to group child tags into categories. This example also shows you how to dynamically generate a list of tags.
`;
// end-hide-from-docs
