import React from 'react';
import createReactClass from 'create-react-class';
import { Tag } from '../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<div>
					<Tag>I'm a tag!</Tag>
				</div>

				<div>
					<Tag isRemovable={true}>I have an X!</Tag>
				</div>
			</div>
		);
	},
});
