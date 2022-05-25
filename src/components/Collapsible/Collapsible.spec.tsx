import React from 'react';
//import { shallow, mount } from 'enzyme';
import { shallow } from 'enzyme';
import assert from 'assert';
import _ from 'lodash';
import { common } from '../../util/generic-tests';
import Collapsible from './Collapsible';
import { Motion } from 'react-motion';
//import { MOSTLY_STABLE_DELAY } from '../../util/constants';

describe('Collapsible', () => {
	common(Collapsible, {
		selectRoot: (wrapper: any) => wrapper.find(Motion).shallow(),
	} as any);

	describe('render', () => {
		it('should render a root element wrapping a content element', () => {
			const wrapper = shallow(<Collapsible />);

			const motionWrapper = wrapper.find(Motion).shallow();

			assert.strictEqual(
				motionWrapper.find('.lucid-Collapsible').length,
				1,
				'must render root element'
			);
			assert.strictEqual(
				motionWrapper.find('.lucid-Collapsible > .lucid-Collapsible-content')
					.length,
				1,
				'must render a content element'
			);
			assert.strictEqual(
				motionWrapper
					.find('.lucid-Collapsible > .lucid-Collapsible-content')
					.children().length,
				0,
				'must not render children'
			);
		});
	});

	describe('props', () => {
		/*
		 * In order to test `isExpanded` it is simplest to render one instance of
		 * the component and alternate values for `isExpanded`. This is because the
		 * max height can be captured in the  initial render and be used in later
		 * assertions between transitions.
		 * */
		describe('isExpanded', () => {
			/*
			let wrapper: any;
			let testDomElement;

			// only needed for the skipped tests:
			beforeEach(() => {
				testDomElement = document.createElement('div');
				document.body.appendChild(testDomElement);
			});

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
				wrapper = null;
				testDomElement.parentNode.removeChild(testDomElement);
			});
			*/

			it('should default to true', () => {
				assert.strictEqual(true, _.get(Collapsible.defaultProps, 'isExpanded'));
			});

			/*
			it.skip('should transition the container height when the prop alternates between boolean values [mostly stable]', (done) => {
				wrapper = mount(
					<Collapsible isExpanded={true} isAnimated={false}>
						-- Content to test height changes. --
					</Collapsible>
				, { attachTo: testDomElement });

				let startingHeight;

				_.delay(() => {
					startingHeight = testDomElement.getBoundingClientRect().height;
					assert(startingHeight > 0);

					wrapper.setProps({
						...wrapper.props(),
						isExpanded: false,
					});

					_.delay(() => {
						const currentHeight = testDomElement.getBoundingClientRect().height;
						assert.strictEqual(0, currentHeight);

						wrapper.setProps({
							...wrapper.props(),
							isExpanded: true,
						});

						_.delay(() => {
							const currentHeight = testDomElement.getBoundingClientRect().height;
							assert.strictEqual(currentHeight, startingHeight);
							done();
						}, MOSTLY_STABLE_DELAY);

					}, MOSTLY_STABLE_DELAY);

				}, MOSTLY_STABLE_DELAY);

			});
			*/
		});

		/*
		 * `isAnimated` is implmented in a special way: There's an property on the
		 * component instance (`this`) with the same name which controls which
		 * value is send to Motion. It's important to attach this to the component
		 * rather than only use the prop so that the initial render is never
		 * animated. After some time is given for the initial render the value of
		 * the instance property will match the value given in the props for
		 * `isAnimated` so that subsequent re-renders can be animated if desired.
		 * */
		describe('isAnimated', () => {
			/*
			let wrapper: any;
			let testDomElement;

			/* only needed for the skipped tests:
			beforeEach(() => {
				testDomElement = document.createElement('div');
				document.body.appendChild(testDomElement);
			});

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
				wrapper = null;
				testDomElement.parentNode.removeChild(testDomElement);
			});
			*/

			it('should default to true', () => {
				assert.strictEqual(true, _.get(Collapsible.defaultProps, 'isAnimated'));
			});

			/*
			it.skip('should set value of instance property `isAnimated` after initial render [mostly stable]', (done) => {
				wrapper = mount(
					<Collapsible isExpanded={true} isAnimated={true}>
						-- Content to test height changes. --
					</Collapsible>
				, { attachTo: testDomElement });

				assert.strictEqual(false, wrapper.instance().isAnimated, 'must always be false initially');
				_.delay(() => {
					assert.strictEqual(true, wrapper.instance().isAnimated, 'must be true to match prop value');
					done();
				}, MOSTLY_STABLE_DELAY);
			});

			it.skip('should set value of instance property `isAnimated` after initial render [mostly stable]', (done) => {
				wrapper = mount(
					<Collapsible isExpanded={true} isAnimated={false}>
						-- Content to test height changes. --
					</Collapsible>
				, { attachTo: testDomElement });

				assert.strictEqual(false, wrapper.instance().isAnimated, 'must always be false initially');
				_.delay(() => {
					assert.strictEqual(false, wrapper.instance().isAnimated, 'must be false to match prop value');
					done();
				}, MOSTLY_STABLE_DELAY);
			});
			*/
		});

		describe('isMountControlled', () => {
			/*
			let wrapper: any;
			let testDomElement;

			// only needed for the skipped tests:
			beforeEach(() => {
				testDomElement = document.createElement('div');
				document.body.appendChild(testDomElement);
			});

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
				wrapper = null;
				testDomElement.parentNode.removeChild(testDomElement);
			});
			*/

			it('should default to true', () => {
				assert.strictEqual(
					true,
					_.get(Collapsible.defaultProps, 'isMountControlled')
				);
			});

			/*
			it.skip('should not render children after initial render when true and collapsed [mostly stable]', (done) => {
				wrapper = mount(
					<Collapsible isMountControlled={true} isExpanded={false} isAnimated={false}>
						<div className='test-mounted-content'>I will be unmounted on collapse</div>
					</Collapsible>
				, { attachTo: testDomElement });

				_.delay(() => {
					assert.strictEqual(0, wrapper.find('.test-mounted-content').length, 'must not render content when collapsed');
					done();
				}, MOSTLY_STABLE_DELAY);
			});

			it.skip('should render children after initial render when true and expanded [mostly stable]', (done) => {
				wrapper = mount(
					<Collapsible isMountControlled={true} isExpanded={true} isAnimated={false}>
						<div className='test-mounted-content'>I will be unmounted on collapse</div>
					</Collapsible>
				, { attachTo: testDomElement });

				_.delay(() => {
					assert.strictEqual(1, wrapper.find('.test-mounted-content').length, 'must render content when expanded');
					done();
				}, MOSTLY_STABLE_DELAY);
			});

			it.skip('should render children after initial render when false and collapsed [mostly stable]', (done) => {
				wrapper = mount(
					<Collapsible isMountControlled={false} isExpanded={false} isAnimated={false}>
						<div className='test-mounted-content'>I will be unmounted on collapse</div>
					</Collapsible>
				, { attachTo: testDomElement });

				_.delay(() => {
					assert.strictEqual(1, wrapper.find('.test-mounted-content').length, 'must render hidden content when collapsed');
					done();
				}, MOSTLY_STABLE_DELAY);
			});

			it.skip('should render children after initial render when false and expanded [mostly stable]', (done) => {
				wrapper = mount(
					<Collapsible isMountControlled={true} isExpanded={true} isAnimated={false}>
						<div className='test-mounted-content'>I will be unmounted on collapse</div>
					</Collapsible>
				, { attachTo: testDomElement });

				_.delay(() => {
					assert.strictEqual(1, wrapper.find('.test-mounted-content').length, 'must render content when expanded');
					done();
				}, MOSTLY_STABLE_DELAY);
			});
			*/
		});

		describe('rootType', () => {
			it('should default to `div`', () => {
				assert.strictEqual('div', _.get(Collapsible.defaultProps, 'rootType'));
			});

			it('should render a root container of the passed in type', () => {
				const wrapper = shallow(<Collapsible rootType='section' />);

				const motionWrapper = wrapper.find(Motion).shallow();

				assert.strictEqual(
					motionWrapper.find('section.lucid-Collapsible').length,
					1,
					'must render root element of the specified type'
				);
			});
		});
	});
});
