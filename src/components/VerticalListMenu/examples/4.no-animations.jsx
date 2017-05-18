import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { VerticalListMenu } from '../../../index';

export default createClass({
	render() {
		return (
			<VerticalListMenu style={{ width: 250 }}>
				<VerticalListMenu.Item>Level one</VerticalListMenu.Item>
				<VerticalListMenu.Item
					Collapsible={{
						isAnimated: false, // don't animate
						isMountControlled: false, // don't remove items from the dom when they are hidden
					}}
					hasExpander={true}
				>
					Level one with VerticalListMenu
					<VerticalListMenu>
						{_.times(50, n => {
							return (
								<VerticalListMenu.Item key={n}>Level two</VerticalListMenu.Item>
							);
						})}
					</VerticalListMenu>
				</VerticalListMenu.Item>
				<VerticalListMenu.Item>Level one</VerticalListMenu.Item>
			</VerticalListMenu>
		);
	},
});
