import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../util/generic-tests';

import CrossIcon from './CrossIcon';

describe('CrossIcon', () => {
	common(CrossIcon);

	describe('icon', () => {
		it('should have a badge with the "has-badge" class when badge is true', () => {
			const wrapper = shallow(<CrossIcon badge={true} />);
			let classNames = wrapper.find('svg').prop('className').split(' ');
			assert(_.includes(classNames, 'lucid-CrossIcon'), `'${classNames}' should include 'lucid-CrossIcon-has-badge'`);
		});
	});
});
