import _, { forEach, has } from 'lodash';
import React from 'react';
import { shallow, mount } from 'enzyme';
import assert from 'assert';

import { common } from '../../util/generic-tests';
import SplitVertical from './SplitVertical';
import DragCaptureZone from '../DragCaptureZone/DragCaptureZone';
import { Motion } from 'react-motion';
import { MOSTLY_STABLE_DELAY } from '../../util/constants';

describe('SplitVertical', () => {
	common(SplitVertical);

	describe('render', () => {
		it('should render an inner element with the left, right, and divider elements as children', () => {
			const wrapper = shallow(<SplitVertical />);

			const motionWrapper = wrapper.find(Motion).shallow();

			assert.equal(wrapper.find('.lucid-SplitVertical').length, 1);
			assert.equal(motionWrapper.find('.lucid-SplitVertical-inner').length, 1);
			assert.equal(
				motionWrapper.find(
					'.lucid-SplitVertical-inner > .lucid-SplitVertical-LeftPane'
				).length,
				1
			);
			assert.equal(
				motionWrapper.find(
					'.lucid-SplitVertical-inner > .lucid-SplitVertical-Divider'
				).length,
				1
			);
			assert.equal(
				motionWrapper.find(
					'.lucid-SplitVertical-inner > .lucid-SplitVertical-RightPane'
				).length,
				1
			);
		});

		it('should render expanded & collapsed', () => {
			const wrapper = mount(<SplitVertical isExpanded={true} />);
			expect(wrapper).toMatchSnapshot();
			expect(
				wrapper.setProps({ isExpanded: false }).render()
			).toMatchSnapshot();
		});
	});

	describe('pass throughs', () => {
		describe('root pass throughs', () => {
			let wrapper: any;

			beforeEach(() => {
				const props = {
					...SplitVertical.defaultProps,
					children: [
						<SplitVertical.RightPane
							className='test right pane'
							style={{ marginLeft: 10 }}
							callbackId={2}
							data-testid={11}
							width={234}
							isPrimary={true}
						/>,
						<SplitVertical.LeftPane
							className='test left pane'
							style={{ marginLeft: 20 }}
							callbackId={3}
							data-testid={12}
							width={567}
							isPrimary={false}
						/>,
					],
					collapseShift: 1,
					isResizeable: false,
					className: 'wut',
					style: { marginRight: 10 },
					initialState: { test: true },
					callbackId: 1,
					'data-testid': 10,
				};
				wrapper = mount(<SplitVertical {...props} />);
			});

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
			});

			it('passes through props not defined in `propTypes` to the root element.', () => {
				const rootProps = wrapper.find('.lucid-SplitVertical').props();

				expect(wrapper.first().prop(['className'])).toContain('wut');
				expect(wrapper.first().prop(['style'])).toMatchObject({
					marginRight: 10,
				});
				expect(wrapper.first().prop(['data-testid'])).toBe(10);

				// 'className' and 'style' are plucked from the pass through object
				// but still appears becuase each one is also directly added to the root element as a prop
				forEach(['className', 'data-testid', 'style', 'children'], (prop) => {
					expect(has(rootProps, prop)).toBe(true);
				});
			});
			it('omits the props defined in `propTypes` (plus, in addition, `initialState`, and `callbackId`) from the root element', () => {
				const rootProps = wrapper.find('.lucid-SplitVertical').props();

				forEach(
					[
						'isExpanded',
						'isAnimated',
						'onResizing',
						'isResizeable',
						'onResize',
						'collapseShift',
						'RightPane',
						'LeftPane',
						'Divider',
						'initialState',
						'callbackId',
					],
					(prop) => {
						expect(has(rootProps, prop)).toBe(false);
					}
				);
			});
			it('passes through and omits the correct props for the `SplitVertical.LeftPane`.', () => {
				const leftPaneProps = wrapper
					.find('.lucid-SplitVertical-LeftPane')
					.props();

				// included props
				forEach(['className', 'style', 'data-testid', 'children'], (prop) => {
					expect(has(leftPaneProps, prop)).toBe(true);
				});

				// excluded props
				forEach(
					['isPrimary', 'width', 'callbackId', 'initialState'],
					(prop) => {
						expect(has(leftPaneProps, prop)).toBe(false);
					}
				);
			});
			it('passes through and omits the correct props for the `SplitVertical.RightPane`.', () => {
				const rightPaneProps = wrapper
					.find('.lucid-SplitVertical-RightPane')
					.props();

				// included props
				forEach(['className', 'style', 'data-testid', 'children'], (prop) => {
					expect(has(rightPaneProps, prop)).toBe(true);
				});

				// excluded props
				forEach(
					['isPrimary', 'width', 'initialState', 'callbackId'],
					(prop) => {
						expect(has(rightPaneProps, prop)).toBe(false);
					}
				);
			});
		});

		describe('DragCaptureZone pass throughs: dividerProps', () => {
			let wrapper: any;

			beforeEach(() => {
				const props = {
					...SplitVertical.defaultProps,
					children: (
						<SplitVertical.Divider
							className='test Divider'
							style={{ marginLeft: 10 }}
							callbackId={2}
							data-testid={11}
						/>
					),
					collapseShift: 1,
					isResizeable: true, // renders the resizable Divider
					className: 'wut',
					style: { marginRight: 10 },
					initialState: { test: true },
					callbackId: 1,
					'data-testid': 10,
				};
				wrapper = mount(<SplitVertical {...props} />);
			});

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
			});

			it('passes through and omits the correct props for the resizable `SplitVerticalDivider` child element.', () => {
				const dividerProps = wrapper
					.find('DragCaptureZone.lucid-SplitVertical-Divider')
					.props();

				expect(
					wrapper
						.find('DragCaptureZone.lucid-SplitVertical-Divider')
						.prop(['className'])
				).toContain('test Divider');
				expect(
					wrapper
						.find('DragCaptureZone.lucid-SplitVertical-Divider')
						.prop(['style'])
				).toMatchObject({
					marginLeft: 10,
				});
				expect(
					wrapper
						.find('DragCaptureZone.lucid-SplitVertical-Divider')
						.prop(['data-testid'])
				).toBe(11);
				expect(
					wrapper
						.find('DragCaptureZone.lucid-SplitVertical-Divider')
						.prop(['callbackId'])
				).toBe(2);

				// callbackId is passed through becuase the divider is a custom React element
				forEach(
					['className', 'data-testid', 'style', 'children', 'callbackId'],
					(prop) => {
						expect(has(dividerProps, prop)).toBe(true);
					}
				);

				// note initial state is explicitly omitted in the code,
				// and it also is not permitted as a prop on `SplitVertical.Divider`
				forEach(['initialState'], (prop) => {
					expect(has(dividerProps, prop)).toBe(false);
				});
			});
		});

		describe('Not resizeable dividerProps', () => {
			let wrapper: any;

			beforeEach(() => {
				const props = {
					...SplitVertical.defaultProps,
					children: (
						<SplitVertical.Divider
							className='test Divider'
							style={{ marginLeft: 10 }}
							callbackId={2}
							data-testid={11}
						/>
					),
					collapseShift: 1,
					isResizeable: false, // renders the not resizeable Divider
					className: 'wut',
					style: { marginRight: 10 },
					initialState: { test: true },
					callbackId: 1,
					'data-testid': 10,
				};
				wrapper = mount(<SplitVertical {...props} />);
			});

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
			});

			it('passes through and omits the correct props for the resizable `SplitVerticalDivider` child element.', () => {
				const dividerProps = wrapper
					.find('div.lucid-SplitVertical-Divider')
					.props();

				expect(
					wrapper.find('div.lucid-SplitVertical-Divider').prop(['className'])
				).toContain('test Divider');
				expect(
					wrapper.find('div.lucid-SplitVertical-Divider').prop(['style'])
				).toMatchObject({
					marginLeft: 10,
				});
				expect(
					wrapper.find('div.lucid-SplitVertical-Divider').prop(['data-testid'])
				).toBe(11);

				// included props
				forEach(['className', 'data-testid', 'style', 'children'], (prop) => {
					expect(has(dividerProps, prop)).toBe(true);
				});

				// excluded props
				forEach(['initialState', 'callbackId'], (prop) => {
					expect(has(dividerProps, prop)).toBe(false);
				});
			});
		});
	});

	describe('props', () => {
		describe('isExpanded', () => {
			let mountWrapper: any;

			afterEach(() => {
				if (mountWrapper) {
					mountWrapper.unmount();
				}
			});

			it('should default to true', () => {
				const wrapper = shallow(<SplitVertical />);

				assert(wrapper.hasClass('lucid-SplitVertical-is-expanded'));
			});

			it('should apply the &-is-expanded css class when true', () => {
				const wrapper = shallow(<SplitVertical isExpanded={true} />);

				assert(wrapper.hasClass('lucid-SplitVertical-is-expanded'));
			});

			it('should not apply the &-is-expanded css class when false [mostly stable]', (done) => {
				mountWrapper = mount(<SplitVertical isExpanded={false} />);

				assert(!mountWrapper.hasClass('lucid-SplitHorizontal-is-expanded'));
				_.delay(done, MOSTLY_STABLE_DELAY);
			});
		});

		describe('isAnimated', () => {
			let wrapper: any;

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
			});

			it('should default to false [mostly stable]', (done) => {
				wrapper = mount(<SplitVertical />);

				_.delay(() => {
					assert.equal(
						wrapper.find('.lucid-SplitVertical.lucid-SplitVertical-is-animated')
							.length,
						0
					);
					done();
				}, MOSTLY_STABLE_DELAY);
			});

			it('should apply the &-is-animated class when true, after initial render [mostly stable]', (done) => {
				wrapper = mount(<SplitVertical isAnimated={true} />);

				_.delay(() => {
					wrapper.update();
					assert.equal(
						wrapper.find('.lucid-SplitVertical.lucid-SplitVertical-is-animated')
							.length,
						1
					);
					done();
				}, MOSTLY_STABLE_DELAY);
			});

			it('should not apply the &-is-animated class when false [mostly stable]', (done) => {
				wrapper = mount(<SplitVertical isAnimated={false} />);

				_.delay(() => {
					assert.equal(
						wrapper.find('.lucid-SplitVertical.lucid-SplitVertical-is-animated')
							.length,
						0
					);
					done();
				}, MOSTLY_STABLE_DELAY);
			});
		});

		describe('collapseShift', () => {
			let wrapper: any;
			let mountTestDiv: any;

			beforeEach(() => {
				mountTestDiv = document.createElement('div');
				document.body.appendChild(mountTestDiv);
			});

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}

				if (mountTestDiv) {
					mountTestDiv.parentNode.removeChild(mountTestDiv);
				}
			});

			it('should translated by width - 64px when the right pane is primary [mostly stable]', (done) => {
				wrapper = mount(
					<SplitVertical isExpanded={false} collapseShift={64}>
						<SplitVertical.LeftPane />
						<SplitVertical.RightPane isPrimary />
					</SplitVertical>,
					{ attachTo: mountTestDiv }
				);

				_.delay(() => {
					const secondaryPaneDiv = mountTestDiv.querySelector(
						'.lucid-SplitVertical-is-secondary'
					);
					const width = secondaryPaneDiv.getBoundingClientRect().width;
					wrapper.update();
					const slideAmount = wrapper.find(Motion).prop('style').slideAmount;
					expect(slideAmount).toEqual(width - 64);
					done();
				}, MOSTLY_STABLE_DELAY);
			});

			it('should translated by width - 64px when the left pane is primary [mostly stable]', (done) => {
				wrapper = mount(
					<SplitVertical isExpanded={false} collapseShift={64}>
						<SplitVertical.LeftPane isPrimary />
						<SplitVertical.RightPane />
					</SplitVertical>,
					{ attachTo: mountTestDiv }
				);

				_.delay(() => {
					const secondaryPaneDiv = mountTestDiv.querySelector(
						'.lucid-SplitVertical-is-secondary'
					);
					const width = secondaryPaneDiv.getBoundingClientRect().width;
					wrapper.update();
					const slideAmount = wrapper.find(Motion).prop('style').slideAmount;
					assert.equal(
						width - 64,
						slideAmount,
						'must be translated by width - 64px'
					);
					done();
				}, MOSTLY_STABLE_DELAY);
			});
		});

		describe('onResizing', () => {
			let wrapper: any;
			let mountTestDiv: any;

			beforeEach(() => {
				mountTestDiv = document.createElement('div');
				document.body.appendChild(mountTestDiv);
			});

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}

				if (mountTestDiv) {
					mountTestDiv.parentNode.removeChild(mountTestDiv);
				}
			});

			it('should be called when the DragCaptureZone calls the onDrag event handler', () => {
				const width = 100;
				const dX = 122;
				const onResizing = jest.fn();

				wrapper = mount(
					<SplitVertical isExpanded={true} onResizing={onResizing}>
						<SplitVertical.LeftPane width={width}>foo</SplitVertical.LeftPane>
						<SplitVertical.RightPane>bar</SplitVertical.RightPane>
					</SplitVertical>,
					{ attachTo: mountTestDiv }
				);

				const { onDragStart, onDrag, onDragEnd } = wrapper
					.find(DragCaptureZone)
					.props();

				const lastArg = { event: {} };

				onDragStart(lastArg);
				onDrag({ dX: dX }, lastArg);
				onDragEnd({ dX: dX + 1 }, lastArg);

				expect(onResizing).toHaveBeenCalled();
				const [firstArg, { props, event }] = _.last(onResizing.mock.calls);
				expect(firstArg).toEqual(dX);
				expect(props).toEqual(wrapper.props());
				expect(event).toEqual(lastArg.event);
			});
		});

		describe('onResize', () => {
			let wrapper: any;
			let mountTestDiv: any;

			beforeEach(() => {
				mountTestDiv = document.createElement('div');
				document.body.appendChild(mountTestDiv);
			});

			afterEach(() => {
				if (wrapper && wrapper.exists()) {
					wrapper.unmount();
				}

				if (mountTestDiv) {
					mountTestDiv.parentNode.removeChild(mountTestDiv);
				}
			});

			it('should be called when the DragCaptureZone calls the onDragEnd event handler', () => {
				const width = 100;
				const dX = 122;
				const onResize = jest.fn();

				wrapper = mount(
					<SplitVertical isExpanded={true} onResize={onResize}>
						<SplitVertical.LeftPane width={width}>foo</SplitVertical.LeftPane>
						<SplitVertical.RightPane>bar</SplitVertical.RightPane>
					</SplitVertical>,
					{ attachTo: mountTestDiv }
				);

				const { onDragStart, onDrag, onDragEnd } = wrapper
					.find(DragCaptureZone)
					.props();

				const lastArg = { event: {} };

				onDragStart(lastArg);
				onDrag({ dX: dX }, lastArg);
				onDragEnd({ dX: dX + 1 }, lastArg);

				expect(onResize).toHaveBeenCalled();

				const [firstArg, { props, event }] = _.last(onResize.mock.calls);

				expect(firstArg).toEqual(dX + 1);
				expect(props).toEqual(wrapper.props());
				expect(event).toEqual(lastArg.event);
			});

			describe('isResizeable', () => {
				it('shoult set -is-resizeable class on divider', () => {
					const wrapper = shallow(<SplitVertical />);

					const dividerDivWrapper = wrapper
						.find(Motion)
						.shallow()
						.find(DragCaptureZone)
						.shallow({ disableLifecycleMethods: true })
						.first();
					assert(
						dividerDivWrapper.hasClass(
							'lucid-SplitVertical-Divider-is-resizeable'
						)
					);
				});

				it('should not set -is-resizeable class on divider', () => {
					const wrapper = shallow(<SplitVertical isResizeable={false} />);

					const motionWrapper = wrapper.find(Motion).shallow();
					assert(
						!motionWrapper
							.find('.lucid-SplitVertical-Divider')
							.hasClass('lucid-SplitVertical-Divider-is-resizeable')
					);
				});
			});
		});
	});

	describe('child components', () => {
		describe('LeftPane', () => {
			it('should render children passed in', () => {
				const wrapper = shallow(
					<SplitVertical>
						<SplitVertical.LeftPane>Search Filters</SplitVertical.LeftPane>
					</SplitVertical>
				);

				const motionWrapper = wrapper.find(Motion).shallow();
				const LeftPane = motionWrapper.find(
					'.lucid-SplitVertical-inner > .lucid-SplitVertical-LeftPane'
				);

				assert.equal(
					'Search Filters',
					LeftPane.text(),
					'must render children passed in'
				);
			});

			it('should set the right pane as secondary when the left pane is set to primary', () => {
				const wrapper = shallow(
					<SplitVertical>
						<SplitVertical.LeftPane isPrimary>
							Search Filters
						</SplitVertical.LeftPane>
					</SplitVertical>
				);

				const motionWrapper = wrapper.find(Motion).shallow();
				const RightPane = motionWrapper.find(
					'.lucid-SplitVertical-inner > .lucid-SplitVertical-RightPane'
				);

				assert(
					RightPane.hasClass('lucid-SplitVertical-is-secondary'),
					'must have the secondary className'
				);
			});

			it('should pass thru the with to flexBasis', () => {
				const wrapper = shallow(
					<SplitVertical>
						<SplitVertical.LeftPane width={123}>
							Search Filters
						</SplitVertical.LeftPane>
					</SplitVertical>
				);

				const motionWrapper = wrapper.find(Motion).shallow();
				const LeftPane: any = motionWrapper.find(
					'.lucid-SplitVertical-inner > .lucid-SplitVertical-LeftPane'
				);

				assert.equal(
					123,
					LeftPane.prop('style').flexBasis,
					'must set the flexBasis to match the given width'
				);
			});
		});

		describe('RightPane', () => {
			it('should render children passed in', () => {
				const wrapper = shallow(
					<SplitVertical>
						<SplitVertical.RightPane>Search Filters</SplitVertical.RightPane>
					</SplitVertical>
				);

				const motionWrapper = wrapper.find(Motion).shallow();
				const RightPane = motionWrapper.find(
					'.lucid-SplitVertical-inner > .lucid-SplitVertical-RightPane'
				);

				assert.equal(
					'Search Filters',
					RightPane.text(),
					'must render children passed in'
				);
			});

			it('should set the left pane as secondary when the right pane is set to primary', () => {
				const wrapper = shallow(
					<SplitVertical>
						<SplitVertical.RightPane isPrimary>
							Search Filters
						</SplitVertical.RightPane>
					</SplitVertical>
				);

				const motionWrapper = wrapper.find(Motion).shallow();
				const LeftPane = motionWrapper.find(
					'.lucid-SplitVertical-inner > .lucid-SplitVertical-LeftPane'
				);

				assert(
					LeftPane.hasClass('lucid-SplitVertical-is-secondary'),
					'must have the secondary className'
				);
			});

			it('should pass thru the with to flexBasis', () => {
				const wrapper = shallow(
					<SplitVertical>
						<SplitVertical.RightPane width={123}>
							Search Filters
						</SplitVertical.RightPane>
					</SplitVertical>
				);

				const motionWrapper = wrapper.find(Motion).shallow();
				const RightPane: any = motionWrapper.find(
					'.lucid-SplitVertical-inner > .lucid-SplitVertical-RightPane'
				);

				assert.equal(
					123,
					RightPane.prop('style').flexBasis,
					'must set the flexBasis to match the given width'
				);
			});
		});

		describe('Divider', () => {
			it('should render children passed in', () => {
				const wrapper = shallow(
					<SplitVertical>
						<SplitVertical.Divider>Resize</SplitVertical.Divider>
					</SplitVertical>
				);

				const motionWrapper = wrapper.find(Motion).shallow();
				const dividerWrapper = motionWrapper.find(
					'.lucid-SplitVertical-inner > .lucid-SplitVertical-Divider'
				);

				assert.equal(
					'Resize',
					dividerWrapper.children().text(),
					'must render children passed in'
				);
			});
		});
	});
});
