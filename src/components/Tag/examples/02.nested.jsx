import React from 'react';
import { Tag } from '../../../index';
import _ from 'lodash';

const words = ['Fashion', 'The', 'Vexillologist', 'Cold Brew', 'This is a longer sentence that should be handled okay but what if it is even longer than you could ever think imaginable'];

export default React.createClass({
	render() {
		return (
			<div>
				<Tag showXButton={true}>
					Lorem ipsum
					{_.times(25, (n) => (
						<Tag
							key={n}
							showXButton={true}
						>
							{words[n % words.length]}
						</Tag>
					))}
				</Tag>
			</div>
		);
	},
});
