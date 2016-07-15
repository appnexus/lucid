import React from 'react';
import { shallow, mount } from 'enzyme';
import assert from 'assert';
import sinon from 'sinon';
import describeWithDOM from '../../util/describe-with-dom';
import _ from 'lodash';
import { common } from '../../util/generic-tests';
import SplitVertical from './SplitVertical';
import DragCaptureZone from '../DragCaptureZone/DragCaptureZone';

describe('SplitVertical', () => {
	common(SplitVertical);

	describe('render', () => {
		it('should render an inner element with the left, right, and divider elements as children', () => {
			const wrapper = shallow(
				<SplitVertical />
			);

			assert.equal(wrapper.find('.lucid-SplitVertical').length, 1);
			assert.equal(wrapper.find('.lucid-SplitVertical > .lucid-SplitVertical-inner').length, 1);
			assert.equal(wrapper.find('.lucid-SplitVertical > .lucid-SplitVertical-inner > .lucid-SplitVertical-LeftPane').length, 1);
			assert.equal(wrapper.find('.lucid-SplitVertical > .lucid-SplitVertical-inner > .lucid-SplitVertical-Divider').length, 1);
			assert.equal(wrapper.find('.lucid-SplitVertical > .lucid-SplitVertical-inner > .lucid-SplitVertical-RightPane').length, 1);
		});
	});

	describe('props', () => {
		describe('isExpanded', () => {
			it('should default to true', () => {
				const wrapper = shallow(
					<SplitVertical />
				);

				assert.equal(wrapper.find('.lucid-SplitVertical.lucid-SplitVertical-is-expanded').length, 1);
			});

			it('should apply the &-is-expanded css class when true', () => {
				const wrapper = shallow(
					<SplitVertical isExpanded={true} />
				);

				assert.equal(wrapper.find('.lucid-SplitVertical.lucid-SplitVertical-is-expanded').length, 1);
			});

			it('should apply the &-is-expanded css class when false', () => {
				const wrapper = shallow(
					<SplitVertical isExpanded={false} />
				);

				assert.equal(wrapper.find('.lucid-SplitVertical.lucid-SplitVertical-is-expanded').length, 0);
			});
		});

		describeWithDOM('isAnimated', () => {
			let wrapper;

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
			});

			it('should default to false [mostly stable]', (done) => {
				wrapper = mount(
					<SplitVertical />
				);

				_.delay(() => {
					assert.equal(wrapper.find('.lucid-SplitVertical.lucid-SplitVertical-is-animated').length, 0);
					done();
				}, 10)
			});

			it('should apply the &-is-animated class when true, after initial render [mostly stable]', (done) => {
				wrapper = mount(
					<SplitVertical isAnimated={true} />
				);

				_.delay(() => {
					assert.equal(wrapper.find('.lucid-SplitVertical.lucid-SplitVertical-is-animated').length, 1);
					done();
				}, 10)
			});

			it('should not apply the &-is-animated class when false [mostly stable]', (done) => {
				wrapper = mount(
					<SplitVertical isAnimated={false} />
				);

				_.delay(() => {
					assert.equal(wrapper.find('.lucid-SplitVertical.lucid-SplitVertical-is-animated').length, 0);
					done();
				}, 10)
			});
		});

		describeWithDOM('collapseShift', () => {
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

			it('should translated by 64px - width when the right pane is primary [mostly stable]', (done) => {
				wrapper = mount(
					<SplitVertical isExpanded={false} collapseShift={64}>
						<SplitVertical.LeftPane />
						<SplitVertical.RightPane isPrimary />
					</SplitVertical>
				, { attachTo: mountTestDiv});

				_.delay(() => {
					const innerDiv = mountTestDiv.querySelector('.lucid-SplitVertical-inner');
					const secondaryPaneDiv = mountTestDiv.querySelector('.lucid-SplitVertical-is-secondary');
					const translatePX = parseInt(innerDiv.style.transform.replace(/(translateX[(]|px[)])/ig, ''), 10);
					const width = secondaryPaneDiv.getBoundingClientRect().width;

					assert.equal(64 - width, translatePX, 'must be translated by 64px - width');
					done();
				}, 10)
			});

			it('should translated by width - 64px when the left pane is primary [mostly stable]', (done) => {
				wrapper = mount(
					<SplitVertical isExpanded={false} collapseShift={64}>
						<SplitVertical.LeftPane isPrimary />
						<SplitVertical.RightPane />
					</SplitVertical>
				, { attachTo: mountTestDiv});

				_.delay(() => {
					const innerDiv = mountTestDiv.querySelector('.lucid-SplitVertical-inner');
					const secondaryPaneDiv = mountTestDiv.querySelector('.lucid-SplitVertical-is-secondary');
					const translatePX = parseInt(innerDiv.style.transform.replace(/(translateX[(]|px[)])/ig, ''), 10);
					const width = secondaryPaneDiv.getBoundingClientRect().width;

					assert.equal(width - 64, translatePX, 'must be translated by width - 64px');
					done();
				}, 10)
			});

		});

		describeWithDOM('onResizing', () => {
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
					<SplitVertical isExpanded={true} onResizing={onResizing} />
				, { attachTo: mountTestDiv });

				const {
					onDragStart,
					onDrag,
					onDragEnd,
				} = wrapper.find(DragCaptureZone).props();

				const lastArg = { event: {} };

				onDragStart(lastArg);
				onDrag({dX: 122}, lastArg);
				onDragEnd({dX: 123}, lastArg);

				assert(onResizing.called, 'must be called');
				assert.equal(onResizing.lastCall.args[0], 122, 'must pass the new width of the pane');
				assert.equal(onResizing.lastCall.args[1].props, wrapper.props(), 'must pass component props in the last arg');
				assert.equal(onResizing.lastCall.args[1].event, lastArg.event, 'must pass event reference in the last arg');
			});
		});

		describeWithDOM('onResize', () => {
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
					<SplitVertical isExpanded={true} onResize={onResize} />
				, { attachTo: mountTestDiv });

				const {
					onDragStart,
					onDrag,
					onDragEnd,
				} = wrapper.find(DragCaptureZone).props();

				const lastArg = { event: {} };

				onDragStart(lastArg);
				onDrag({dX: 122}, lastArg);
				onDragEnd({dX: 123}, lastArg);

				assert(onResize.called, 'must be called');
				assert.equal(onResize.lastCall.args[0], 123, 'must pass the new width of the pane');
				assert.equal(onResize.lastCall.args[1].props, wrapper.props(), 'must pass component props in the last arg');
				assert.equal(onResize.lastCall.args[1].event, lastArg.event, 'must pass event reference in the last arg');
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

				const LeftPane = wrapper.find('.lucid-SplitVertical > .lucid-SplitVertical-inner > .lucid-SplitVertical-LeftPane');

				assert.equal('Search Filters', LeftPane.text(), 'must render children passed in');
			});

			it('should set the right pane as secondary when the left pane is set to primary', () => {
				const wrapper = shallow(
					<SplitVertical>
						<SplitVertical.LeftPane isPrimary>Search Filters</SplitVertical.LeftPane>
					</SplitVertical>
				);

				const RightPane = wrapper.find('.lucid-SplitVertical > .lucid-SplitVertical-inner > .lucid-SplitVertical-RightPane');

				assert(RightPane.hasClass('lucid-SplitVertical-is-secondary'), 'must have the secondary className');
			});

			it('should pass thru the with to flexBasis', () => {
				const wrapper = shallow(
					<SplitVertical>
						<SplitVertical.LeftPane width={123}>Search Filters</SplitVertical.LeftPane>
					</SplitVertical>
				);

				const LeftPane = wrapper.find('.lucid-SplitVertical > .lucid-SplitVertical-inner > .lucid-SplitVertical-LeftPane');

				assert.equal(123, LeftPane.prop('style').flexBasis, 'must set the flexBasis to match the given width');
			});
		});

		describe('RightPane', () => {
			it('should render children passed in', () => {
				const wrapper = shallow(
					<SplitVertical>
						<SplitVertical.RightPane>Search Filters</SplitVertical.RightPane>
					</SplitVertical>
				);

				const RightPane = wrapper.find('.lucid-SplitVertical > .lucid-SplitVertical-inner > .lucid-SplitVertical-RightPane');

				assert.equal('Search Filters', RightPane.text(), 'must render children passed in');
			});

			it('should set the left pane as secondary when the right pane is set to primary', () => {
				const wrapper = shallow(
					<SplitVertical>
						<SplitVertical.RightPane isPrimary>Search Filters</SplitVertical.RightPane>
					</SplitVertical>
				);

				const LeftPane = wrapper.find('.lucid-SplitVertical > .lucid-SplitVertical-inner > .lucid-SplitVertical-LeftPane');

				assert(LeftPane.hasClass('lucid-SplitVertical-is-secondary'), 'must have the secondary className');
			});

			it('should pass thru the with to flexBasis', () => {
				const wrapper = shallow(
					<SplitVertical>
						<SplitVertical.RightPane width={123}>Search Filters</SplitVertical.RightPane>
					</SplitVertical>
				);

				const RightPane = wrapper.find('.lucid-SplitVertical > .lucid-SplitVertical-inner > .lucid-SplitVertical-RightPane');

				assert.equal(123, RightPane.prop('style').flexBasis, 'must set the flexBasis to match the given width');
			});
		});

		describe('Divider', () => {
			it('should render children passed in', () => {
				const wrapper = shallow(
					<SplitVertical>
						<SplitVertical.Divider>Resize</SplitVertical.Divider>
					</SplitVertical>
				);

				const dividerWrapper = wrapper.find('.lucid-SplitVertical > .lucid-SplitVertical-inner > .lucid-SplitVertical-Divider');

				assert.equal('Resize', dividerWrapper.children().text(), 'must render children passed in');
			});
		});
	});
});
