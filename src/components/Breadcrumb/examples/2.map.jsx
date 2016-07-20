import _ from 'lodash';
import React from 'react';
import { Breadcrumb } from '../../../index';

const { Item } = Breadcrumb;

export default React.createClass({
  render() {
    return (
			<Breadcrumb>
				{_.map(['Foo', 'Bar', 'Baz'], item => (
					<Item key={item}>
						<a href='#'>{item}</a>
					</Item>
				))}
				<Item key='qux'>Qux</Item>
			</Breadcrumb>
    );
  },
});
