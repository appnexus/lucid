import React from 'react';
import _, { forEach, has } from 'lodash';
import { shallow, mount } from 'enzyme';
import assert from 'assert';
import sinon from 'sinon';

import { common } from '../../util/generic-tests';
import { SidebarDumb as Sidebar } from './Sidebar';
import SplitVertical from '../SplitVertical/SplitVertical';
import { MOSTLY_STABLE_DELAY } from '../../util/constants';

describe('Sidebar', () => {
	common(Sidebar);

	describe('render', () => {
		it('should render a Bar with header and content, a Divider with gripper, and a Primary pane', () => {
			const wrapper = shallow(<Sidebar />);

			assert.equal(
				1,
				wrapper.find(SplitVertical).length,
				'must render a SplitVertical'
			);
			assert.equal(wrapper.find('.lucid-Sidebar').length, 1);
			assert.equal(
				wrapper.find('.lucid-Sidebar > .lucid-Sidebar-Bar').length,
				1
			);
			assert.equal(
				wrapper.find(
					'.lucid-Sidebar > .lucid-Sidebar-Bar > .lucid-Sidebar-Bar-overlay'
				).length,
				1
			);
			assert.equal(
				wrapper.find(
					'.lucid-Sidebar > .lucid-Sidebar-Bar > .lucid-Sidebar-Bar-header'
				).length,
				1
			);
			assert.equal(
				wrapper.find(
					'.lucid-Sidebar > .lucid-Sidebar-Bar > .lucid-Sidebar-Bar-header > .lucid-Sidebar-Bar-Title'
				).length,
				1
			);
			assert.equal(
				wrapper.find(
					'.lucid-Sidebar > .lucid-Sidebar-Bar > .lucid-Sidebar-Bar-header > .lucid-Sidebar-expander'
				).length,
				1
			);
			assert.equal(
				wrapper.find(
					'.lucid-Sidebar > .lucid-Sidebar-Bar > .lucid-Sidebar-Bar-content'
				).length,
				1
			);
			assert.equal(
				wrapper.find('.lucid-Sidebar > .lucid-Sidebar-Divider').length,
				1
			);
			assert.equal(
				wrapper.find(
					'.lucid-Sidebar > .lucid-Sidebar-Divider > .lucid-Sidebar-Divider-gripper'
				).length,
				1
			);
			assert.equal(
				wrapper.find('.lucid-Sidebar > .lucid-Sidebar-Primary').length,
				1
			);
		});
	});

	describe('props', () => {
		describe('width', () => {
			it('should pass width to underlying SplitVertical pane for the sidebar', () => {
				const wrapper = shallow(<Sidebar width={123} />);
				const barWrapper = wrapper.find('.lucid-Sidebar > .lucid-Sidebar-Bar');

				assert.equal(
					123,
					barWrapper.prop('width'),
					'must pass width to the bar pane'
				);
			});

			it('should default to 250', () => {
				const wrapper = shallow(<Sidebar />);
				const barWrapper = wrapper.find('.lucid-Sidebar > .lucid-Sidebar-Bar');

				assert.equal(
					250,
					barWrapper.prop('width'),
					'must pass width to the bar pane'
				);
			});
		});

		describe('isExpanded', () => {
			let wrapper: any;

			afterEach(() => {
				if (wrapper && wrapper.exists()) {
					wrapper.unmount();
				}
			});

			it('should pass isExpanded to the underlying SplitVertical (true) [mostly stable]', (done) => {
				const wrapper = shallow(<Sidebar isExpanded={true} />);

				_.delay(() => {
					const splitVertical = wrapper.find(SplitVertical);

					assert(
						splitVertical.prop('isExpanded'),
						'must pass isExpanded to the underlying SplitVertical'
					);
					assert(
						splitVertical.shallow().hasClass('lucid-SplitVertical-is-expanded'),
						'must have the lucid-SplitVertical-is-expanded className'
					);
					done();
				}, MOSTLY_STABLE_DELAY);
			});

			it('should pass isExpanded to the underlying SplitVertical (false) [mostly stable]', (done) => {
				wrapper = mount(<Sidebar isExpanded={false} />);

				_.delay(() => {
					const splitVertical = wrapper.find(SplitVertical);

					assert(
						!splitVertical.prop('isExpanded'),
						'must pass isExpanded to the underlying SplitVertical'
					);
					assert(
						!splitVertical.hasClass('lucid-SplitVertical-is-expanded'),
						'must not have the lucid-SplitVertical-is-expanded className'
					);
					done();
				}, MOSTLY_STABLE_DELAY);
			});

			it('should default to true [mostly stable]', (done) => {
				const wrapper = shallow(<Sidebar />);

				_.delay(() => {
					const splitVertical = wrapper.find(SplitVertical);

					assert(
						splitVertical.prop('isExpanded'),
						'must pass isExpanded to the underlying SplitVertical'
					);
					assert(
						splitVertical.shallow().hasClass('lucid-SplitVertical-is-expanded'),
						'must have the lucid-SplitVertical-is-expanded className'
					);
					done();
				}, MOSTLY_STABLE_DELAY);
			});
		});

		describe('isAnimated', () => {
			it('should pass isAnimated to the underlying SplitVertical (true)', () => {
				const wrapper = shallow(<Sidebar isAnimated={true} />);
				const splitVertical = wrapper.find(SplitVertical);

				assert(
					splitVertical.prop('isAnimated'),
					'must pass isAnimated to the underlying SplitVertical'
				);
			});

			it('should pass isAnimated to the underlying SplitVertical (false)', () => {
				const wrapper = shallow(<Sidebar isAnimated={false} />);
				const splitVertical = wrapper.find(SplitVertical);

				assert(
					!splitVertical.prop('isAnimated'),
					'must pass isAnimated to the underlying SplitVertical'
				);
			});

			it('should default to true', () => {
				const wrapper = shallow(<Sidebar />);
				const splitVertical = wrapper.find(SplitVertical);

				assert(
					splitVertical.prop('isAnimated'),
					'must pass isAnimated to the underlying SplitVertical'
				);
			});
		});

		describe('position', () => {
			it('should render the Bar in the LeftPane and the primary content in the RightPane when set to `left`', () => {
				const wrapper = shallow(<Sidebar position='left' />);
				const splitVerticalLeftPane = wrapper.find(SplitVertical.LeftPane);
				const splitVerticalRightPane = wrapper.find(SplitVertical.RightPane);

				assert(!splitVerticalLeftPane.prop('isPrimary'), 'must not be primary');
				assert(
					splitVerticalLeftPane.hasClass('lucid-Sidebar-Bar'),
					'must have the className lucid-Sidebar-Bar'
				);
				assert(splitVerticalRightPane.prop('isPrimary'), 'must be primary');
				assert(
					splitVerticalRightPane.hasClass('lucid-Sidebar-Primary'),
					'must have the className lucid-Sidebar-Primary'
				);
			});

			it('should render the Primary content in the LeftPane and the Bar in the RightPane when set to `right`', () => {
				const wrapper = shallow(<Sidebar position='right' />);
				const splitVerticalLeftPane = wrapper.find(SplitVertical.LeftPane);
				const splitVerticalRightPane = wrapper.find(SplitVertical.RightPane);

				assert(splitVerticalLeftPane.prop('isPrimary'), 'must not be primary');
				assert(
					splitVerticalLeftPane.hasClass('lucid-Sidebar-Primary'),
					'must have the className lucid-Sidebar-Primary'
				);
				assert(!splitVerticalRightPane.prop('isPrimary'), 'must be primary');
				assert(
					splitVerticalRightPane.hasClass('lucid-Sidebar-Bar'),
					'must have the className lucid-Sidebar-Bar'
				);
			});

			it('should default to `left`', () => {
				const wrapper = shallow(<Sidebar />);
				const splitVerticalLeftPane = wrapper.find(SplitVertical.LeftPane);
				const splitVerticalRightPane = wrapper.find(SplitVertical.RightPane);

				assert(!splitVerticalLeftPane.prop('isPrimary'), 'must not be primary');
				assert(
					splitVerticalLeftPane.hasClass('lucid-Sidebar-Bar'),
					'must have the className lucid-Sidebar-Bar'
				);
				assert(splitVerticalRightPane.prop('isPrimary'), 'must be primary');
				assert(
					splitVerticalRightPane.hasClass('lucid-Sidebar-Primary'),
					'must have the className lucid-Sidebar-Primary'
				);
			});
		});

		describe('isResizeDisabled', () => {
			it('should set the className lucid-Sidebar-is-resize-disabled (true)', () => {
				const wrapper = shallow(<Sidebar isResizeDisabled={true} />);

				assert(
					wrapper.hasClass('lucid-Sidebar-is-resize-disabled'),
					'must have className lucid-Sidebar-is-resize-disabled'
				);
			});

			it('should not set the className lucid-Sidebar-is-resize-disabled (false)', () => {
				const wrapper = shallow(<Sidebar isResizeDisabled={false} />);

				assert(
					!wrapper.hasClass('lucid-Sidebar-is-resize-disabled'),
					'must not have className lucid-Sidebar-is-resize-disabled'
				);
			});

			it('should default to false', () => {
				const wrapper = shallow(<Sidebar />);

				assert(
					!wrapper.hasClass('lucid-Sidebar-is-resize-disabled'),
					'must not have className lucid-Sidebar-is-resize-disabled'
				);
			});
		});

		describe('title', () => {
			it('should render the prop value in the title', () => {
				const wrapper = shallow(<Sidebar title='Search Filters' />);

				const titleWrapper = wrapper.find(
					'.lucid-Sidebar > .lucid-Sidebar-Bar > .lucid-Sidebar-Bar-header .lucid-Sidebar-Bar-Title'
				);
				assert.equal(
					'Search Filters',
					titleWrapper.text(),
					'must render the prop value in the title'
				);
			});

			it('should default to `Title`', () => {
				const wrapper = shallow(<Sidebar />);

				const titleWrapper = wrapper.find(
					'.lucid-Sidebar > .lucid-Sidebar-Bar > .lucid-Sidebar-Bar-header .lucid-Sidebar-Bar-Title'
				);
				assert.equal(
					'Title',
					titleWrapper.text(),
					'must render `Title` in the title'
				);
			});
		});

		describe('Title', () => {
			it('should render the prop value in the title', () => {
				const wrapper = shallow(<Sidebar Title='Help Docs' />);

				const titleWrapper = wrapper.find(
					'.lucid-Sidebar > .lucid-Sidebar-Bar > .lucid-Sidebar-Bar-header .lucid-Sidebar-Bar-Title'
				);
				assert.equal(
					'Help Docs',
					titleWrapper.text(),
					'must render the prop value in the title'
				);
			});
		});

		describe('onResizing', () => {
			it('should be called when onResizing event handler is called on SplitVertical', () => {
				const onResizing = sinon.spy();
				const wrapper = shallow(<Sidebar onResizing={onResizing} />);
				const splitVertical = wrapper.find(SplitVertical);
				const splitVerticalOnResize = splitVertical.prop('onResizing');
				const lastArg: any = {
					event: {},
					props: wrapper.props(),
				};

				splitVerticalOnResize(123, lastArg);

				assert(onResizing.called, 'must be called');
				assert.equal(
					123,
					onResizing.lastCall.args[0],
					'must pass the new width in the first arg'
				);
				assert.equal(
					lastArg.event,
					onResizing.lastCall.args[1].event,
					'must pass event in the last arg'
				);
			});
		});

		describe('onResize', () => {
			it('should be called when onResize event handler is called on SplitVertical', () => {
				const onResize = sinon.spy();
				const wrapper = shallow(<Sidebar onResize={onResize} />);
				const splitVertical = wrapper.find(SplitVertical);
				const splitVerticalOnResize = splitVertical.prop('onResize');
				const lastArg: any = {
					event: {},
					props: wrapper.props(),
				};

				splitVerticalOnResize(123, lastArg);

				assert(onResize.called, 'must be called');
				assert.equal(
					123,
					onResize.lastCall.args[0],
					'must pass the new width in the first arg'
				);
				assert.equal(
					lastArg.event,
					onResize.lastCall.args[1].event,
					'must pass event in the last arg'
				);
			});
		});

		describe('onToggle', () => {
			it('should be called when the expander button is clicked', () => {
				const onToggle = sinon.spy();
				const wrapper = shallow(
					<Sidebar isExpanded={false} onToggle={onToggle} />
				);
				const expanderWrapper = wrapper.find(
					'.lucid-Sidebar > .lucid-Sidebar-Bar > .lucid-Sidebar-Bar-header > .lucid-Sidebar-expander'
				);
				const expanderWrapperOnMouseDown: any =
					expanderWrapper.prop('onMouseDown');
				const lastArg: any = {
					event: {},
					props: wrapper.props(),
				};

				expanderWrapperOnMouseDown(lastArg.event);

				assert(onToggle.called, 'must be called');
				assert.equal(
					lastArg.event,
					onToggle.lastCall.args[0].event,
					'must pass event in the last arg'
				);
			});
		});

		describe('pass throughs', () => {
			let wrapper: any;
			const defaultProps = Sidebar.defaultProps;

			beforeEach(() => {
				const props = {
					...defaultProps,
					width: 150,
					isExpanded: false,
					isAnimated: false,
					position: 'right' as const,
					isResizeDisabled: true,
					title: (
						<Sidebar.Title>
							Sidebar test title <button>Edit</button>
						</Sidebar.Title>
					),
					Title: <Sidebar.Title>Sidebar Test Title</Sidebar.Title>,
					className: 'wut',
					style: { marginRight: 10 },
					initialState: { test: true },
					callbackId: 1,
					'data-testid': 10,
				};
				wrapper = shallow(
					<Sidebar {...props}>
						<Sidebar.Bar
							Title={'Sidebar.Bar Test Title'}
							hasGutters={false}
							className={'foo bar'}
							style={{ marginLeft: 10 }}
							callbackId={2}
							data-testid={11}
						>
							Next level locavore squid
						</Sidebar.Bar>
					</Sidebar>
				);
			});
			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
			});
			it('passes through props not in `Sidebar.propTypes` to the root `SplitVertical` element', () => {
				const rootProps = wrapper.find('.lucid-Sidebar').props();

				forEach(
					[
						'callbackId',
						'data-testid',
						'style',
						'className',
						'isAnimated',
						'isExpanded',
						'collapseShift',
						'onResizing',
						'onResize',
						'children',
						'isResizeable',
					],
					(prop) => {
						expect(has(rootProps, prop)).toBe(true);
					}
				);
			});
			it('omits props defined in `Sidebar.propTypes` from the `SplitVertical` root element', () => {
				const rootProps = wrapper.find('.lucid-Sidebar').props();

				forEach(
					[
						'width',
						'position',
						'isResizeDisabled',
						'title',
						'Title',
						'initialState',
					],
					(prop) => {
						expect(has(rootProps, prop)).toBe(false);
					}
				);
			});
			it('passes through props not in `Sidebar.Bar.propTypes` to the `BarPane` element', () => {
				const barProps = wrapper.find('.lucid-Sidebar-Bar').props();

				forEach(
					[
						'className',
						'width',
						'style',
						'children',
						'isPrimary',
						'callbackId',
						'data-testid',
					],
					(prop) => {
						expect(has(barProps, prop)).toBe(true);
					}
				);
			});
			it('omits props defined in `Sidebar.Bar.propTypes` from the `BarPane` element', () => {
				const barProps = wrapper.find('.lucid-Sidebar-Bar').props();

				forEach(['hasGutters', 'Title', 'initialState'], (prop) => {
					expect(has(barProps, prop)).toBe(false);
				});
			});
		});
	});

	describe('child components', () => {
		describe('Bar', () => {
			it('should render children passed in', () => {
				const wrapper = shallow(
					<Sidebar>
						<Sidebar.Bar>Next level locavore squid</Sidebar.Bar>
					</Sidebar>
				);

				const contentWrapper = wrapper.find(
					'.lucid-Sidebar > .lucid-Sidebar-Bar > .lucid-Sidebar-Bar-content'
				);
				assert.equal(
					'Next level locavore squid',
					contentWrapper.text(),
					'must render content in the side bar'
				);
			});

			it('should have the correct class on bar content for `hasGutters`', () => {
				const wrapper = shallow(
					<Sidebar>
						<Sidebar.Bar hasGutters={true}>
							Next level locavore squid
						</Sidebar.Bar>
					</Sidebar>
				);

				const contentWrapper = wrapper.find(
					'.lucid-Sidebar > .lucid-Sidebar-Bar > .lucid-Sidebar-Bar-content'
				);
				assert(
					contentWrapper.hasClass('lucid-Sidebar-Bar-content-has-gutters')
				);
			});

			it('should render title from the given prop value for `title`', () => {
				const wrapper = shallow(
					<Sidebar>
						<Sidebar.Bar title='Artisan Jean Shorts' />
					</Sidebar>
				);

				const titleWrapper = wrapper.find(
					'.lucid-Sidebar > .lucid-Sidebar-Bar > .lucid-Sidebar-Bar-header > .lucid-Sidebar-Bar-Title'
				);
				assert.equal(
					'Artisan Jean Shorts',
					titleWrapper.text(),
					'must render title from prop value'
				);
			});

			it('should render title from the given prop value for `Title`', () => {
				const wrapper = shallow(
					<Sidebar>
						<Sidebar.Bar Title='Authentic pork belly' />
					</Sidebar>
				);

				const titleWrapper = wrapper.find(
					'.lucid-Sidebar > .lucid-Sidebar-Bar > .lucid-Sidebar-Bar-header > .lucid-Sidebar-Bar-Title'
				);
				assert.equal(
					'Authentic pork belly',
					titleWrapper.text(),
					'must render title from prop value'
				);
			});

			it('should render title from the `<Sidebar.Title>` composed with children', () => {
				const wrapper = shallow(
					<Sidebar>
						<Sidebar.Bar>
							<Sidebar.Title>Shabby Chic Dreamcatcher</Sidebar.Title>
						</Sidebar.Bar>
					</Sidebar>
				);

				const titleWrapper = wrapper.find(
					'.lucid-Sidebar > .lucid-Sidebar-Bar > .lucid-Sidebar-Bar-header > .lucid-Sidebar-Bar-Title'
				);
				assert.equal(
					'Shabby Chic Dreamcatcher',
					titleWrapper.text(),
					'must render title from composed children'
				);
			});
		});

		describe('Primary', () => {
			it('should render children passed in', () => {
				const wrapper = shallow(
					<Sidebar>
						<Sidebar.Primary>You probably havent heard of them</Sidebar.Primary>
					</Sidebar>
				);

				const primaryWrapper = wrapper.find(
					'.lucid-Sidebar > .lucid-Sidebar-Primary'
				);
				assert.equal(
					'You probably havent heard of them',
					primaryWrapper.children().text(),
					'must render content in the primary section'
				);
			});
		});

		describe('Title', () => {
			it('should render children passed in', () => {
				const wrapper = shallow(
					<Sidebar>
						<Sidebar.Title>Roof Party Green Juice Mustache</Sidebar.Title>
					</Sidebar>
				);

				const titleWrapper = wrapper.find(
					'.lucid-Sidebar > .lucid-Sidebar-Bar > .lucid-Sidebar-Bar-header > .lucid-Sidebar-Bar-Title'
				);
				assert.equal(
					'Roof Party Green Juice Mustache',
					titleWrapper.text(),
					'must render title from composed children'
				);
			});
		});
	});
});
