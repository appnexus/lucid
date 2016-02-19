import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../../util/generic-tests';

import MinusIcon from './MinusIcon';

describe('MinusIcon', () => {
	common(MinusIcon);

	describe('icon', () => {
		it('should have a badge with the "has-badge" class when badge is true', () => {
			const wrapper = shallow(<MinusIcon badge={true} />);
			let classNames = wrapper.find('svg').prop('className').split(' ');
			assert(_.includes(classNames, 'lucid-MinusIcon'), `'${classNames}' should include 'lucid-MinusIcon-has-badge'`);
		});
	});
});
