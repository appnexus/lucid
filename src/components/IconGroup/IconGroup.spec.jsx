import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';

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
	});

	it('prop selectedIndices', () => {});
});
