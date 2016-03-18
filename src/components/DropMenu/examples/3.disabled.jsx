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
			<DropMenu isDisabled>
				<Control>
					<Button tabIndex={-1}>Select Color</Button>
				</Control>
			<Option>Red</Option>
			<Option>Green</Option>
			<Option>Blue</Option>
			</DropMenu>
		);
	}
});
