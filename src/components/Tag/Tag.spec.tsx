import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';

import { common, controls } from '../../util/generic-tests';
import Tag from './Tag';

const defaultProps = Tag.defaultProps;

describe('Tag', () => {
	common(Tag);

	controls(Tag, {
		callbackName: 'onRemove',
		controlSelector: '.lucid-Tag-remove-button',
		eventType: 'click',
		additionalProps: { isRemovable: true, children: 'foo' },
	});

	describe('props', () => {
		it('passes through some props to the root element', () => {
			const wrapper = shallow(
				<Tag
					{...defaultProps}
					{...{ foo: 1, bar: 2, baz: 3, qux: 4, quux: 5 }}
					className='testClassName'
				>
					<Tag />
					<Tag />
				</Tag>
			);
			const rootProps = _.keys(wrapper.first().props());

			// It should pass 'className' and 'children'
			// and `foo`, `bar`, `baz`, `qux`, and `quux`
			// to the root element.

			_.forEach(
				['className', 'children', 'foo', 'bar', 'baz', 'qux', 'quux'],
				(prop) => {
					expect(_.includes(rootProps, prop)).toBe(true);
				}
			);
		});
		it('filters out the nonPassThroughs from the component wrapper', () => {
			const nonPassThroughs = {
				...defaultProps,
				callbackId: 0,
				initialState: {},
			};
			const wrapper = shallow(<Tag {...nonPassThroughs}></Tag>);

			const rootProps = _.keys(wrapper.first().props());

			// It should not pass 'callbackId' or 'initialState'
			// to the root element.

			_.forEach(['callbackId', 'initialState'], (prop) => {
				expect(rootProps).not.toContain(prop);
			});
		});
	});
});
