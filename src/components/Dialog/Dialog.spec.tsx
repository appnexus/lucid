import React from 'react';
import { mount, shallow } from 'enzyme';
import { common, functionalComponents } from '../../util/generic-tests';
import assert from 'assert';
import _, { keys, forEach, includes, noop } from 'lodash';

import Dialog from './Dialog';
import Overlay from '../Overlay/Overlay';

describe('Dialog', () => {
	common(Dialog, {
		getDefaultProps: () => {
			return { isShown: true };
		},
		selectRoot: ((wrapper: any) => wrapper.find('.lucid-Dialog')) as any,
		exemptFunctionProps: ['handleClose'],
	});

	functionalComponents(Dialog);

	it('should render a Header', () => {
		const wrapper = shallow(
			<Dialog isShown={true}>
				<Dialog.Header>Mobius</Dialog.Header>
			</Dialog>
		);

		expect(
			wrapper.find('.lucid-Dialog-header').text().startsWith('Mobius')
		).toBe(true);
	});

	it('should render a Footer', () => {
		const wrapper = shallow(
			<Dialog isShown={true}>
				<Dialog.Footer>Groober</Dialog.Footer>
			</Dialog>
		);

		expect(wrapper.find('.lucid-Dialog-footer').text()).toBe('Groober');
	});

	it('should not render a Footer', () => {
		const wrapper = shallow(<Dialog isShown={true} />);

		expect(wrapper.contains('.lucid-Dialog-footer')).toBe(false);
	});

	it('should render body content', () => {
		const wrapper = shallow(<Dialog isShown={true}>Flux Capacitor</Dialog>);

		assert.equal(wrapper.find('.lucid-Dialog-body').text(), 'Flux Capacitor');
	});

	describe('props', () => {
		it('should respect size = "small"', () => {
			const wrapper = shallow(<Dialog isShown={true} size='small' />);

			assert.equal(wrapper.find('.lucid-Dialog-window-is-small').length, 1);
		});

		it('should respect size = "medium"', () => {
			const wrapper = shallow(<Dialog isShown={true} size='medium' />);

			assert.equal(wrapper.find('.lucid-Dialog-window-is-medium').length, 1);
		});

		it('should respect size = "large"', () => {
			const wrapper = shallow(<Dialog isShown={true} size='large' />);

			assert.equal(wrapper.find('.lucid-Dialog-window-is-large').length, 1);
		});

		it('should pass `isModal` to underlying Overlay', () => {
			const wrapper = shallow(<Dialog isModal={false} />);

			assert.equal(wrapper.find(Overlay).prop('isModal'), false);
		});

		it('should render when `isShown` is true', () => {
			const wrapper = mount(
				<Dialog isShown={true}>
					<div id='holler'>bro</div>
				</Dialog>
			);

			assert.equal(document.querySelectorAll('#holler').length, 1);
			wrapper.unmount();
		});

		it('should not render when `isShown` is false', () => {
			const wrapper = mount(
				<Dialog isShown={false}>
					<div id='flux'>Flux Capacitor</div>
				</Dialog>
			);

			assert.equal(document.querySelectorAll('#flux').length, 0);
			wrapper.unmount();
		});

		describe('pass throughs', () => {
			let wrapper: any;
			const defaultProps = Dialog.defaultProps;

			describe('passthroughs', () => {
				beforeEach(() => {
					const props = {
						...defaultProps,
						handleClose: noop,
						Header: <i>Rich Header</i>,
						Footer: <span>Rich Footer</span>,
						initialState: { testData: true },
						callbackId: 1,
						'data-testid': 10,
					};

					wrapper = shallow(<Dialog {...props} />);
				});

				afterEach(() => {
					wrapper.unmount();
				});

				it('passes through some select props to the root section element', () => {
					const rootProps = keys(wrapper.first().props());

					// The root Overlay element should contain 'className', 'children', and 'callbackId'
					forEach(
						['className', 'children', 'callbackId', 'data-testid'],
						(prop) => {
							expect(includes(rootProps, prop)).toBe(true);
						}
					);

					// it should also pick any Overlay props, including the defaults
					// and pass them through to the root element
					forEach(
						[
							'isAnimated',
							'isShown',
							'isModal',
							'onEscape',
							'onBackgroundClick',
						],
						(prop) => {
							expect(includes(rootProps, prop)).toBe(true);
						}
					);
				});

				it('omits some props from the root section element', () => {
					const rootProps = keys(wrapper.first().props());

					// It should not pass 'initialState' or
					// any of the DateSelect prop types to the root element
					// Note that className and isShown are omitted as a pass through,
					// but are also directly applied to the Overlay root element, so still should appear
					forEach(
						[
							'initialState',
							'size',
							'handleClose',
							'isComplex',
							'hasGutters',
							'Header',
							'Footer',
						],
						(prop) => {
							expect(includes(rootProps, prop)).toBe(false);
						}
					);
				});
			});
		});
	});
});
