import _ from 'lodash';
import React from 'react';
import assert from 'assert';
import sinon from 'sinon';
import { common, controls } from '../../util/generic-tests';
import { shallow, mount } from 'enzyme';

import { IconGroupDumb as IconGroup } from './IconGroup';

describe('IconGroup', () => {
	// common(IconGroup);

	it('prop children', () => {
		const wrapper = shallow(
			<IconGroup>
				<IconGroup.IconBox />
				<div className="jim" />
			</IconGroup>
		);

		assert(wrapper.contains(<div className="jim" />));
	});

	describe('prop className', () => {
		it('can have a custom classname', () => {
			const wrapper = shallow(
				<IconGroup className={'myClass'}>
					<IconGroup.IconBox>Test</IconGroup.IconBox>
				</IconGroup>
			);

			assert(wrapper.find('.lucid-IconGroup').hasClass('myClass'));
		});

		it('passes custom classnames to IconBox', () => {
			const wrapper = shallow(
				<IconGroup className="myClass">
					<IconGroup.IconBox>Test</IconGroup.IconBox>
				</IconGroup>
			);

			assert(
				wrapper.find('.lucid-IconGroup-IconBox').hasClass('myClass-IconBox')
			);
		});
	});

	it('prop selectedIndices', () => {});
});
