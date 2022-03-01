import _ from 'lodash';
import React from 'react';
import assert from 'assert';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import { common } from '../../util/generic-tests';
import { ButtonGroupDumb as ButtonGroup } from './ButtonGroup';

const defaultProps = ButtonGroup.defaultProps;

describe('ButtonGroup', () => {
	common(ButtonGroup);

	describe('props', () => {
		it('prop children', () => {
			const wrapper = shallow(
				<ButtonGroup {...defaultProps}>
					<ButtonGroup.Button data-test-name='one' />
					<div className='jim' />
				</ButtonGroup>
			);

			assert(wrapper.contains(<div className='jim' />));
		});

		it('prop selectedIndices', () => {
			const wrapper = shallow(
				<ButtonGroup {...defaultProps} selectedIndices={[1]}>
					<ButtonGroup.Button data-test-name='zero' />
					<ButtonGroup.Button data-test-name='one' />
				</ButtonGroup>
			);

			assert.strictEqual(wrapper.children().at(1).prop('isActive'), true);
		});

		it('prop onSelect', () => {
			const onSelect: any = sinon.spy();
			const wrapper = mount(
				<ButtonGroup {...defaultProps} onSelect={onSelect}>
					<ButtonGroup.Button data-test-name='zero' />
					<ButtonGroup.Button data-test-name='one' />
				</ButtonGroup>
			);

			wrapper.find('button[data-test-name="one"]').simulate('click');

			assert.strictEqual(onSelect.args[0][0], 1);
		});

		it('prop onSelect on children', () => {
			const onClick = sinon.spy();
			const wrapper = mount(
				<ButtonGroup {...defaultProps}>
					<ButtonGroup.Button data-test-name='zero' />
					<ButtonGroup.Button onClick={onClick} data-test-name='one' />
				</ButtonGroup>
			);

			wrapper.find('button[data-test-name="one"]').simulate('click');

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

		it('tests onSelect props have the correct shape', () => {
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
	});
});
