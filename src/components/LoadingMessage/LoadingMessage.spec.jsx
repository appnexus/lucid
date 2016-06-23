import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../util/generic-tests';
import LoadingMessage from './LoadingMessage';
import LoadingIcon from '../Icon/LoadingIcon/LoadingIcon';
import SuccessIcon from '../Icon/SuccessIcon/SuccessIcon';

const {
	Icon,
	Title,
	Body,
} = LoadingMessage;

describe('LoadingMessage', () => {
	common(LoadingMessage);

	describe('default', () => {

		let wrapper;

		beforeEach(() => wrapper = shallow(<LoadingMessage />));

		it('should render a LoadingIcon', () => {
			assert.equal(wrapper.find(LoadingIcon).length, 1, 'must render loading icon');
		});

		it('should render "Loading" as the title', () => {
			assert.equal((wrapper.find('.lucid-LoadingMessage-title').text()), 'Loading');
		});

		it('should not render a body', () => {
			assert.equal(wrapper.find('.lucid-LoadingMessage-body').length, 0);
		});

		it('should not have `&-no-content` class', () => {
			assert(!wrapper.hasClass('lucid-LoadingMessage-no-content'));
		});

	});

	describe('custom icon', () => {

		it('should render the custom icon', () => {
			const wrapper = shallow(
				<LoadingMessage>
					<Icon><SuccessIcon/></Icon>
				</LoadingMessage>
			);
			assert.equal(wrapper.find(SuccessIcon).length, 1);
		});

		it('should render the custom icon', () => {
			const wrapper = shallow(
				<LoadingMessage Icon={<SuccessIcon/>}/>
			);
			assert.equal(wrapper.find(SuccessIcon).length, 1);
		})

	});

	describe('custom title', () => {

		it('should render the custom title', () => {
			const wrapper = shallow(
				<LoadingMessage>
					<Title>A custom title</Title>
				</LoadingMessage>
			);
			assert.equal(wrapper.find('.lucid-LoadingMessage-title').text(), 'A custom title');
		});

		it('should render the custom title', () => {
			const wrapper = shallow(
				<LoadingMessage Title='A custom title' />
			);
			assert.equal(wrapper.find('.lucid-LoadingMessage-title').text(), 'A custom title');
		});

	});

	describe('custom body', () => {

		it('should render the custom body', () => {
			const wrapper = shallow(
				<LoadingMessage>
					<Body>A custom body</Body>
				</LoadingMessage>
			);
			assert.equal(wrapper.find('.lucid-LoadingMessage-body').text(), 'A custom body');
		});

		it('should render the custom body', () => {
			const wrapper = shallow(
				<LoadingMessage Body='A custom body' />
			);
			assert.equal(wrapper.find('.lucid-LoadingMessage-body').text(), 'A custom body');
		});

	});

	describe('no title', () => {

		let wrapper;

		beforeEach(() => wrapper = shallow(<LoadingMessage Title={null}/>));

		it('should render a LoadingIcon', () => {
			assert.equal(wrapper.find(LoadingIcon).length, 1, 'must render loading icon');
		});

		it('should not render a title', () => {
			assert.equal(wrapper.find('.lucid-LoadingMessage-title').length, 0);
		});

		it('should add `&-no-content` class', () => {
			assert(wrapper.hasClass('lucid-LoadingMessage-no-content'));
		});

	});

});
