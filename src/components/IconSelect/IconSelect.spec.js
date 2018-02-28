import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';

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
	});

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
			wrapper
				.children()
				.at(1)
				.children()
				.at(1)
				.children()
				.prop('isSelected'),
			true
		);
	});

	describe('IconSelect Events', () => {
		it('should call the onClick handler when clicked', () => {
			const onIconSelect = jest.fn();
			const onIconSelectClick = jest.fn();
			const mockEvent = {
				target: {
					classList: {
						contains: () => true,
					},
					focus: onIconSelect,
					hasAttribute: () => false,
					dataset: {
						id: 'test',
					},
				},
			};
			const wrapper = shallow(
				<IconSelect items={items} onSelect={onIconSelectClick} />
			);
			const onClickEvent = wrapper.instance();

			onClickEvent.handleClick(mockEvent);

			expect(onIconSelect).toHaveBeenCalled();
			expect(onIconSelectClick).toHaveBeenCalledWith(
				'test',
				expect.objectContaining({
					event: expect.anything(),
					props: expect.anything(),
				})
			);
		});

		it('should not use onClick if disabled', () => {
			const onIconSelect = jest.fn();
			const onIconSelectClick = jest.fn();
			const mockEvent = {
				target: {
					focus: onIconSelect,
					hasAttribute: () => true,
					dataset: {
						id: 'test',
					},
				},
			};
			const wrapper = shallow(
				<IconSelect
					items={items}
					isDisabled={true}
					onSelect={onIconSelectClick}
				/>
			);
			const onClickEvent = wrapper.instance();

			onClickEvent.handleClick(mockEvent);

			expect(onIconSelect).not.toHaveBeenCalled();
			expect(onIconSelectClick).not.toHaveBeenCalled();
		});
	});
});
