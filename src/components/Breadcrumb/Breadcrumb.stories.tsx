import React from 'react';
import { Breadcrumb, NotchedTag } from './../../index';

export default {
	title: 'Navigation/Breadcrumb',
	component: Breadcrumb,
	parameters: {
		docs: {
			description: {
				component: (Breadcrumb as any).peek.description,
			},
		},
	},
};

/* Default */
export const Default = () => {
	const { Item } = Breadcrumb;

	return (
		<Breadcrumb>
			<Item key='home'>
				<a href='#'>Start</a>
			</Item>
			<Item key='list'>
				<a href='#'>List</a>
			</Item>
			<Item key='item'>
				<a href='#'>Item</a>
			</Item>
		</Breadcrumb>
	);
};
Default.storyName = 'Default';

/* Rich */
export const Rich = () => {
	const { Item } = Breadcrumb;

	return (
		<Breadcrumb>
			<Item key='home'>
				<a href='#'>
					<NotchedTag type='stroke' size='small' tagStyle='style-two'>
						IO
					</NotchedTag>
					<span>
						<span>Foo</span>
						<span style={{ fontWeight: 400 }}>&nbsp;(1234)</span>
					</span>
				</a>
			</Item>
			<Item key='list'>
				<a href='#'>
					<NotchedTag type='filled' size='small' tagStyle='style-three'>
						LI
					</NotchedTag>
					<span>
						<span>Bar</span>
						<span style={{ fontWeight: 400 }}>&nbsp;(1234)</span>
					</span>
				</a>
			</Item>
		</Breadcrumb>
	);
};
Rich.storyName = 'Rich';
