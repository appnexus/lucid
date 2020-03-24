import React from 'react';
import createClass from 'create-react-class';
import { Tag } from '../../../index';

export default createClass({
	render() {
		return (
			<div>
				<div>
					<Tag>Amet</Tag>
					<Tag>nam</Tag>
					<Tag>quibusdam</Tag>
					<Tag isRemovable>nobis</Tag>
					<Tag isRemovable>autem</Tag>
					<Tag isRemovable>sapiente</Tag>
				</div>

				<div>
					<Tag>
						Fruits
						<Tag>Apples</Tag>
						<Tag>Oranges</Tag>
						<Tag>Bananas</Tag>
					</Tag>
					<Tag isRemovable>
						Vegetables
						<Tag isRemovable>Carrots</Tag>
						<Tag isRemovable>Spinach</Tag>
						<Tag isRemovable>Celery</Tag>
					</Tag>
				</div>
			</div>
		);
	},
});
