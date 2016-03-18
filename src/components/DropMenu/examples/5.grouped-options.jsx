import React from 'react';
import DropMenuStateless from '../DropMenu';
import { buildStatefulComponent } from '../../../util/state-management';
import Button from '../../Button/Button';

const DropMenu = buildStatefulComponent(DropMenuStateless);
const {
	Control,
	Option,
	OptionGroup
} = DropMenu;

export default React.createClass({
	render() {
		return (
			<DropMenu>
				<Control>
					<Button>Select Color</Button>
				</Control>

				<OptionGroup>
					<Option>Select Color</Option>
				</OptionGroup>

				<OptionGroup>
					Screen
					<Option>Red</Option>
					<Option>Green</Option>
					<Option>Blue</Option>
				</OptionGroup>

				<OptionGroup>
					Print
					<Option>Cyan</Option>
					<Option>Yellow</Option>
					<Option>Magenta</Option>
					<Option>Black</Option>
				</OptionGroup>
			</DropMenu>
		);
	}
});
