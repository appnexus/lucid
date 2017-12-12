import _ from 'lodash';
import React from 'react';
import assert from 'assert';
import sinon from 'sinon';
import { common } from '../../util/generic-tests';
import { shallow, mount } from 'enzyme';

import { IconGroupDumb as IconGroup } from './IconGroup';

describe('IconGroup', () => {
	common(IconGroup);

	it('prop children', () => {
		const wrapper = shallow(
			<IconGroup>
				<IconGroup.IconBox />
				<div className="jim" />
			</IconGroup>
		);

		assert(wrapper.contains(<div className="jim" />));
	});

	it('prop selectedIndices', () => {
		const wrapper = shallow(
			<IconGroup selectedIndices={[1]}>
				<IconGroup.IconBox />
				<IconGroup.IconBox />
			</IconGroup>
		);

		assert.equal(wrapper.children().at(1).prop('isActive'), true);
	});
});

describe('IconGroup', () => {
	it('prop onSelect', () => {
		const onSelect = sinon.spy();
		const wrapper = mount(
			<IconGroup onSelect={onSelect}>
				<IconGroup.IconBox />
				<IconGroup.IconBox />
			</IconGroup>
		);

		wrapper.children().children().at(1).simulate('click'); // second button

		assert.equal(onSelect.args[0][0], 1);
	});

	it('prop onSelect on children', () => {
		const onClick = sinon.spy();
		const wrapper = mount(
			<IconGroup>
				<IconGroup.IconBox />
				<IconGroup.IconBox onClick={onClick} />
			</IconGroup>
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
