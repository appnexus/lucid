import _ from 'lodash';
import React from 'react';
import assert from 'assert';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { common } from '../../util/generic-tests';
import ToolTip from './ToolTip';
import ContextMenu from '../ContextMenu/ContextMenu';
import CrossIcon from '../Icon/CrossIcon/CrossIcon';

const {
	Target,
	Title,
	Body,
} = ToolTip;

describe('ToolTip', () => {
	common(ToolTip);

	describe('render', () => {
		it('should render a ContextMenu', () => {
			const wrapper = shallow(
				<ToolTip>
					<Target>ToolTip Target</Target>
					<Title>Title</Title>
					<Body>Body</Body>
				</ToolTip>
			);

			assert.equal(wrapper.find(ContextMenu).length, 1);
		});
	});

	describe('props', () => {
		describe('children', () => {
			it('should not render any direct child elements which are not ToolTip-specific', () => {
				const wrapper = shallow(
					<ToolTip>
						<button>button</button>
						<Target>ToolTip Target</Target>
						<Title>Title</Title>
						<Body>Body</Body>
						<h1>header</h1>
					</ToolTip>
				);
				assert.equal(wrapper.find('button').length, 0, 'must not render button');
				assert.equal(wrapper.find('h1').length, 0, 'must not render h1');
			});
		});

		describe('className', () => {
			describe('FlyOut', () => {
				let wrapper;

				afterEach(() => {
					if (wrapper) {
						wrapper.unmount();
					}
				});

				it('should pass the className prop thru to the FlyOut (portal) element', () => {
					wrapper = mount(
						<ToolTip isExpanded className='MyToolTip'>
							<Target>Target</Target>
							<Body>Body</Body>
						</ToolTip>
					);

					const flyOutClassName = document.querySelector('.lucid-ToolTip-FlyOut.lucid-ContextMenu-FlyOut').className;

					assert(_.includes(flyOutClassName, 'MyToolTip'), 'must include `MyToolTip`');
				});
			});
		});

		describe('isCloseable', () => {
			describe('true', () => {
				it('should render a `CrossIcon`', () => {
					const wrapper = shallow(
						<ToolTip isExpanded isCloseable>
							<Target>Target</Target>
							<Body>Body</Body>
						</ToolTip>
					);
					assert.equal(wrapper.find(CrossIcon).length, 1 ,'must include a CrossIcon');
				});
			});
			describe('false', () => {
				it('should not render a `CrossIcon`', () => {
					const wrapper = shallow(
						<ToolTip isExpanded>
							<Target>Target</Target>
							<Body>Body</Body>
						</ToolTip>
					);
					assert.equal(wrapper.find(CrossIcon).length, 0 ,'must not include a CrossIcon');
				});
			});
		});

		describe('flyOutStyle', () => {
			it('should pass flyOutStyle to the underlying ContextMenu FlyOut with a default maxWidth', () => {
				const wrapper = shallow(
					<ToolTip isExpanded flyOutStyle={{ flex: 2 }}>
						<Target>Target</Target>
						<Body>Body</Body>
					</ToolTip>
				);
				const flyOutStyle = wrapper.find(ContextMenu.FlyOut).prop('style');
				assert.deepEqual(flyOutStyle, { flex: 2, maxWidth: 200 }, 'must have flex:2 and maxWidth: 200');
			});
		});

		describe('flyOutMaxWidth', () => {
			it('should pass maxWidth to the underlying ContextMenu FlyOut style', () => {
				const wrapper = shallow(
					<ToolTip isExpanded flyOutMaxWidth={100} flyOutStyle={{ flex: 2, maxWidth: 200 }}>
						<Target>Target</Target>
						<Body>Body</Body>
					</ToolTip>
				);
				const flyOutStyle = wrapper.find(ContextMenu.FlyOut).prop('style');
				assert.deepEqual(flyOutStyle, { flex: 2, maxWidth: 100 }, 'must have flex:2 and maxWidth: 400');
			});
		});

		describe('kind', () => {
			it('should pass the correct className to the Flyout', () => {
				const wrapper = shallow(
					<ToolTip isExpanded kind='primary'>
						<Target>Target</Target>
						<Body>Body</Body>
					</ToolTip>
				);
				const className = wrapper.find(ContextMenu.FlyOut).prop('className');
				assert(_.includes(className, 'lucid-ToolTip-FlyOut-primary'), 'must include className');
			});
		});

		describe('direction', () => {
			it('should pass direction to the underlying ContextMenu', () => {
				const wrapper = shallow(
					<ToolTip isExpanded direction='right'>
						<Target>Target</Target>
						<Body>Body</Body>
					</ToolTip>
				);
				assert.equal(wrapper.find(ContextMenu).prop('direction'), 'right', 'must be "right"');
			});
		});

		describe('alignment', () => {

			it('should pass alignment center to the underlying ContextMenu', () => {
				const wrapper = shallow(
					<ToolTip isExpanded alignment='start'>
						<Target>Target</Target>
						<Body>Body</Body>
					</ToolTip>
				);
				assert.equal(wrapper.find(ContextMenu).prop('alignment'), 'center', 'must be "center"');
			});

			describe('center', () => {
				it('should pass getAlignmentOffset with correct closed over values', () => {
					const wrapper = shallow(
						<ToolTip isExpanded alignment='center'>
							<Target>Target</Target>
							<Body>Body</Body>
						</ToolTip>
					);
					const getAlignmentOffset = wrapper.find(ContextMenu).prop('getAlignmentOffset');
					assert.equal(getAlignmentOffset(400), 0, 'must be 0');
				});
			});

			describe('start', () => {
				it('should pass getAlignmentOffset with correct closed over values', () => {
					const wrapper = shallow(
						<ToolTip isExpanded alignment='start'>
							<Target>Target</Target>
							<Body>Body</Body>
						</ToolTip>
					);
					const getAlignmentOffset = wrapper.find(ContextMenu).prop('getAlignmentOffset');
					assert.equal(getAlignmentOffset(400), 177.5, 'must be 177.5');
				});
			});

			describe('end', () => {
				it('should pass getAlignmentOffset with correct closed over values', () => {
					const wrapper = shallow(
						<ToolTip isExpanded alignment='end'>
							<Target>Target</Target>
							<Body>Body</Body>
						</ToolTip>
					);
					const getAlignmentOffset = wrapper.find(ContextMenu).prop('getAlignmentOffset');
					assert.equal(getAlignmentOffset(400), -177.5, 'must be -177.5');
				});
			});

		});

		describe('isExpanded', () => {
			it('should pass isExpanded=true to the underlying ContextMenu component thru props', () => {
				const wrapper = shallow(
					<ToolTip isExpanded>
						<Target>Target</Target>
						<Body>Body</Body>
					</ToolTip>
				);
				assert(wrapper.find(ContextMenu).prop('isExpanded'), 'isExpanded must be true')
			});

			it('should be false by default', () => {
				const wrapper = shallow(
					<ToolTip>
						<Target>Target</Target>
						<Body>Body</Body>
					</ToolTip>
				);
				assert(!wrapper.find(ContextMenu).prop('isExpanded'), 'isExpanded must be false')
			});
		});

		describe('onMouseOver', () => {
			it('should call onMouseOver on target mouseover', () => {
				const spy = sinon.spy();
				const wrapper = shallow(
					<ToolTip onMouseOver={spy}>
						<Target>Target</Target>
						<Body>Body</Body>
					</ToolTip>
				);
				wrapper.find(ContextMenu).shallow().find('span').simulate('mouseOver');
				assert(spy.calledOnce, 'onMouseOver must be called once');
			});
		});

		describe('onMouseOut', () => {
			it('should call onMouseOut when cursor leaves target', done => {
				const spy = sinon.spy();
				const wrapper = shallow(
					<ToolTip onMouseOut={spy}>
						<Target>Target</Target>
						<Body>Body</Body>
					</ToolTip>
				);
				const root = wrapper.find('ContextMenu').shallow().find('span');
				root.simulate('mouseOver');
				root.simulate('mouseOut');
				// wait for timeout
				_.delay(() => {
					assert(spy.calledOnce, 'onMouseOut must be called once');
					done();
				}, 100);
			});

			it('should not call onMouseOut if cursor enters FlyOut', done => {
				const spy = sinon.spy();
				const wrapper = shallow(
					<ToolTip isExpanded onMouseOut={spy}>
						<Target>Target</Target>
						<Body>Body</Body>
					</ToolTip>
				);
				const root = wrapper.find(ContextMenu).shallow().find('span');
				root.simulate('mouseOver');
				// simulate click hover over FlyOut Portal
				wrapper.find(ContextMenu.FlyOut).prop('onMouseOver')();
				root.simulate('mouseOut');
				// wait for timeout
				_.delay(() => {
					assert(!spy.called, 'onMouseOut must not be called');
					done();
				}, 100);
			});

		});

		describe('portalId', () => {
			it('should pass portalId to underlying ContextMenu', () => {
				const wrapper = shallow(
					<ToolTip portalId='foo-portal-id'>
						<Target>Target</Target>
						<Body>Body</Body>
					</ToolTip>
				);
				assert.equal(wrapper.find(ContextMenu).prop('portalId'), 'foo-portal-id', 'must equal "foo-portal-id"');
			});
		});

	});

});
