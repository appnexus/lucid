import React from 'react';
import createClass from 'create-react-class';
import { Tag } from '../../../index';

export default createClass({
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
