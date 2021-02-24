import { shallow } from 'enzyme';
import React from 'react';
import { common } from '../../util/generic-tests';
import { SplitButtonDumb as SplitButton } from './SplitButton';

describe('SplitButton', () => {
	common(SplitButton);

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
