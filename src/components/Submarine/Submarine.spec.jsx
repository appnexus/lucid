import React from 'react';
import { mount, shallow } from 'enzyme';
import assert from 'assert';
import sinon from 'sinon';
import { common } from '../../util/generic-tests';
import Submarine from './Submarine';
import SplitHorizontal from '../SplitHorizontal/SplitHorizontal';

describe('Submarine', () => {
	common(Submarine);

	describe('render', () => {
		it('should render a Bar with header and content, a Divider with gripper, and a Primary pane', () => {
			const wrapper = shallow(
				<Submarine />
			);

			assert.equal(1, wrapper.find(SplitHorizontal).length, 'must render a SplitHorizontal');
			assert.equal(wrapper.find('.lucid-Submarine').length, 1);
			assert.equal(wrapper.find('.lucid-Submarine > .lucid-Submarine-Bar').length, 1);
			assert.equal(wrapper.find('.lucid-Submarine > .lucid-Submarine-Bar > .lucid-Submarine-Bar-overlay').length, 1);
			assert.equal(wrapper.find('.lucid-Submarine > .lucid-Submarine-Bar > .lucid-Submarine-Bar-header').length, 1);
			assert.equal(wrapper.find('.lucid-Submarine > .lucid-Submarine-Bar > .lucid-Submarine-Bar-header > .lucid-Submarine-Bar-Title').length, 1);
			assert.equal(wrapper.find('.lucid-Submarine > .lucid-Submarine-Bar > .lucid-Submarine-Bar-header > .lucid-Submarine-expander').length, 1);
			assert.equal(wrapper.find('.lucid-Submarine > .lucid-Submarine-Bar > .lucid-Submarine-Bar-content').length, 1);
			assert.equal(wrapper.find('.lucid-Submarine > .lucid-Submarine-Divider').length, 1);
			assert.equal(wrapper.find('.lucid-Submarine > .lucid-Submarine-Divider > .lucid-Submarine-Divider-gripper').length, 1);
			assert.equal(wrapper.find('.lucid-Submarine > .lucid-Submarine-Primary').length, 1);
		});
	});

	describe('props', () => {
		describe('height', () => {
			it('should pass height to underlying SplitHorizontal pane for the sidebar', () => {
				const wrapper = shallow(
					<Submarine height={123} />
				);
				const barWrapper = wrapper.find('.lucid-Submarine > .lucid-Submarine-Bar')

				assert.equal(123, barWrapper.prop('height'), 'must pass height to the bar pane')
			});

			it('should default to 250', () => {
				const wrapper = shallow(
					<Submarine />
				);
				const barWrapper = wrapper.find('.lucid-Submarine > .lucid-Submarine-Bar')

				assert.equal(250, barWrapper.prop('height'), 'must pass height to the bar pane')
			});
		});

		describe('isExpanded', () => {
			let wrapper;

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
			});

			it('should pass isExpanded to the underlying SplitHorizontal (true)', () => {
				wrapper = shallow(
					<Submarine isExpanded={true} />
				);

				const splitHorizontal = wrapper.find(SplitHorizontal);

				assert(splitHorizontal.prop('isExpanded'), 'must pass isExpanded to the underlying SplitHorizontal')
				assert(splitHorizontal.shallow().hasClass('lucid-SplitHorizontal-is-expanded'), 'must have the lucid-SplitHorizontal-is-expanded className')
			});

			it('should pass isExpanded to the underlying SplitHorizontal (false)', () => {
				wrapper = mount(
					<Submarine isExpanded={false} />
				);

				const splitHorizontal = wrapper.find(SplitHorizontal);

				assert(!splitHorizontal.prop('isExpanded'), 'must pass isExpanded to the underlying SplitHorizontal')
				assert(!splitHorizontal.hasClass('lucid-SplitHorizontal-is-expanded'), 'must not have the lucid-SplitHorizontal-is-expanded className')
			});

			it('should default to true', () => {
				wrapper = shallow(
					<Submarine />
				);

				const splitHorizontal = wrapper.find(SplitHorizontal);

				assert(splitHorizontal.prop('isExpanded'), 'must pass isExpanded to the underlying SplitHorizontal')
				assert(splitHorizontal.shallow().hasClass('lucid-SplitHorizontal-is-expanded'), 'must have the lucid-SplitHorizontal-is-expanded className')
			});
		});

		describe('isAnimated', () => {
			it('should pass isAnimated to the underlying SplitHorizontal (true)', () => {
				const wrapper = shallow(
					<Submarine isAnimated={true} />
				);
				const splitHorizontal = wrapper.find(SplitHorizontal);

				assert(splitHorizontal.prop('isAnimated'), 'must pass isAnimated to the underlying SplitHorizontal')
			});

			it('should pass isAnimated to the underlying SplitHorizontal (false)', () => {
				const wrapper = shallow(
					<Submarine isAnimated={false} />
				);
				const splitHorizontal = wrapper.find(SplitHorizontal);

				assert(!splitHorizontal.prop('isAnimated'), 'must pass isAnimated to the underlying SplitHorizontal')
			});

			it('should default to true', () => {
				const wrapper = shallow(
					<Submarine />
				);
				const splitHorizontal = wrapper.find(SplitHorizontal);

				assert(splitHorizontal.prop('isAnimated'), 'must pass isAnimated to the underlying SplitHorizontal')
			});
		});

		describe('position', () => {
			it('should render the Bar in the TopPane and the primary content in the BottomPane when set to `top`', () => {
				const wrapper = shallow(
					<Submarine position='top' />
				);
				const splitHorizontalTopPane = wrapper.find(SplitHorizontal.TopPane);
				const splitHorizontalBottomPane = wrapper.find(SplitHorizontal.BottomPane);

				assert(!splitHorizontalTopPane.prop('isPrimary'), 'must not be primary')
				assert(splitHorizontalTopPane.hasClass('lucid-Submarine-Bar'), 'must have the className lucid-Submarine-Bar')
				assert(splitHorizontalBottomPane.prop('isPrimary'), 'must be primary')
				assert(splitHorizontalBottomPane.hasClass('lucid-Submarine-Primary'), 'must have the className lucid-Submarine-Primary')
			});

			it('should render the Primary content in the TopPane and the Bar in the BottomPane when set to `bottom`', () => {
				const wrapper = shallow(
					<Submarine position='bottom' />
				);
				const splitHorizontalTopPane = wrapper.find(SplitHorizontal.TopPane);
				const splitHorizontalBottomPane = wrapper.find(SplitHorizontal.BottomPane);

				assert(splitHorizontalTopPane.prop('isPrimary'), 'must not be primary')
				assert(splitHorizontalTopPane.hasClass('lucid-Submarine-Primary'), 'must have the className lucid-Submarine-Primary')
				assert(!splitHorizontalBottomPane.prop('isPrimary'), 'must be primary')
				assert(splitHorizontalBottomPane.hasClass('lucid-Submarine-Bar'), 'must have the className lucid-Submarine-Bar')
			});

			it('should default to `bottom`', () => {
				const wrapper = shallow(
					<Submarine />
				);
				const splitHorizontalTopPane = wrapper.find(SplitHorizontal.TopPane);
				const splitHorizontalBottomPane = wrapper.find(SplitHorizontal.BottomPane);

				assert(splitHorizontalTopPane.prop('isPrimary'), 'must be primary')
				assert(splitHorizontalTopPane.hasClass('lucid-Submarine-Primary'), 'must have the className lucid-Submarine-Primary')
				assert(!splitHorizontalBottomPane.prop('isPrimary'), 'must not be primary')
				assert(splitHorizontalBottomPane.hasClass('lucid-Submarine-Bar'), 'must have the className lucid-Submarine-Bar')
			});
		});

		describe('isResizeDisabled', () => {
			it('should set the className lucid-Submarine-is-resize-disabled (true)', () => {
				const wrapper = shallow(
					<Submarine isResizeDisabled={true} />
				);

				assert(wrapper.hasClass('lucid-Submarine-is-resize-disabled'), 'must have className lucid-Submarine-is-resize-disabled')
			});

			it('should not set the className lucid-Submarine-is-resize-disabled (false)', () => {
				const wrapper = shallow(
					<Submarine isResizeDisabled={false} />
				);

				assert(!wrapper.hasClass('lucid-Submarine-is-resize-disabled'), 'must not have className lucid-Submarine-is-resize-disabled')
			});

			it('should default to false', () => {
				const wrapper = shallow(
					<Submarine />
				);

				assert(!wrapper.hasClass('lucid-Submarine-is-resize-disabled'), 'must not have className lucid-Submarine-is-resize-disabled')
			});
		});

		describe('Title', () => {
			it('should render the prop value in the title', () => {
				const wrapper = shallow(
					<Submarine Title='Help Docs' />
				);

				const titleWrapper = wrapper.find('.lucid-Submarine > .lucid-Submarine-Bar > .lucid-Submarine-Bar-header .lucid-Submarine-Bar-Title');
				assert.equal('Help Docs', titleWrapper.text(), 'must render the prop value in the title');
			});
		});

		describe('onResizing', () => {
			it('should be called when onResizing event handler is called on SplitHorizontal', () => {
				const onResizing = sinon.spy();
				const wrapper = shallow(
					<Submarine onResizing={onResizing} />
				);
				const splitHorizontal = wrapper.find(SplitHorizontal);
				const splitHorizontalOnResizing = splitHorizontal.prop('onResizing');
				const lastArg = {
					event: {},
					props: wrapper.props(),
				};

				splitHorizontalOnResizing(123, lastArg);

				assert(onResizing.called, 'must be called');
				assert.equal(123, onResizing.lastCall.args[0], 'must pass the new height in the first arg');
				assert.equal(lastArg.event, onResizing.lastCall.args[1].event, 'must pass event in the last arg');
			});
		});

		describe('onResize', () => {
			it('should be called when onResize event handler is called on SplitHorizontal', () => {
				const onResize = sinon.spy();
				const wrapper = shallow(
					<Submarine onResize={onResize} />
				);
				const splitHorizontal = wrapper.find(SplitHorizontal);
				const splitHorizontalOnResize = splitHorizontal.prop('onResize');
				const lastArg = {
					event: {},
					props: wrapper.props(),
				};

				splitHorizontalOnResize(123, lastArg);

				assert(onResize.called, 'must be called');
				assert.equal(123, onResize.lastCall.args[0], 'must pass the new height in the first arg');
				assert.equal(lastArg.event, onResize.lastCall.args[1].event, 'must pass event in the last arg');
			});
		});

		describe('onToggle', () => {
			it('should be called when the expander button is clicked', () => {
				const onToggle = sinon.spy();
				const wrapper = shallow(
					<Submarine isExpanded={false} onToggle={onToggle} />
				);
				const expanderWrapper = wrapper.find('.lucid-Submarine > .lucid-Submarine-Bar > .lucid-Submarine-Bar-header > .lucid-Submarine-expander');
				const expanderWrapperOnMouseDown = expanderWrapper.prop('onMouseDown');
				const lastArg = {
					event: {},
					props: wrapper.props(),
				};

				expanderWrapperOnMouseDown(lastArg.event);

				assert(onToggle.called, 'must be called');
				assert.equal(lastArg.event, onToggle.lastCall.args[0].event, 'must pass event in the last arg');
			});
		});
	});

	describe('child components', () => {
		describe('Bar', () => {
			it('should render children passed in', () => {
				const wrapper = shallow(
					<Submarine>
						<Submarine.Bar>Next level locavore squid</Submarine.Bar>
					</Submarine>
				);

				const contentWrapper = wrapper.find('.lucid-Submarine > .lucid-Submarine-Bar > .lucid-Submarine-Bar-content');
				assert.equal('Next level locavore squid', contentWrapper.text(), 'must render content in the side bar')
			});

			it('should render title from the given prop value for `Title`', () => {
				const wrapper = shallow(
					<Submarine>
						<Submarine.Bar Title='Authentic pork belly' />
					</Submarine>
				);

				const titleWrapper = wrapper.find('.lucid-Submarine > .lucid-Submarine-Bar > .lucid-Submarine-Bar-header > .lucid-Submarine-Bar-Title');
				assert.equal('Authentic pork belly', titleWrapper.text(), 'must render title from prop value')
			});

			it('should render title from the `<Submarine.Title>` composed with children', () => {
				const wrapper = shallow(
					<Submarine>
						<Submarine.Bar>
							<Submarine.Title>Shabby Chic Dreamcatcher</Submarine.Title>
						</Submarine.Bar>
					</Submarine>
				);

				const titleWrapper = wrapper.find('.lucid-Submarine > .lucid-Submarine-Bar > .lucid-Submarine-Bar-header > .lucid-Submarine-Bar-Title');
				assert.equal('Shabby Chic Dreamcatcher', titleWrapper.text(), 'must render title from composed children')
			});
		});

		describe('Primary', () => {
			it('should render children passed in', () => {
				const wrapper = shallow(
					<Submarine>
						<Submarine.Primary>You probably havent heard of them</Submarine.Primary>
					</Submarine>
				);

				const primaryWrapper = wrapper.find('.lucid-Submarine > .lucid-Submarine-Primary');
				assert.equal('You probably havent heard of them', primaryWrapper.children().text(), 'must render content in the primary section')
			});
		});

		describe('Title', () => {
			it('should render children passed in', () => {
				const wrapper = shallow(
					<Submarine>
						<Submarine.Title>Roof Party Green Juice Mustache</Submarine.Title>
					</Submarine>
				);

				const titleWrapper = wrapper.find('.lucid-Submarine > .lucid-Submarine-Bar > .lucid-Submarine-Bar-header > .lucid-Submarine-Bar-Title');
				assert.equal('Roof Party Green Juice Mustache', titleWrapper.text(), 'must render title from composed children')
			});
		});
	});
});
