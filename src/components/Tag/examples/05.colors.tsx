import React from 'react';
import createClass from 'create-react-class';
import { Tag } from '../../../index';

export default createClass({
	render() {
		return (
			<div>
				<Tag>
					<Tag kind={'info'}>notitia</Tag>
					<Tag kind={'danger'}>periculum</Tag>
					<Tag kind={'default'}>deficio</Tag>
				</Tag>
				<Tag>
					<Tag isRemovable kind={'info'}>
						notitia
					</Tag>
					<Tag isRemovable kind={'danger'}>
						periculum
					</Tag>
				</Tag>
			</div>
		);
	},
});

// begin-hide-from-docs
export const notes = `
Tags are available in two additional colors:

- \`kind='danger'\` for settings that can not be saved, for example custom dates outside of the flight range.
- \`kind='default\` for disabled items, for example past flights. This color can not be used for \`isRemovable\` tags.
`;
// end-hide-from-docs
