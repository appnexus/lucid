import React from 'react';
import DropMenuStateless from '../DropMenu';
import { buildStatefulComponent } from '../../../util/state-management';
import CaretIcon from '../../Icon/CaretIcon/CaretIcon';

const DropMenu = buildStatefulComponent(DropMenuStateless);
const {
	Control,
	Option
} = DropMenu;

export default React.createClass({
	render() {
		return (
			<DropMenu>
				<Control>
					Colors<CaretIcon direction='down' />
				</Control>
				<Option>Red</Option>
				<Option>Green</Option>
				<Option>Blue</Option>
			</DropMenu>
		);
	}
});
