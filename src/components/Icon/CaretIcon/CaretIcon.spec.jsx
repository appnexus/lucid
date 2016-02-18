import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../util/generic-tests';

import CaretIcon from './CaretIcon';

describe('CaretIcon', () => {
	common(CaretIcon);

	describe('icon', () => {
		it('should have a badge with the "has-badge" class when badge is true', () => {
			const wrapper = shallow(<CaretIcon badge={true} />);
			let classNames = wrapper.find('svg').prop('className').split(' ');
			assert(_.includes(classNames, 'lucid-CaretIcon'), `'${classNames}' should include 'lucid-CaretIcon-has-badge'`);
		});
	});
});
