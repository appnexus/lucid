import React from 'react';
import DropMenuStateless from '../DropMenu';
import { buildStatefulComponent } from '../../../util/state-management';
import Button from '../../Button/Button';

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
					<Button>Select Color</Button>
				</Control>
				<Option isDisabled>Red</Option>
				<Option>Green</Option>
				<Option isDisabled>Blue</Option>
			</DropMenu>
		);
	}
});
