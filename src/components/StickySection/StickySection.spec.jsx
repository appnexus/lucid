import React from 'react';
import { mount, shallow } from 'enzyme';
import assert from 'assert';
import _ from 'lodash';
import { common } from '../../util/generic-tests';
import { dispatchDOMEvent } from '../../util/dom-helpers';
import StickySection from './StickySection';

describe('StickySection', () => {
	common(StickySection);

	describe('render', () => {
		it('should render a div with class `lucid-StickySection`', () => {
			const wrapper = shallow(<StickySection />);

			assert.equal(
				wrapper.find('div.lucid-StickySection').length,
				1,
				'StickySection must render the base div at root'
			);
		});
	});

	describe('props', () => {
		describe('lowerBound', () => {
			let wrapper;
			let mountTestdiv;

			beforeEach(() => {
				document.body.style.height = '10000px';
				mountTestdiv = document.createElement('div');
				document.body.appendChild(mountTestdiv);
			});

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
					wrapper = null;
				}
				document.body.style.height = '';
				mountTestdiv.parentNode.removeChild(mountTestdiv);
			});

			it('render the sticky section normally (not fixed) when scrolled past the lowerBound value', () => {
				// set the lowerBound to 500
				wrapper = mount(<StickySection lowerBound={500} />, {
					attachTo: mountTestdiv,
				});

				// scroll to position 499
				window.pageYOffset = 499;
				dispatchDOMEvent(window, 'scroll');

				// check that the fixed position sticky section is rendered
				assert.equal(
					_.get(
						wrapper.find('.lucid-StickySection-sticky-frame').prop('style'),
						'position'
					),
					'fixed',
					'sticky frame must be position fixed'
				);
				assert.equal(
					_.get(
						wrapper.find('.lucid-StickySection-sticky-section').prop('style'),
						'position'
					),
					'absolute',
					'sticky section must be position absolute'
				);

				// scroll to position 501, past the lowerBound value
				window.pageYOffset = 501;
				dispatchDOMEvent(window, 'scroll');

				// check that the sticky section is no longer fixed position
				assert.notEqual(
					_.get(
						wrapper.find('.lucid-StickySection-sticky-frame').prop('style'),
						'position'
					),
					'fixed',
					'sticky frame must not be position fixed'
				);
				assert.notEqual(
					_.get(
						wrapper.find('.lucid-StickySection-sticky-section').prop('style'),
						'position'
					),
					'absolute',
					'sticky section must not be position absolute'
				);
			});
		});
		describe('viewportWidth', () => {
			it('should set the width of the sticky frame to this value when the section `isAboveFold`', () => {
				const wrapper = shallow(
					<StickySection viewportWidth={321} />
				).setState({
					isAboveFold: true,
				});

				assert.equal(
					_.get(
						wrapper.find('.lucid-StickySection-sticky-frame').prop('style'),
						'width'
					),
					321,
					'sticky frame must have width of the prop value'
				);
			});
			it('should not set the width of the sticky frame when the section `isAboveFold` is false', () => {
				const wrapper = shallow(
					<StickySection viewportWidth={321} />
				).setState({
					isAboveFold: false,
				});

				assert.equal(
					_.get(
						wrapper.find('.lucid-StickySection-sticky-frame').prop('style'),
						'width'
					),
					undefined,
					'sticky frame width must not be set'
				);
			});

			it('should set the width of the sticky frame to the container width when value is not given and the section `isAboveFold`', () => {
				const wrapper = shallow(<StickySection />).setState({
					isAboveFold: true,
					containerRect: {
						width: 432,
					},
				});

				assert.equal(
					_.get(
						wrapper.find('.lucid-StickySection-sticky-frame').prop('style'),
						'width'
					),
					432,
					'sticky frame width must match the container width'
				);
			});
		});
	});
});
