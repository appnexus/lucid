import _ from 'lodash';
import React from 'react';
import { Breadcrumb, InfoIcon } from '../../../index';

const { Item } = Breadcrumb;

export default React.createClass({
  render() {
    return (
			<div>
				<section>
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
				</section>
				<section style={{marginTop: 10}}>
					<Breadcrumb>
						{_.map(['Foo', 'Bar', 'Baz'], item => (
							<Item key={item}>
								<a href='#'>{item}</a>
							</Item>
						))}
						<Item key='qux'>Qux</Item>
					</Breadcrumb>
				</section>
			</div>
    );
  },
});
