import React from 'react';
import assert from 'assert';
import { shallow, mount } from 'enzyme';

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
	common(IconSelect, {
		getDefaultProps: () => ({ items: [] }),
	} as any);

	it('prop children', () => {
		const wrapper = shallow(
			<IconSelect items={items as any}>
				<div className='jim' />
			</IconSelect>
		);

		assert(wrapper.contains(<div className='jim' />));
	});

	it('has a selected item', () => {
		const wrapper = shallow(<IconSelect items={items as any} />);

		assert.strictEqual(
			wrapper
				.children()
				.at(1)
				.children()
				.at(0)
				.children()
				.at(0)
				.prop('isSelected'),
			true
		);
	});

	it('has an unselected selected item', () => {
		const wrapper = shallow(<IconSelect items={items as any} />);

		assert.strictEqual(
			wrapper
				.children()
				.at(0)
				.children()
				.at(0)
				.children()
				.at(0)
				.prop('isSelected'),
			false
		);
	});

	describe('IconSelect Events', () => {
		it('should call the onClick handler when clicked', () => {
			const onIconSelectClick = jest.fn();
			const wrapper = mount(
				<IconSelect items={items as any} onSelect={onIconSelectClick} />
			);
			wrapper.find('figure[data-id="one"]').simulate('click');
			expect(onIconSelectClick).toBeCalledTimes(1);
		});

		it('should not use onClick if disabled', () => {
			const onIconSelectMock = jest.fn();
			const wrapper = mount(
				<IconSelect
					items={items as any}
					onSelect={onIconSelectMock}
					isDisabled
				/>
			);
			wrapper.find('figure[data-id="one"]').simulate('click');

			expect(onIconSelectMock).not.toHaveBeenCalled();
		});
	});
});
