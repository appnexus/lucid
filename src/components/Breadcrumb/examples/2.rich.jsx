import createClass from 'create-react-class';
import React from 'react';
import { Breadcrumb, NotchedTag } from '../../../index';

const { Item } = Breadcrumb;

export default createClass({
	render() {
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
	},
});
