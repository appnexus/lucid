import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../../util/generic-tests';

import SearchIcon from './SearchIcon';

describe('SearchIcon', () => {
	common(SearchIcon);

	describe('icon', () => {
		it('should have a badge with the "has-badge" class when badge is true', () => {
			const wrapper = shallow(<SearchIcon badge={true} />);
			let classNames = wrapper.find('svg').prop('className').split(' ');
			assert(_.includes(classNames, 'lucid-SearchIcon'), `'${classNames}' should include 'lucid-SearchIcon-has-badge'`);
		});
	});
});
