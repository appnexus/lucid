import _, { forEach, has } from 'lodash';
import React from 'react';
import { shallow, mount } from 'enzyme';
import assert from 'assert';

import { common } from '../../util/generic-tests';
import SplitHorizontal, {
	SplitHorizontalTopPane,
	SplitHorizontalBottomPane,
} from './SplitHorizontal';
import DragCaptureZone from '../DragCaptureZone/DragCaptureZone';
import { Motion } from 'react-motion';
import { MOSTLY_STABLE_DELAY } from '../../util/constants';

describe('SplitHorizontal', () => {
	common(SplitHorizontal);

	describe('render', () => {
		it('should render an inner element with the top, bottom, and divider elements as children', () => {
			const wrapper = shallow(<SplitHorizontal />);

			const motionWrapper = wrapper.find(Motion).shallow();

			assert.equal(wrapper.find('.lucid-SplitHorizontal').length, 1);
			assert.equal(
				motionWrapper.find('.lucid-SplitHorizontal-inner').length,
				1
			);
			assert.equal(
				motionWrapper.find(
					'.lucid-SplitHorizontal-inner > .lucid-SplitHorizontal-TopPane'
				).length,
				1
			);
			assert.equal(
				motionWrapper.find(
					'.lucid-SplitHorizontal-inner > .lucid-SplitHorizontal-Divider'
				).length,
				1
			);
			assert.equal(
				motionWrapper.find(
					'.lucid-SplitHorizontal-inner > .lucid-SplitHorizontal-BottomPane'
				).length,
				1
			);
		});
		it('should render expanded & collapsed', () => {
			const wrapper = mount(<SplitHorizontal isExpanded={true} />);
			expect(wrapper).toMatchSnapshot();
			expect(
				wrapper.setProps({ isExpanded: false }).render()
			).toMatchSnapshot();
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
				const wrapper = shallow(<SplitHorizontal />);

				assert(wrapper.hasClass('lucid-SplitHorizontal-is-expanded'));
			});

			it('should apply the &-is-expanded css class when true', () => {
				const wrapper = shallow(<SplitHorizontal isExpanded={true} />);

				assert(wrapper.hasClass('lucid-SplitHorizontal-is-expanded'));
			});

			it('should not apply the &-is-expanded css class when false [mostly stable]', (done) => {
				mountWrapper = mount(<SplitHorizontal isExpanded={false} />);

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
				wrapper = mount(<SplitHorizontal />);

				_.delay(() => {
					assert.equal(
						wrapper.find(
							'.lucid-SplitHorizontal.lucid-SplitHorizontal-is-animated'
						).length,
						0
					);
					done();
				}, MOSTLY_STABLE_DELAY);
			});

			it('should apply the &-is-animated class when true, after initial render [mostly stable]', (done) => {
				wrapper = mount(<SplitHorizontal isAnimated={true} />);

				_.delay(() => {
					assert(
						wrapper.render().hasClass('lucid-SplitHorizontal-is-animated')
					);
					done();
				}, MOSTLY_STABLE_DELAY);
			});

			it('should not apply the &-is-animated class when false [mostly stable]', (done) => {
				wrapper = mount(<SplitHorizontal isAnimated={false} />);

				_.delay(() => {
					assert.equal(
						wrapper.find(
							'.lucid-SplitHorizontal.lucid-SplitHorizontal-is-animated'
						).length,
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

			it('should translated by height - 64px when the bottom pane is primary [mostly stable]', (done) => {
				wrapper = mount(
					<SplitHorizontal isExpanded={false} collapseShift={64}>
						<SplitHorizontal.TopPane />
						<SplitHorizontal.BottomPane isPrimary />
					</SplitHorizontal>,
					{ attachTo: mountTestDiv }
				);

				_.delay(() => {
					const secondaryPaneDiv = mountTestDiv.querySelector(
						'.lucid-SplitHorizontal-is-secondary'
					);
					const height = secondaryPaneDiv.getBoundingClientRect().height;
					wrapper.update();
					const slideAmount = wrapper.find(Motion).prop('style').slideAmount;
					expect(slideAmount).toEqual(height - 64);
					done();
				}, MOSTLY_STABLE_DELAY);
			});

			it('should translated by height - 64px when the top pane is primary [mostly stable]', (done) => {
				wrapper = mount(
					<SplitHorizontal isExpanded={false} collapseShift={64}>
						<SplitHorizontal.TopPane isPrimary />
						<SplitHorizontal.BottomPane />
					</SplitHorizontal>,
					{ attachTo: mountTestDiv }
				);

				_.delay(() => {
					const secondaryPaneDiv = mountTestDiv.querySelector(
						'.lucid-SplitHorizontal-is-secondary'
					);
					const height = secondaryPaneDiv.getBoundingClientRect().height;
					wrapper.update();
					const slideAmount = wrapper.find(Motion).prop('style').slideAmount;
					expect(slideAmount).toEqual(height - 64);
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
				const onResizing = jest.fn();

				wrapper = mount(
					<SplitHorizontal isExpanded={true} onResizing={onResizing} />,
					{ attachTo: mountTestDiv }
				);

				const { onDragStart, onDrag, onDragEnd } = wrapper
					.find(DragCaptureZone)
					.props();

				const lastArg = { event: {} };

				onDragStart(lastArg);
				onDrag({ dY: 122 }, lastArg);
				onDragEnd({ dY: 123 }, lastArg);

				expect(onResizing).toHaveBeenCalled();

				const [firstArg, { props, event }] = _.last(onResizing.mock.calls);
				expect(firstArg).toEqual(122);
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
				if (wrapper) {
					wrapper.unmount();
				}

				if (mountTestDiv) {
					mountTestDiv.parentNode.removeChild(mountTestDiv);
				}
			});

			it('should be called when the DragCaptureZone calls the onDragEnd event handler', () => {
				const onResize = jest.fn();

				wrapper = mount(
					<SplitHorizontal isExpanded={true} onResize={onResize} />,
					{ attachTo: mountTestDiv }
				);

				const { onDragStart, onDrag, onDragEnd } = wrapper
					.find(DragCaptureZone)
					.props();

				const lastArg = { event: {} };

				onDragStart(lastArg);
				onDrag({ dY: 122 }, lastArg);
				onDragEnd({ dY: 123 }, lastArg);

				expect(onResize).toHaveBeenCalled();
				const [firstArg, { props, event }] = _.last(onResize.mock.calls);
				expect(firstArg).toEqual(123);
				expect(props).toEqual(wrapper.props());
				expect(event).toEqual(lastArg.event);
			});
		});

		describe('root pass throughs', () => {
			let wrapper: any;
			const defaultProps = SplitHorizontal.defaultProps;

			beforeEach(() => {
				const props = {
					...defaultProps,
					isExpanded: false,
					isAnimated: true,
					collapseShift: 1,
					TopPane: <p>post-ironic etsy roof party</p>,
					BottomPane: <p>heirloom street art church-key</p>,
					Divider: 'D I V I D E R',
					className: 'wut',
					style: { marginRight: 10 },
					initialState: { test: true },
					callbackId: 1,
					'data-testid': 10,
				};
				wrapper = shallow(<SplitHorizontal {...props} />);
			});

			afterEach(() => {
				wrapper.unmount();
			});

			it('passes through props not defined in `propTypes` to the root element.', () => {
				const rootProps = wrapper.find('.lucid-SplitHorizontal').props();

				expect(wrapper.first().prop(['className'])).toContain('wut');
				expect(wrapper.first().prop(['style'])).toMatchObject({
					marginRight: 10,
				});
				expect(wrapper.first().prop(['data-testid'])).toBe(10);

				// 'className' and style are plucked from the pass through object
				// but still appears becuase each one is also directly added to the root element as a prop
				forEach(['className', 'data-testid', 'style', 'children'], (prop) => {
					expect(has(rootProps, prop)).toBe(true);
				});
			});
			it('omits the props defined in `propTypes` (plus, in addition, `initialState`, and `callbackId`) from the root element', () => {
				const rootProps = wrapper.find('.lucid-SplitHorizontal').props();
				forEach(
					[
						'isExpanded',
						'isAnimated',
						'onResizing',
						'onResize',
						'collapseShift',
						'TopPane',
						'BottomPane',
						'Divider',
						'onSelect',
						'onToggle',
						'initialState',
						'callbackId',
					],
					(prop) => {
						expect(has(rootProps, prop)).toBe(false);
					}
				);
			});
		});
	});

	describe('child components', () => {
		describe('TopPane', () => {
			it('should render children passed in', () => {
				const wrapper = shallow(
					<SplitHorizontal>
						<SplitHorizontal.TopPane>Search Filters</SplitHorizontal.TopPane>
					</SplitHorizontal>
				);

				const motionWrapper = wrapper.find(Motion).shallow();
				const TopPane = motionWrapper.find(
					'.lucid-SplitHorizontal-inner > .lucid-SplitHorizontal-TopPane'
				);

				assert.equal(
					'Search Filters',
					TopPane.text(),
					'must render children passed in'
				);
			});

			it('should set the bottom pane as secondary when the top pane is set to primary', () => {
				const wrapper = shallow(
					<SplitHorizontal>
						<SplitHorizontal.TopPane isPrimary>
							Search Filters
						</SplitHorizontal.TopPane>
					</SplitHorizontal>
				);

				const motionWrapper = wrapper.find(Motion).shallow();
				const BottomPane = motionWrapper.find(
					'.lucid-SplitHorizontal-inner > .lucid-SplitHorizontal-BottomPane'
				);

				assert(
					BottomPane.hasClass('lucid-SplitHorizontal-is-secondary'),
					'must have the secondary className'
				);
			});

			it('should pass thru the with to flexBasis', () => {
				const wrapper = shallow(
					<SplitHorizontal>
						<SplitHorizontal.TopPane height={123}>
							Search Filters
						</SplitHorizontal.TopPane>
					</SplitHorizontal>
				);

				const motionWrapper = wrapper.find(Motion).shallow();
				const TopPane: any = motionWrapper.find(
					'.lucid-SplitHorizontal-inner > .lucid-SplitHorizontal-TopPane'
				);

				assert.equal(
					123,
					TopPane.prop('style').flexBasis,
					'must set the flexBasis to match the given height'
				);
			});

			describe('TopPane pass throughs', () => {
				let topPaneWrapper: any;
				const topPaneDefaultProps = SplitHorizontalTopPane.defaultProps;

				beforeEach(() => {
					const props = {
						...topPaneDefaultProps,
						height: 321,
						isPrimary: true,
						className: 'wut',
						initialState: { test: true },
						callbackId: 1,
						'data-testid': 10,
					};

					topPaneWrapper = mount(
						<SplitHorizontal>
							<SplitHorizontal.TopPane {...props}>
								Search Filters
							</SplitHorizontal.TopPane>
						</SplitHorizontal>
					);
				});

				afterEach(() => {
					topPaneWrapper.unmount();
				});

				it('should pass through props not defined in the TopPane `propTypes`', () => {
					const topPaneProps = topPaneWrapper
						.find('.lucid-SplitHorizontal-TopPane')
						.props();

					expect(
						topPaneWrapper
							.find('.lucid-SplitHorizontal-TopPane')
							.prop(['className'])
					).toContain('wut');
					expect(
						topPaneWrapper
							.find('.lucid-SplitHorizontal-TopPane')
							.prop(['data-testid'])
					).toBe(10);

					forEach(['className', 'data-testid', 'style', 'children'], (prop) => {
						expect(has(topPaneProps, prop)).toBe(true);
					});
				});
				it('omits the props defined in TopPane `propTypes`, (plus, in addition, `initialState`, and `callbackId`) from the TopPane element', () => {
					const topPaneProps = topPaneWrapper
						.find('.lucid-SplitHorizontal-TopPane')
						.props();

					forEach(
						['height', 'isPrimary', 'initialState', 'callbackId'],
						(prop) => {
							expect(has(topPaneProps, prop)).toBe(false);
						}
					);
				});
			});
		});

		describe('BottomPane', () => {
			it('should render children passed in', () => {
				const wrapper = shallow(
					<SplitHorizontal>
						<SplitHorizontal.BottomPane>
							Search Filters
						</SplitHorizontal.BottomPane>
					</SplitHorizontal>
				);

				const motionWrapper = wrapper.find(Motion).shallow();
				const BottomPane = motionWrapper.find(
					'.lucid-SplitHorizontal-inner > .lucid-SplitHorizontal-BottomPane'
				);

				assert.equal(
					'Search Filters',
					BottomPane.text(),
					'must render children passed in'
				);
			});

			it('should set the top pane as secondary when the bottom pane is set to primary', () => {
				const wrapper = shallow(
					<SplitHorizontal>
						<SplitHorizontal.BottomPane isPrimary>
							Search Filters
						</SplitHorizontal.BottomPane>
					</SplitHorizontal>
				);

				const motionWrapper = wrapper.find(Motion).shallow();
				const BottomPane = motionWrapper.find(
					'.lucid-SplitHorizontal-inner > .lucid-SplitHorizontal-TopPane'
				);

				assert(
					BottomPane.hasClass('lucid-SplitHorizontal-is-secondary'),
					'must have the secondary className'
				);
			});

			it('should pass thru the with to flexBasis', () => {
				const wrapper = shallow(
					<SplitHorizontal>
						<SplitHorizontal.BottomPane height={123}>
							Search Filters
						</SplitHorizontal.BottomPane>
					</SplitHorizontal>
				);

				const motionWrapper = wrapper.find(Motion).shallow();
				const BottomPane: any = motionWrapper.find(
					'.lucid-SplitHorizontal-inner > .lucid-SplitHorizontal-BottomPane'
				);

				assert.equal(
					123,
					BottomPane.prop('style').flexBasis,
					'must set the flexBasis to match the given height'
				);
			});

			describe('BottomPane pass throughs', () => {
				let bottomPaneWrapper: any;
				const bottomPaneDefaultProps = SplitHorizontalBottomPane.defaultProps;

				beforeEach(() => {
					const props = {
						...bottomPaneDefaultProps,
						height: 321,
						isPrimary: true,
						className: 'wut',
						initialState: { test: true },
						callbackId: 1,
						'data-testid': 10,
					};

					bottomPaneWrapper = mount(
						<SplitHorizontal>
							<SplitHorizontal.BottomPane {...props}>
								Search Filters
							</SplitHorizontal.BottomPane>
						</SplitHorizontal>
					);
				});

				afterEach(() => {
					bottomPaneWrapper.unmount();
				});

				it('should pass through props not defined in the BottomPane `propTypes`', () => {
					const bottomPaneProps = bottomPaneWrapper
						.find('.lucid-SplitHorizontal-BottomPane')
						.props();

					expect(
						bottomPaneWrapper
							.find('.lucid-SplitHorizontal-BottomPane')
							.prop(['className'])
					).toContain('wut');
					expect(
						bottomPaneWrapper
							.find('.lucid-SplitHorizontal-BottomPane')
							.prop(['data-testid'])
					).toBe(10);

					forEach(['className', 'data-testid', 'style', 'children'], (prop) => {
						expect(has(bottomPaneProps, prop)).toBe(true);
					});
				});
				it('omits the props defined in BottomPane `propTypes`, (plus, in addition, `initialState`, and `callbackId`) from the TopPane element', () => {
					const bottomPaneProps = bottomPaneWrapper
						.find('.lucid-SplitHorizontal-BottomPane')
						.props();

					forEach(
						['height', 'isPrimary', 'initialState', 'callbackId'],
						(prop) => {
							expect(has(bottomPaneProps, prop)).toBe(false);
						}
					);
				});
			});
		});

		describe('Divider', () => {
			it('should render children passed in', () => {
				const wrapper = shallow(
					<SplitHorizontal>
						<SplitHorizontal.Divider>Resize</SplitHorizontal.Divider>
					</SplitHorizontal>
				);

				const motionWrapper = wrapper.find(Motion).shallow();
				const dividerWrapper = motionWrapper.find(
					'.lucid-SplitHorizontal-inner > .lucid-SplitHorizontal-Divider'
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
