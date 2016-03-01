import React from 'react';
import assert from 'assert';
import sinon from 'sinon';
import { common } from '../../util/generic-tests';
import { shallow } from 'enzyme';

import ButtonGroup from './ButtonGroup';

describe('ButtonGroup', () => {
	common(ButtonGroup);

	it('prop onSelect', () => {
		const onSelect = sinon.spy();
		const wrapper = shallow(
			<ButtonGroup onSelect={onSelect}>
				<ButtonGroup.Button />
				<ButtonGroup.Button />
			</ButtonGroup>
		);

		wrapper.children().at(1).simulate('click'); // second button

		assert.equal(onSelect.args[0][0], 1);
	});

	it('prop children', () => {
		const wrapper = shallow(
			<ButtonGroup>
				<ButtonGroup.Button />
				<div className='jim' />
			</ButtonGroup>
		);

		assert(wrapper.contains(<div className='jim' />));
	});

	it('prop selectedIndices', () => {
		const wrapper = shallow(
			<ButtonGroup selectedIndices={[1]}>
				<ButtonGroup.Button />
				<ButtonGroup.Button />
			</ButtonGroup>
		);

		assert.equal(wrapper.children().at(1).prop('isActive'), true);
	});
});


