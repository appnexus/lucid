import _, { forEach, has, noop } from 'lodash';
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

	describe('pass throughs', () => {
		let wrapper: any;
		const defaultProps = IconSelect.defaultProps;

		beforeEach(() => {
			const props = {
				...defaultProps,
				items,
				kind: 'multiple' as any,
				onSelect: noop,
				isDisabled: true,
				style: { marginRight: 10 },
				initialState: { test: true },
				callbackId: 1,
				'data-testid': 10,
			};
			wrapper = shallow(<IconSelect {...props} />);
		});

		afterEach(() => {
			if (wrapper) {
				wrapper.unmount();
			}
		});

		it('passes through select props to the root element.', () => {
			const rootProps = wrapper.find('.lucid-IconSelect').props();

			// 'className' is plucked from the pass through object
			// but still appears becuase it is also directly placed on the root element as a prop
			forEach(['className', 'style', 'children', 'data-testid'], (prop) => {
				expect(has(rootProps, prop)).toBe(true);
			});
		});
		it("omits the component props, and, in addition, 'initialState' and 'callbackId' from the root element", () => {
			const rootProps = wrapper.find('.lucid-IconSelect').props();

			forEach(
				[
					'items',
					'kind',
					'onSelect',
					'isDisabled',
					'initialState',
					'callbackId',
				],
				(prop) => {
					expect(has(rootProps, prop)).toBe(false);
				}
			);
		});
	});
});
