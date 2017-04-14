import React from 'react';
import { shallow, mount } from 'enzyme';
import assert from 'assert';
import sinon from 'sinon';
import _ from 'lodash';
import { common } from '../../util/generic-tests';
import SplitVertical from './SplitVertical';
import DragCaptureZone from '../DragCaptureZone/DragCaptureZone';
import { Motion } from 'react-motion';
import { MOSTLY_STABLE_DELAY } from '../../../tests/constants';

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
	});

	describe('props', () => {
		describe('isExpanded', () => {
			let mountWrapper;

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

			it('should not apply the &-is-expanded css class when false [mostly stable]', done => {
				mountWrapper = mount(<SplitVertical isExpanded={false} />);

				assert(!mountWrapper.hasClass('lucid-SplitHorizontal-is-expanded'));
				_.delay(done, MOSTLY_STABLE_DELAY);
			});
		});

		describe('isAnimated', () => {
			let wrapper;

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
			});

			it('should default to false [mostly stable]', done => {
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

			it('should apply the &-is-animated class when true, after initial render [mostly stable]', done => {
				wrapper = mount(<SplitVertical isAnimated={true} />);

				_.delay(() => {
					assert.equal(
						wrapper.find('.lucid-SplitVertical.lucid-SplitVertical-is-animated')
							.length,
						1
					);
					done();
				}, MOSTLY_STABLE_DELAY);
			});

			it('should not apply the &-is-animated class when false [mostly stable]', done => {
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
			let wrapper;
			let mountTestDiv;

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

			it('should translated by width - 64px when the right pane is primary [mostly stable]', done => {
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
					const slideAmount = wrapper.find(Motion).prop('style').slideAmount;
					assert.equal(
						width - 64,
						slideAmount,
						'must be translated by width - 64px'
					);
					done();
				}, MOSTLY_STABLE_DELAY);
			});

			it('should translated by width - 64px when the left pane is primary [mostly stable]', done => {
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
			let wrapper;
			let mountTestDiv;

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
				const onResizing = sinon.spy();

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

				assert(onResizing.called, 'must be called');
				assert.equal(
					onResizing.lastCall.args[0],
					dX,
					'must pass the new width of the pane'
				);
				assert.equal(
					onResizing.lastCall.args[1].props,
					wrapper.props(),
					'must pass component props in the last arg'
				);
				assert.equal(
					onResizing.lastCall.args[1].event,
					lastArg.event,
					'must pass event reference in the last arg'
				);
			});
		});

		describe('onResize', () => {
			let wrapper;
			let mountTestDiv;

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
				const width = 100;
				const dX = 122;
				const onResize = sinon.spy();

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

				assert(onResize.called, 'must be called');
				assert.equal(
					onResize.lastCall.args[0],
					dX + 1,
					'must pass the new width of the pane'
				);
				assert.equal(
					onResize.lastCall.args[1].props,
					wrapper.props(),
					'must pass component props in the last arg'
				);
				assert.equal(
					onResize.lastCall.args[1].event,
					lastArg.event,
					'must pass event reference in the last arg'
				);
			});

			describe('isResizeable', () => {
				it('shoult set -is-resizeable class on divider', () => {
					const wrapper = shallow(<SplitVertical />);

					const dividerDivWrapper = wrapper
						.find(Motion)
						.shallow()
						.find(DragCaptureZone)
						.shallow()
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
				const LeftPane = motionWrapper.find(
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
				const RightPane = motionWrapper.find(
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
