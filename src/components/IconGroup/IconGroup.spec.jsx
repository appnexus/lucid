import React from 'react';
import _ from 'lodash';
import assert from 'assert';
import { shallow, mount } from 'enzyme';

import { common } from '../../util/generic-tests';
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
			<IconGroup selectedIndices={[[1], []]}>
				<IconGroup.Box />
				<IconGroup.Box />
			</IconGroup>
		);

		assert.equal(wrapper.children().at(1).prop('isSelected'), true);
	});

	describe('handleSelect', () => {
		it('should trigger `onSelect` when a `IconGroup.Box` is clicked', () => {
			const onSelect = jest.fn();
			const event = {};
			const callbackId = 1;
			const wrapper = shallow(
				<IconGroup onSelect={onSelect}>
					<IconGroup.Box className="myClass1" />
					<IconGroup.Box className="myClass2" />
				</IconGroup>
			);
			const icongroupSelectInstance = wrapper.instance();

			icongroupSelectInstance.handleSelect({
				event,
				props: {
					callbackId,
					...wrapper.children().at(1).props(),
				},
			});

			expect(onSelect).toHaveBeenCalledWith(callbackId, {
				event,
				props: {
					callbackId,
					...wrapper.children().at(1).props(),
				},
			});
		});
	});
});
