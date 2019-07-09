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
					<Tag>beatae</Tag>
					<Tag>quibusdam</Tag>
					<Tag>repudiandae</Tag>
					<Tag>facilis,</Tag>
					<Tag>ratione</Tag>
					<Tag>ratione.</Tag>
					<Tag>Hic</Tag>
					<Tag>molestias</Tag>
					<Tag>nobis</Tag>
					<Tag>autem</Tag>
					<Tag>sapiente</Tag>
					<Tag>vitae.</Tag>
				</div>

				<div>
					<Tag isRemovable>Amet</Tag>
					<Tag isRemovable>nam</Tag>
					<Tag isRemovable>beatae</Tag>
					<Tag isRemovable>quibusdam</Tag>
					<Tag isRemovable>repudiandae</Tag>
					<Tag isRemovable>facilis,</Tag>
					<Tag isRemovable>ratione</Tag>
					<Tag isRemovable>ratione.</Tag>
					<Tag isRemovable>Hic</Tag>
					<Tag isRemovable>molestias</Tag>
					<Tag isRemovable>nobis</Tag>
					<Tag isRemovable>autem</Tag>
					<Tag isRemovable>sapiente</Tag>
					<Tag isRemovable>vitae.</Tag>
				</div>

				<div>
					<Tag>
						Fruits
						<Tag>Apples</Tag>
						<Tag>Oranges</Tag>
						<Tag>Bananas</Tag>
					</Tag>
					<Tag>
						Vegetables
						<Tag>Carrots</Tag>
						<Tag>Spinach</Tag>
						<Tag>Celery</Tag>
					</Tag>
				</div>

				<div>
					<Tag>
						Fruits
						<Tag isRemovable>Apples</Tag>
						<Tag isRemovable>Oranges</Tag>
						<Tag isRemovable>Bananas</Tag>
					</Tag>
					<Tag>
						Vegetables
						<Tag isRemovable>Carrots</Tag>
						<Tag isRemovable>Spinach</Tag>
						<Tag isRemovable>Celery</Tag>
					</Tag>
				</div>

				<div>
					<Tag isRemovable>
						Fruits
						<Tag isRemovable>Apples</Tag>
						<Tag isRemovable>Oranges</Tag>
						<Tag isRemovable>Bananas</Tag>
						<Tag isRemovable>Apples</Tag>
						<Tag isRemovable>Oranges</Tag>
						<Tag isRemovable>Bananas</Tag>
						<Tag isRemovable>Apples</Tag>
						<Tag isRemovable>Oranges</Tag>
						<Tag isRemovable>Bananas</Tag>
					</Tag>
					<Tag isRemovable>
						Vegetables
						<Tag isRemovable>Carrots</Tag>
						<Tag isRemovable>Spinach</Tag>
						<Tag isRemovable>Celery</Tag>
					</Tag>
				</div>

				<div>
					<Tag isRemovable isTop>
						Produce
						<Tag isRemovable>
							Fruits
							<Tag isRemovable>Apples</Tag>
							<Tag isRemovable>Oranges</Tag>
							<Tag isRemovable>Bananas</Tag>
							<Tag>Pears</Tag>
						</Tag>
						<Tag>
							Vegetables
							<Tag isRemovable>Carrots</Tag>
							<Tag isRemovable>Spinach</Tag>
							<Tag isRemovable>Celery</Tag>
							<Tag>Cucumbers</Tag>
						</Tag>
					</Tag>
					<Tag isTop hasLightBackground={false}>
						Produce
						<Tag isRemovable>
							Fruits
							<Tag isRemovable>Apples</Tag>
							<Tag isRemovable>Oranges</Tag>
							<Tag isRemovable>Bananas</Tag>
							<Tag>Pears</Tag>
						</Tag>
						<Tag>
							Vegetables
							<Tag isRemovable>Carrots</Tag>
							<Tag isRemovable>Spinach</Tag>
							<Tag isRemovable>Celery</Tag>
							<Tag>Cucumbers</Tag>
						</Tag>
					</Tag>
				</div>
			</div>
		);
	},
});
