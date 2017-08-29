import React from 'react';
import createReactClass from 'create-react-class';
import { Tag } from '../../../index';
import _ from 'lodash';

const words = [
	'Fashion',
	'The',
	'Vexillologist',
	'Cold Brew',
	'This is a longer sentence that should be handled okay but what if it is even longer than you could ever think imaginable',
];

export default createReactClass({
	render() {
		return (
			<div>
				{_.times(25, n => (
					<Tag key={n}>
						{words[n % words.length]}
					</Tag>
				))}

				<Tag>
					Grouped items
					{_.times(25, n => (
						<Tag key={n}>
							{words[n % words.length]}
						</Tag>
					))}
				</Tag>

				<Tag>
					Grouped items
					{_.times(25, n => (
						<Tag key={n}>
							{words[n % words.length]}
						</Tag>
					))}
				</Tag>
			</div>
		);
	},
});
