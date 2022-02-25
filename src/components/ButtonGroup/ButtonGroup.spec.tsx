import _ from 'lodash';
import React from 'react';
import assert from 'assert';
import sinon from 'sinon';
import { common } from '../../util/generic-tests';
import { shallow, mount } from 'enzyme';

import { ButtonGroupDumb as ButtonGroup } from './ButtonGroup';

const defaultProps = ButtonGroup.defaultProps;

describe('ButtonGroup', () => {
	common(ButtonGroup);

	it('prop children', () => {
		const wrapper = shallow(
			<ButtonGroup {...defaultProps}>
				<ButtonGroup.Button />
				<div className='jim' />
			</ButtonGroup>
		);

		assert(wrapper.contains(<div className='jim' />));
	});

	it('prop selectedIndices', () => {
		const wrapper = shallow(
			<ButtonGroup {...defaultProps} selectedIndices={[1]}>
				<ButtonGroup.Button />
				<ButtonGroup.Button />
			</ButtonGroup>
		);

		assert.strictEqual(wrapper.children().at(1).prop('isActive'), true);
	});
});

describe('ButtonGroup', () => {
	it('prop onSelect', () => {
		const onSelect: any = sinon.spy();
		const wrapper = mount(
			<ButtonGroup {...defaultProps} onSelect={onSelect}>
				<ButtonGroup.Button />
				<ButtonGroup.Button />
			</ButtonGroup>
		);

		wrapper.children().children().at(1).simulate('click'); // second button

		assert.strictEqual(onSelect.args[0][0], 1);
	});

	it('tests onSelect props shape', () => {
		const onSelect: any = jest.fn();
		const wrapper = mount(
			<ButtonGroup {...defaultProps} onSelect={onSelect}>
				<ButtonGroup.Button data-test-name='zero' />
				<ButtonGroup.Button data-test-name='one' />
				<ButtonGroup.Button data-test-name='two' />
			</ButtonGroup>
		);

		wrapper.find('button[data-test-name="one"]').simulate('click');

		expect(onSelect).toBeCalledWith(1, {
			event: expect.anything(),
			props: {
				'data-test-name': 'one',
				hasOnlyIcon: false,
				isActive: false,
				isDisabled: false,
				onClick: expect.anything(),
				type: 'button',
			},
		});
	});

	it('prop onSelect on children', () => {
		const onClick = sinon.spy();
		const wrapper = mount(
			<ButtonGroup {...defaultProps}>
				<ButtonGroup.Button />
				<ButtonGroup.Button onClick={onClick} />
			</ButtonGroup>
		);

		wrapper.children().children().at(1).simulate('click'); // second button

		assert(onClick.called, 'onClick was not called');
		assert(
			_.has(onClick.args[0][0], 'event'),
			'`event` missing from `onClick` callback'
		);
		assert(
			_.has(onClick.args[0][0], 'props'),
			'`props` missing from `onClick` callback'
		);
	});
});
