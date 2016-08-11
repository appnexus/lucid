import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import { common } from '../../util/generic-tests';
import sinon from 'sinon';
import { mount } from 'enzyme';

import Resizer, { __RewireAPI__ as rewire } from './Resizer';

describe('Resizer', () => {
	common(Resizer, {
		exemptFunctionProps: ['children'],
		getDefaultProps: () => {
			return {
				children: () => (<div />),
			}
		},
	});

	describe('render', () => {
		it('should call the correct function when unmounted', () => {
			const erd = {
				listenTo: _.noop,
				removeListener: sinon.spy(),
			};
			rewire.__Rewire__('erd', erd);

			const wrapper = mount(
				<Resizer>
					{_.noop}
				</Resizer>
			);

			assert(!erd.removeListener.called, 'removeListener was called before mounting');

			wrapper.unmount();

			assert(erd.removeListener.called, 'removeListener was not called after unmounting');

			rewire.__ResetDependency__('erd');
		});
	});

	describe('props', () => {
		it('children should callback with width and height', () => {
			const erd = {
				listenTo: (_element, handleResize) => {
					handleResize({
						offsetWidth: 50,
						offsetHeight: 100,
					});
				},
			};
			rewire.__Rewire__('erd', erd);

			const children = sinon.spy();
			mount(
				<Resizer>
					{children}
				</Resizer>
			);

			assert(children.called, 'children function was not called');
			assert.deepEqual(children.args[1], [50, 100], 'children function was not called with the right args');

			rewire.__ResetDependency__('erd');
		});
	});

});
