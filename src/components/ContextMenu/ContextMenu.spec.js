import React from 'react';
import assert from 'assert';
import sinon from 'sinon';
import describeWithDOM from '../../util/describe-with-dom';
import { common } from '../../util/generic-tests';
import { mount } from 'enzyme';

import ContextMenu from './ContextMenu';

describe('ContextMenu', () => {
	common(ContextMenu, {
		exemptFunctionProps: ['getAlignmentOffset'],
		getDefaultProps: () => ({
			children: [
				(<ContextMenu.Target>Test</ContextMenu.Target>),
				(<ContextMenu.FlyOut>Menu</ContextMenu.FlyOut>)
			]
		})
	});

	describeWithDOM('props', () => {
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
		});

		describe('direction', () => {
			it('should apply the `lucid-ContextMenu-FlyOut-Down` className when `down`', () => {
				wrapper = mount(
					<ContextMenu portalId='ContextMenu-test123' isExpanded direction='down'>
						<ContextMenu.Target>
							File
						</ContextMenu.Target>
						<ContextMenu.FlyOut>
							Open
						</ContextMenu.FlyOut>
					</ContextMenu>
				);

				const flyOutPortalDomNode = document.getElementById('ContextMenu-test123');

				assert(flyOutPortalDomNode.querySelector('.lucid-ContextMenu-FlyOut-Down'));
			});

			it('should apply the `lucid-ContextMenu-FlyOut-Up` className when `up`', () => {
				wrapper = mount(
					<ContextMenu portalId='ContextMenu-test123' isExpanded direction='up'>
						<ContextMenu.Target>
							File
						</ContextMenu.Target>
						<ContextMenu.FlyOut>
							Open
						</ContextMenu.FlyOut>
					</ContextMenu>
				);

				const flyOutPortalDomNode = document.getElementById('ContextMenu-test123');

				assert(flyOutPortalDomNode.querySelector('.lucid-ContextMenu-FlyOut-Up'));
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
