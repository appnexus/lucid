import React from 'react';
import { Tag } from '../../../index';
import _ from 'lodash';

const words = ['Fashion', 'The', 'Vexillologist', 'Cold Brew', 'This is a longer sentence that should be handled okay but what if it is even longer than you could ever think imaginable'];

export default React.createClass({
	render() {
		return (
			<div>
				<Tag>Lorem ipsum dolor</Tag>
				<Tag>Sit amet, consectetur adipisicing</Tag>
				<Tag showXButton={true}>Foo</Tag>
				<Tag showXButton={true}>
					Lorem ipsum
					{_.times(25, () => (
						<Tag showXButton={true}>{_.sample(words)}</Tag>
					))}
				</Tag>
			</div>
		);
	},
});
