import _, { forEach, has } from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';

import { common } from '../../util/generic-tests';
import { SplitButtonDumb as SplitButton } from './SplitButton';

describe('SplitButton', () => {
	common(SplitButton);

	describe('props', () => {
		describe('root pass throughs', () => {
			let wrapper: any;
			const defaultProps = SplitButton.defaultProps;

			beforeEach(() => {
				const props = {
					...defaultProps,
					children: <SplitButton.Button>One</SplitButton.Button>,
					direction: 'up' as any,
					kind: 'danger' as any,
					size: 'small' as any,
					type: 'button',
					className: 'wut',
					style: { marginRight: 10 },
					initialState: { test: true },
					callbackId: 1,
					'data-testid': 10,
				};
				wrapper = shallow(<SplitButton {...props} />);
			});

			afterEach(() => {
				wrapper.unmount();
			});

			it('passes through props not defined in `propTypes` to the root element.', () => {
				const rootProps = wrapper.find('.lucid-SplitButton').props();

				expect(wrapper.first().prop(['className'])).toContain('wut');
				expect(wrapper.first().prop(['style'])).toMatchObject({
					marginRight: 10,
				});
				expect(wrapper.first().prop(['data-testid'])).toBe(10);

				// 'className', 'direction' and 'onSelect' are plucked from the pass through object
				// but still appears becuase each one is also directly added to the root element as a prop
				forEach(
					['className', 'data-testid', 'direction', 'onSelect', 'children'],
					(prop) => {
						expect(has(rootProps, prop)).toBe(true);
					}
				);
			});
			it('omits the props defined in `propTypes` (plus, in addition, `initialState`, and `callbackId`) from the root element', () => {
				const rootProps = wrapper.find('.lucid-SplitButton').props();

				// Note that the SplitButton root element is not a DOM Element
				// It is a DropMenu, so it should probably not omit `callbackId`
				// However, that is the way that it has been working for years,
				// so I did not modify it when I removed `omitProps` - NJY 18 Apr 22.
				forEach(
					['DropMenu', 'kind', 'size', 'type', 'initialState', 'callbackId'],
					(prop) => {
						expect(has(rootProps, prop)).toBe(false);
					}
				);
			});
		});
	});

	describe('click handlers', () => {
		const handleClick = jest.fn();
		const handleOtherClick = jest.fn();
		const params = {
			event: {
				stopPropagation: jest.fn(),
			},
		};
		const wrapper = shallow(
			<SplitButton>
				<SplitButton.Button onClick={handleClick} />
				<SplitButton.Button onClick={handleOtherClick} />
				<SplitButton.Button onClick={handleOtherClick} />
				<SplitButton.Button />
			</SplitButton>
		);

		beforeEach(() => {
			handleClick.mockClear();
			handleOtherClick.mockClear();
			params.event.stopPropagation.mockClear();
		});

		describe('primary button', () => {
			it('should trigger `handleClick`', () => {
				const primaryButtonWrapper = wrapper.find('Button').at(0);
				primaryButtonWrapper.simulate('click', params);

				expect(params.event.stopPropagation).toBeCalled();
				expect(handleClick).toBeCalled();
				expect(handleOtherClick).not.toBeCalled();
				expect(handleClick.mock.calls[0][0]).toMatchSnapshot();
			});

			it('should not trigger `handleClick` when the dropdown button is clicked', () => {
				const dropdownButtonWrapper = wrapper.find('Button').at(1);
				dropdownButtonWrapper.simulate('click', params);

				expect(params.event.stopPropagation).not.toBeCalled();
				expect(handleClick).not.toBeCalled();
				expect(handleOtherClick).not.toBeCalled();
			});
		});

		describe('secondary buttons', () => {
			it('should call the click handler for the second button when it is selected', () => {
				wrapper.simulate('select', 0, { event: {} });

				expect(handleClick).not.toBeCalled();
				expect(handleOtherClick.mock.calls[0][0]).toMatchSnapshot();
			});

			it('should call the click handler for the third button when it is selected', () => {
				wrapper.simulate('select', 1, { event: {} });

				expect(handleClick).not.toBeCalled();
				expect(handleOtherClick.mock.calls[0][0]).toMatchSnapshot();
			});

			it('should not trigger a handler for a button without an `onClick`', () => {
				wrapper.simulate('select', 2, { event: {} });

				expect(handleClick).not.toBeCalled();
				expect(handleOtherClick).not.toBeCalled();
			});

			it('should not call the click handler for the second button when an invalid index is selected', () => {
				wrapper.simulate('select', 3, { event: {} });

				expect(handleClick).not.toBeCalled();
				expect(handleOtherClick).not.toBeCalled();
			});
		});
	});
});
