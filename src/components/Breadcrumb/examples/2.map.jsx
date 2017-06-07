import _ from 'lodash';
import createClass from 'create-react-class';
import React from 'react';
import { Breadcrumb } from '../../../index';

const { Item } = Breadcrumb;

export default createClass({
	render() {
		return (
			<Breadcrumb>
				{_.map(['Foo', 'Bar', 'Baz'], item => (
					<Item key={item}>
						<a href="#">{item}</a>
					</Item>
				))}
				<Item key="qux">Qux</Item>
			</Breadcrumb>
		);
	},
});
