import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import _, { forEach, has } from 'lodash';

import { common } from '../../util/generic-tests';
import LoadingMessage from './LoadingMessage';
import LoadingIcon from '../Icon/LoadingIcon/LoadingIcon';
import SuccessIcon from '../Icon/SuccessIcon/SuccessIcon';

const { Icon, Title, Body } = LoadingMessage;

describe('LoadingMessage', () => {
	common(LoadingMessage);

	describe('render', () => {
		let wrapper: any;

		beforeEach(() => (wrapper = shallow(<LoadingMessage />)));

		it('should render a LoadingIcon', () => {
			assert.equal(
				wrapper.find(LoadingIcon).length,
				1,
				'must render loading icon'
			);
		});

		it('should render "Loading" as the title', () => {
			assert.equal(
				wrapper.find('.lucid-LoadingMessage-title').text(),
				'Loading'
			);
		});

		it('should not render a body', () => {
			assert.equal(wrapper.find('.lucid-LoadingMessage-body').length, 0);
		});

		it('should not have `&-no-content` class', () => {
			assert(!wrapper.hasClass('lucid-LoadingMessage-no-content'));
		});
	});

	describe('child components', () => {
		describe('Icon', () => {
			it('should render the custom icon', () => {
				const wrapper = shallow(
					<LoadingMessage>
						<Icon>
							<SuccessIcon />
						</Icon>
					</LoadingMessage>
				);
				assert.equal(wrapper.find(SuccessIcon).length, 1);
			});

			it('should render the custom icon', () => {
				const wrapper = shallow(<LoadingMessage Icon={<SuccessIcon />} />);
				assert.equal(wrapper.find(SuccessIcon).length, 1);
			});
		});

		describe('Title', () => {
			it('should render the custom title', () => {
				const wrapper = shallow(
					<LoadingMessage>
						<Title>A custom title</Title>
					</LoadingMessage>
				);
				assert.equal(
					wrapper.find('.lucid-LoadingMessage-title').text(),
					'A custom title'
				);
			});

			it('should render the custom title', () => {
				const wrapper = shallow(<LoadingMessage Title='A custom title' />);
				assert.equal(
					wrapper.find('.lucid-LoadingMessage-title').text(),
					'A custom title'
				);
			});

			describe('null', () => {
				let wrapper: any;

				beforeEach(() => (wrapper = shallow(<LoadingMessage Title={null} />)));

				it('should render a LoadingIcon', () => {
					assert.equal(
						wrapper.find(LoadingIcon).length,
						1,
						'must render loading icon'
					);
				});

				it('should not render a title', () => {
					assert.equal(wrapper.find('.lucid-LoadingMessage-title').length, 0);
				});

				it('should add `&-no-content` class', () => {
					assert(wrapper.hasClass('lucid-LoadingMessage-no-content'));
				});
			});
		});

		describe('Body', () => {
			it('should render the custom body', () => {
				const wrapper = shallow(
					<LoadingMessage>
						<Body>A custom body</Body>
					</LoadingMessage>
				);
				assert.equal(
					wrapper.find('.lucid-LoadingMessage-body').text(),
					'A custom body'
				);
			});

			it('should render the custom body', () => {
				const wrapper = shallow(<LoadingMessage Body='A custom body' />);
				assert.equal(
					wrapper.find('.lucid-LoadingMessage-body').text(),
					'A custom body'
				);
			});
		});
	});

	describe('pass throughs', () => {
		let wrapper: any;

		beforeEach(() => {
			const props = {
				className: 'wut',
				style: { marginRight: 10 },
				initialState: { test: true },
				callbackId: 1,
				'data-testid': 10,
				Icon: <SuccessIcon />,
				Title: 'Test Title',
				Body: 'Test Body',
			};
			wrapper = shallow(<LoadingMessage {...props} />);
		});

		afterEach(() => {
			wrapper.unmount();
		});

		it('passes through props not defined in `propTypes` to the root element.', () => {
			const rootProps = wrapper.find('.lucid-LoadingMessage').props();

			// Note: 'className' is plucked from the pass through object
			// but still appear becuase they are also directly passed to the root element as a prop.
			forEach(['className', 'style', 'data-testid', 'children'], (prop) => {
				expect(has(rootProps, prop)).toBe(true);
			});

			expect(wrapper.first().prop(['className'])).toContain('wut');
			expect(wrapper.first().prop(['style'])).toMatchObject({
				marginRight: 10,
			});
			expect(wrapper.first().prop(['data-testid'])).toBe(10);
		});

		it('omits the props defined in `propTypes` from the root element, plus, in addition, `initialState and callbackId`.', () => {
			const rootProps = wrapper.find('.lucid-LoadingMessage').props();

			// initialState and callbackId are always both omitted
			forEach(
				['Icon', 'Title', 'Body', 'initialState', 'callbackId'],
				(prop) => {
					expect(has(rootProps, prop)).toBe(false);
				}
			);
		});
	});
});
