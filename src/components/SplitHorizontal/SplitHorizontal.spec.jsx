import React from 'react';
import { shallow, mount } from 'enzyme';
import assert from 'assert';
import sinon from 'sinon';
import _ from 'lodash';
import { common } from '../../util/generic-tests';
import SplitHorizontal from './SplitHorizontal';
import DragCaptureZone from '../DragCaptureZone/DragCaptureZone';
import { Motion } from 'react-motion';
import { MOSTLY_STABLE_DELAY } from '../../../tests/constants';

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
				const wrapper = shallow(<SplitHorizontal />);

				assert(wrapper.hasClass('lucid-SplitHorizontal-is-expanded'));
			});

			it('should apply the &-is-expanded css class when true', () => {
				const wrapper = shallow(<SplitHorizontal isExpanded={true} />);

				assert(wrapper.hasClass('lucid-SplitHorizontal-is-expanded'));
			});

			it.skip(
				'should not apply the &-is-expanded css class when false [mostly stable]',
				done => {
					mountWrapper = mount(<SplitHorizontal isExpanded={false} />);

					assert(!mountWrapper.hasClass('lucid-SplitHorizontal-is-expanded'));
					_.delay(done, MOSTLY_STABLE_DELAY);
				}
			);
		});

		describe('isAnimated', () => {
			let wrapper;

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
			});

			it('should default to false [mostly stable]', done => {
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

			it('should apply the &-is-animated class when true, after initial render [mostly stable]', done => {
				wrapper = mount(<SplitHorizontal isAnimated={true} />);

				_.delay(() => {
					assert.equal(
						wrapper.find(
							'.lucid-SplitHorizontal.lucid-SplitHorizontal-is-animated'
						).length,
						1
					);
					done();
				}, MOSTLY_STABLE_DELAY);
			});

			it('should not apply the &-is-animated class when false [mostly stable]', done => {
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

			it('should translated by height - 64px when the bottom pane is primary [mostly stable]', done => {
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
					const slideAmount = wrapper.find(Motion).prop('style').slideAmount;
					assert.equal(
						height - 64,
						slideAmount,
						'must be translated by height - 64px'
					);
					done();
				}, MOSTLY_STABLE_DELAY);
			});

			it('should translated by height - 64px when the top pane is primary [mostly stable]', done => {
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
					const slideAmount = wrapper.find(Motion).prop('style').slideAmount;
					assert.equal(
						height - 64,
						slideAmount,
						'must be translated by height - 64px'
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
				const onResizing = sinon.spy();

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

				assert(onResizing.called, 'must be called');
				assert.equal(
					onResizing.lastCall.args[0],
					122,
					'must pass the new height of the pane'
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
				const onResize = sinon.spy();

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

				assert(onResize.called, 'must be called');
				assert.equal(
					onResize.lastCall.args[0],
					123,
					'must pass the new height of the pane'
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
				const TopPane = motionWrapper.find(
					'.lucid-SplitHorizontal-inner > .lucid-SplitHorizontal-TopPane'
				);

				assert.equal(
					123,
					TopPane.prop('style').flexBasis,
					'must set the flexBasis to match the given height'
				);
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
				const TopPane = motionWrapper.find(
					'.lucid-SplitHorizontal-inner > .lucid-SplitHorizontal-TopPane'
				);

				assert(
					TopPane.hasClass('lucid-SplitHorizontal-is-secondary'),
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
				const BottomPane = motionWrapper.find(
					'.lucid-SplitHorizontal-inner > .lucid-SplitHorizontal-BottomPane'
				);

				assert.equal(
					123,
					BottomPane.prop('style').flexBasis,
					'must set the flexBasis to match the given height'
				);
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
