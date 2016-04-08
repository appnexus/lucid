import React from 'react';
import VerticalListMenuStateless from '../VerticalListMenu';
import { buildStatefulComponent } from '../../../util/state-management';

const VerticalListMenu = buildStatefulComponent(VerticalListMenuStateless);

export default React.createClass({
	render() {
		return (
			<VerticalListMenu style={{ width: '250px' }}>
				<VerticalListMenu.Item>Level one</VerticalListMenu.Item>
				<VerticalListMenu.Item>Level one</VerticalListMenu.Item>
				<VerticalListMenu.Item>Level one</VerticalListMenu.Item>
			</VerticalListMenu>
		);
	}
});
