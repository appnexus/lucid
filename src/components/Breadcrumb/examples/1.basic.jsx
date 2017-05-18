import React from 'react';
import createClass from 'create-react-class';
import { Breadcrumb, HomeIcon } from '../../../index';

const { Item } = Breadcrumb;

export default createClass({
	render() {
		return (
			<Breadcrumb>
				<Item key="home">
					<a href="#"><HomeIcon /></a>
				</Item>
				<Item key="list">
					<a href="#">List</a>
				</Item>
				<Item key="item">
					Item
				</Item>
			</Breadcrumb>
		);
	},
});
