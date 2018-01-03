import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { common } from '../../util/generic-tests';
import IconSelect from './IconSelect';

const items = [
	{
		id: 'one',
		isSelected: false,
		label: 'one',
	},
	{
		id: 'two',
		isSelected: true,
		label: 'two',
	},
];

describe('IconSelect', () => {
	common(IconSelect);

	it('prop children', () => {
		const wrapper = shallow(
			<IconSelect items={items}>
				<div className="jim" />
			</IconSelect>
		);

		assert(wrapper.contains(<div className="jim" />));
	});

	it('has a selected item', () => {
		const wrapper = shallow(<IconSelect items={items} />);

		assert.equal(
			wrapper.children().at(1).children().at(1).children().prop('isSelected'),
			true
		);
	});

	describe.skip('IconSelect Events', () => {
		it('should call the onClick handler when clicked', () => {
			const onIconSelectClick = sinon.spy();
			const wrapper = shallow(
				<IconSelect items={items} onSelect={onIconSelectClick} />
			);

			wrapper.find(wrapper.children().at(0)).simulate('click');
			assert(onIconSelectClick.calledOnce);
		});

		it('should not use onClick if disabled', () => {
			const onIconSelectClick = sinon.spy();
			const wrapper = shallow(
				<IconSelect isDisabled={true} onSelect={onIconSelectClick} />
			);

			wrapper.find(wrapper.children().at(0)).simulate('click');
			assert(!onIconSelectClick.calledOnce);
		});
	});
});
