import { shallow } from 'enzyme';
import React from 'react';
import TimeSelectInput from './TimeSelectInput';

describe('TimeSelectInput', () => {
	const props = {
		className: 'hello',
		value: 2,
		step: 4,
		name: 'Dr Who',
		disabled: false,
		onChange: jest.fn(),
	};

	let component: any;
	beforeEach(() => {
		component = shallow(<TimeSelectInput {...props} />);
	});

	it('should render an input component with correct props', () => {
		expect(component.find('input').props()).toEqual({
			'aria-label': 'Dr Who',
			autoComplete: 'off',
			className: 'lucid-TimeSelect-time hello',
			'data-input': 'true',
			disabled: false,
			max: 60,
			min: -15,
			name: 'Dr Who',
			onChange: expect.any(Function),
			step: 4,
			type: 'number',
			value: '02',
		});
	});
});
