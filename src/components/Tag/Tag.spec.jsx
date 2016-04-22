import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import SyntheticEvent from 'react/lib/SyntheticEvent';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import describeWithDOM from '../../util/describe-with-dom';
import { common } from '../../util/generic-tests';

import Tag from './Tag';

describe('Tag', () => {
	common(Tag);

	describe('props', () => {
		describe('isCloseable', () => {
			it('includes the "X" button when true.', () => {
				const wrapper = shallow(<Tag isCloseable={true} />);

				assert.equal(wrapper.find('.lucid-Tag-close').nodes.length, 1);
			});

			it('does not include the "X" button when false.', () => {
				const wrapper = shallow(<Tag isCloseable={false} />);

				assert.equal(wrapper.find('.lucid-Tag-close').nodes.length, 0);
			});

			it('defaults to `false`.', () => {
				const wrapper = mount(<Tag />);

				assert.equal(wrapper.prop('isCloseable'), false);
			});
		});

		describe('onClose', () => {
			it('defaults to the Lodash `noop` method.', () => {
				const wrapper = mount(<Tag />);

				assert.equal(wrapper.prop('onClose'), _.noop);
			});
		});

		describe('pass throughs', () => {
			it('passes through all props not defined in `propTypes` to the root element.', () => {
				const wrapper = shallow(
					<Tag className='wut' isDisabled={true} isSelected={true} style={{ fontWeight: 'bold' }} onSelect={_.noop}
							foo={1} bar={2} baz={3} qux={4} quux={5} />
				);
				const rootProps = _.keys(wrapper.props());

				// It should pass `foo`, `bar`, `baz`, `qux`, and `quux` through
				// to the root element.
				_.forEach(['foo', 'bar', 'baz', 'qux', 'quux'], (prop) => {
					assert(_.includes(rootProps, prop));
				});
			});
		});
	});
});

describeWithDOM('Tag', () => {
	function verifyArguments(event) {
		const onClose = sinon.spy();
		const props = {
			isCloseable: true,
			onClose
		};

		mount(<Tag {...props} />)
				.find('.lucid-Tag-close')
				.simulate(event);
		assert(onClose.args[0][0].event instanceof SyntheticEvent);
		assert(_.isEqual(props, onClose.args[0][0].props));
	}

	function verifyOnSelect(event) {
		const onClose = sinon.spy();

		mount(<Tag isCloseable={true} onClose={onClose} />)
				.find('.lucid-Tag-close')
				.simulate(event);
		assert(onClose.calledOnce);
	}

	describe('user clicks on the "X" button', () => {
		it('calls the function passed in as the `onSelect` prop...', () => {
			verifyOnSelect('click');
		});

		it('...and passes along a React synthetic event and the component props as part of the first argument.', () => {
			verifyArguments('click');
		});
	});
});
