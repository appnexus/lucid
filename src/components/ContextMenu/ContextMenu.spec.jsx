import _ from 'lodash';
import React from 'react';
import assert from 'assert';
import sinon from 'sinon';
import { common } from '../../util/generic-tests';
import { mount } from 'enzyme';

import ContextMenu from './ContextMenu';

describe('ContextMenu', () => {
	common(ContextMenu, {
		exemptFunctionProps: ['getAlignmentOffset'],
		getDefaultProps: () => ({
			children: [
				(<ContextMenu.Target>Test</ContextMenu.Target>),
				(<ContextMenu.FlyOut>Menu</ContextMenu.FlyOut>),
			],
		}),
	});

	describe('props', () => {
		let wrapper;

		afterEach(() => {
			if (wrapper) {
				wrapper.unmount();
			}
		});

		describe('isExpanded', () => {
			it('should not render the flyout when false', () => {
				wrapper = mount(
					<ContextMenu portalId='ContextMenu-test123' isExpanded={false}>
						<ContextMenu.Target>
							File
						</ContextMenu.Target>
						<ContextMenu.FlyOut>
							Open
						</ContextMenu.FlyOut>
					</ContextMenu>
				);

				assert.equal(document.getElementById('ContextMenu-test123'), null);
			});

			it('should render the flyout when true', () => {
				wrapper = mount(
					<ContextMenu portalId='ContextMenu-test123' isExpanded>
						<ContextMenu.Target>
							File
						</ContextMenu.Target>
						<ContextMenu.FlyOut>
							Open
						</ContextMenu.FlyOut>
					</ContextMenu>
				);

				assert.equal(document.getElementById('ContextMenu-test123').textContent, 'Open');
			});

			it('should render the flyout with opacity 0 on initial render', () => {
				wrapper = mount(
					<ContextMenu portalId='ContextMenu-test456' isExpanded>
						<ContextMenu.Target>
							File
						</ContextMenu.Target>
						<ContextMenu.FlyOut>
							Open
						</ContextMenu.FlyOut>
					</ContextMenu>
				);
				const flyout = _.first(document.getElementById('ContextMenu-test456').children);
				assert(_.isEmpty(flyout.style.opacity));
			});

			it('should render the flyout with opacity 1 on subsequent render', (done) => {
				wrapper = mount(
					<ContextMenu portalId='ContextMenu-test456' isExpanded>
						<ContextMenu.Target>
							File
						</ContextMenu.Target>
						<ContextMenu.FlyOut>
							Open
						</ContextMenu.FlyOut>
					</ContextMenu>
				);
				const flyout = _.first(document.getElementById('ContextMenu-test456').children);
				_.defer(() => {
					assert.equal(flyout.style.opacity, 1);
					done();
				});
			});
		});

		describe('direction', () => {
			_.forEach(['up', 'down', 'left', 'right'], (direction) => {
				it(`should apply the 'lucid-ContextMenu-FlyOut-${direction}' className when '${direction}'`, () => {
					wrapper = mount(
						<ContextMenu portalId='ContextMenu-test123' isExpanded direction={direction}>
							<ContextMenu.Target>
								File
							</ContextMenu.Target>
							<ContextMenu.FlyOut>
								Open
							</ContextMenu.FlyOut>
						</ContextMenu>
					);

					const flyOutPortalDomNode = document.getElementById('ContextMenu-test123');

					assert(flyOutPortalDomNode.querySelector(`.lucid-ContextMenu-FlyOut-${direction}`));
				});
			});

		});

		describe('portalId', () => {
			it('should render the portal with the given id when expanded', () => {
				wrapper = mount(
					<ContextMenu portalId='ContextMenu-test123' isExpanded>
						<ContextMenu.Target>
							File
						</ContextMenu.Target>
						<ContextMenu.FlyOut>
							Open
						</ContextMenu.FlyOut>
					</ContextMenu>
				);

				assert(document.getElementById('ContextMenu-test123'));
			});

			it('should render the portal with a generated id when expanded', () => {
				wrapper = mount(
					<ContextMenu isExpanded>
						<ContextMenu.Target>
							File
						</ContextMenu.Target>
						<ContextMenu.FlyOut>
							Open
						</ContextMenu.FlyOut>
					</ContextMenu>
				);

				const portalDomNode = document.body.querySelector('.lucid-Portal');
				assert(portalDomNode.parentNode.getAttribute('id'));
			});
		});

		describe('onClickOut', () => {
			let onClickOut;
			let testSection;

			beforeEach(() => {
				onClickOut = sinon.spy();
				testSection = document.createElement('section');
				document.body.appendChild(testSection);
			});

			afterEach(() => {
				testSection.parentNode.removeChild(testSection);
			});

			it('should not be called when click happens within component', () => {
				wrapper = mount(
					<ContextMenu isExpanded={true} onClickOut={onClickOut}>
						<ContextMenu.Target>
							File
						</ContextMenu.Target>
						<ContextMenu.FlyOut>
							Open
						</ContextMenu.FlyOut>
					</ContextMenu>
				, { attachTo: testSection });

				testSection.querySelector('.lucid-ContextMenu').click();
				document.body.querySelector('.lucid-ContextMenu-FlyOut').click();

				assert(onClickOut.notCalled);
			});

			it('should not be called when not expanded and click happens outside of the component', () => {
				wrapper = mount(
					<ContextMenu isExpanded={false} onClickOut={onClickOut}>
						<ContextMenu.Target>
							File
						</ContextMenu.Target>
						<ContextMenu.FlyOut>
							Open
						</ContextMenu.FlyOut>
					</ContextMenu>
				);

				document.body.click();

				assert(onClickOut.notCalled);
			});

			it('should be called when expanded and click happens outside of the component', () => {
				wrapper = mount(
					<ContextMenu isExpanded onClickOut={onClickOut}>
						<ContextMenu.Target>
							File
						</ContextMenu.Target>
						<ContextMenu.FlyOut>
							Open
						</ContextMenu.FlyOut>
					</ContextMenu>
				);

				document.body.click();

				assert(onClickOut.called);
			});
		});
	});
});
