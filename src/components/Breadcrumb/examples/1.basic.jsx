import React from 'react';
import { Breadcrumb, InfoIcon } from '../../../index';

const { Item } = Breadcrumb;

export default React.createClass({
  render() {
    return (
			<Breadcrumb>
				<Item key='home'>
					<a href='#'><InfoIcon /></a>
				</Item>
				<Item key='list'>
					<a href='#'>List</a>
				</Item>
				<Item key='item'>
					Item
				</Item>
			</Breadcrumb>
    );
  },
});
