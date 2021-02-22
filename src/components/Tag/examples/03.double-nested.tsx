import React from 'react';
import createClass from 'create-react-class';
import { Tag } from '../../../index';
import _ from 'lodash';

const words = [
	'Fashion',
	'The',
	'Vexillologist',
	'Cold Brew',
	'This is a longer sentence that should be handled okay but what if it is even longer than you could ever think imaginable',
];

export default createClass({
	render() {
		return (
			<div>
				<Tag isTop>
					Global:
					<Tag>
						Group 1
						{_.times(4, n => (
							<Tag key={n}>{words[n % words.length]}</Tag>
						))}
					</Tag>
					<Tag>
						Group 2
						{_.times(4, n => (
							<Tag key={n}>{words[n % words.length]}</Tag>
						))}
					</Tag>
				</Tag>

				<Tag isTop>
					In-Progess:
					<Tag>
						Group 1
						{_.times(4, n => (
							<Tag key={n}>{words[n % words.length]}</Tag>
						))}
					</Tag>
					<Tag>
						Group 2
						{_.times(4, n => (
							<Tag key={n}>{words[n % words.length]}</Tag>
						))}
					</Tag>
				</Tag>
			</div>
		);
	},
});

// begin-hide-from-docs
export const notes = `
This allows you to add a third level of hierarchy to your tag categorization.
`;
// end-hide-from-docs
