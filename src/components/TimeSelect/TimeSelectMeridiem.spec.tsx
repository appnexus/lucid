import { shallow } from 'enzyme';
import React from 'react';
import SingleSelect from '../SingleSelect/SingleSelect';
import { MeridiemType } from './TimeSelect';
import TimeSelectMeridiem from './TimeSelectMeridiem';

describe('TimeSelectMeridiem', () => {
	const props = {
		hour: 3,
		meridiem: MeridiemType.AM,
		time: new Date(2020, 10, 3),
		isDisabled: false,
		onChange: jest.fn(),
	};

	let component: any;
	beforeEach(() => {
		component = shallow(<TimeSelectMeridiem {...props} />);
	});

	it('should render SingleSelect with correct props', () => {
		expect(component.find(SingleSelect).props()).toEqual({
			className: 'lucid-TimeSelect-meridiem',
			isSelectionHighlighted: false,
			showIcon: false,
			selectedIndex: 0,
			isInvisible: true,
			onSelect: expect.any(Function),
			isDisabled: props.isDisabled,
			hasReset: false,
			children: expect.anything(),
		});
	});

	describe('when MeridiemType is AM', () => {
		it('should select index 0 on SingleSelect', () => {
			expect(component.find(SingleSelect).props().selectedIndex).toEqual(0);
		});
	});
	describe('when MeridiemType is PM', () => {
		it('should select index 1 on SingleSelect', () => {
			component = shallow(
				<TimeSelectMeridiem {...props} meridiem={MeridiemType.PM} />
			);
			expect(component.find(SingleSelect).props().selectedIndex).toEqual(1);
		});
	});

	describe('when changing AM to PM', () => {
		it('should return correct new time', () => {
			props.onChange.mockReset();
			component = shallow(
				<TimeSelectMeridiem {...props} meridiem={MeridiemType.AM} />
			);
			component.find(SingleSelect).props().onSelect(1);
			expect(props.onChange).toBeCalledWith(new Date('2020-11-03T15:00:00'));
		});
	});

	describe('when changing PM to AM', () => {
		it('should return correct new time', () => {
			props.onChange.mockReset();
			component = shallow(
				<TimeSelectMeridiem {...props} meridiem={MeridiemType.PM} />
			);
			component.find(SingleSelect).props().onSelect(0);
			expect(props.onChange).toBeCalledWith(new Date('2020-11-03T03:00:00'));
		});
	});
});
