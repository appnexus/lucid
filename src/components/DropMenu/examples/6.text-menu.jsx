import React from 'react';
import DropMenuStateless from '../DropMenu';
import { buildStatefulComponent } from '../../../util/state-management';
import TextField from '../../TextField/TextField';

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
					<TextField placeholder='Text DropMenu' />
				</Control>
				<Option>Red</Option>
				<Option>Green</Option>
				<Option>Blue</Option>
			</DropMenu>
		);
	}
});
