import React from 'react';
import { shallow } from 'enzyme';

import { common } from '../../util/generic-tests';
import Underline from './Underline';

describe('Underline', () => {
	common(Underline);

	it('should match snapshot for default props', () => {
		expect(
			shallow(<Underline />, {
				disableLifecycleMethods: true,
			})
		).toMatchSnapshot();
	});

	it('should match snapshot for default props with children', () => {
		expect(
			shallow(<Underline>foo bar baz</Underline>, {
				disableLifecycleMethods: true,
			})
		).toMatchSnapshot();
	});

	it('should match snapshot for string match with children', () => {
		expect(
			shallow(<Underline match='bar'>foo bar baz</Underline>, {
				disableLifecycleMethods: true,
			})
		).toMatchSnapshot();
	});

	it('should match snapshot for regex match with children', () => {
		expect(
			shallow(<Underline match={/foo?/i}>foo bar baz</Underline>, {
				disableLifecycleMethods: true,
			})
		).toMatchSnapshot();
	});
});
