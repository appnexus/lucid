import React from 'react';
import { Tag } from '../../../index';

export default React.createClass({
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
