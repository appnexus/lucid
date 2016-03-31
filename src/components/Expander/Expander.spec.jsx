import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SyntheticEvent from 'react/lib/SyntheticEvent';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import describeWithDOM from '../../util/describe-with-dom';
import { common } from '../../util/generic-tests';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';
import Expander from './Expander';

describe('Expander', () => {
	common(Expander);

	describe('props', () => {
		describe('isExpanded', () => {
			it('sets the value of the `direction` prop on its `ChevronIcon` instance to "up" when `true`.', () => {
				assert.equal(shallow(<Expander isExpanded={true} />).find(ChevronIcon).prop('direction'), 'up');
			});

			it('sets the value of the `direction` prop on its `ChevronIcon` instance to "down" when `false`.', () => {
				assert.equal(shallow(<Expander isExpanded={false} />).find(ChevronIcon).prop('direction'), 'down');
			});

			it('adds the "lucid-Expander-is-expanded" class to the root element when `true`.', () => {
				assert.equal(shallow(<Expander isExpanded={true} />).find('.lucid-Expander-is-expanded').length, 1);
			});

			it('adds the "lucid-Expander-content-is-expanded" class to its content container element when `true`.', () => {
				assert.equal(shallow(<Expander isExpanded={true} />).find('.lucid-Expander-content-is-expanded').length, 1);
			});

			it('defaults to `false`.', () => {
				assert.equal(mount(<Expander />).prop('isExpanded'), false);
			});
		});

		describe('onExpand', () => {
			it('defaults to the Lodash `noop` method.', () => {
				assert.equal(mount(<Expander />).prop('onExpand'), _.noop);
			});
		});

		describe('Label (as a prop)', () => {
			it('renders the value in the header in a `SPAN` element neighboring its `ChevronIcon` instance.', () => {
				assert.equal(
					shallow(<Expander Label='foo' />)
							.find(ReactCSSTransitionGroup)
							.find('span')
							.prop('children'),
					'foo'
				);
			});
		});

		describe('Label (as a child)', () => {
			it('renders the value in the header in a `SPAN` element neighboring its `ChevronIcon` instance.', () => {
				const wrapper = shallow(
					<Expander>
						<Expander.Label>foo</Expander.Label>
					</Expander>
				);

				assert.equal(
					wrapper
							.find(ReactCSSTransitionGroup)
							.find('span')
							.prop('children'),
					'foo'
				);
			});
		});

		describe('pass throughs', () => {
			it('passes through all props not defined in `propTypes` to the root element.', () => {
				const wrapper = shallow(
					<Expander
							className='wut'
							isExpanded={true}
							onExpand={_.noop}
							style={{ marginRight: 10 }}
							foo={1}
							bar={2}
							baz={3}
							qux={4}
							quux={5}
					/>
				);
				const rootProps = wrapper.find('.lucid-Expander').props();

				// It should pass `foo`, `bar`, `baz`, `qux`, and `quux` through
				// to the `Switch` instance.
				_.forEach(['foo', 'bar', 'baz', 'qux', 'quux'], (prop) => {
					assert(_.has(rootProps, prop));
				});
			});
		});
	});
});

describeWithDOM('Expander', () => {
	describe('user clicks on the header', () => {
		it('calls the function passed in as the `onExpand` prop...', () => {
			_.forEach(['-header', '-icon', '-text'], (classSubstring) => {
				const onExpand = sinon.spy();

				mount(<Expander onExpand={onExpand} />).find(`.lucid-Expander${classSubstring}`).simulate('click');
				assert(onExpand.calledOnce);
			});
		});

		it('...and when `isExpanded` equals `false` passes along `true` as the first argument and a React synthetic event as the second argument.', () => {
			_.forEach(['-header', '-icon', '-text'], (classSubstring) => {
				const onExpand = sinon.spy();

				mount(<Expander isExpanded={false} onExpand={onExpand} />).find(`.lucid-Expander${classSubstring}`).simulate('click');
				assert.equal(onExpand.args[0][0], true);
				assert(_.last(onExpand.args[0]).event instanceof SyntheticEvent);
			});
		});

		it('...and when `isExpanded` equals `true` passes along `false` as the first argument and a React synthetic event as the second argument.', () => {
			_.forEach(['-header', '-icon', '-text'], (classSubstring) => {
				const onExpand = sinon.spy();

				mount(<Expander isExpanded={true} onExpand={onExpand} />).find(`.lucid-Expander${classSubstring}`).simulate('click');
				assert.equal(onExpand.args[0][0], false);
				assert(_.last(onExpand.args[0]).event instanceof SyntheticEvent);
			});
		});
	});
});
