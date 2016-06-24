import React from 'react';
import assert from 'assert';
import { common } from '../../util/generic-tests';
import { shallow } from 'enzyme';
import Validation from './Validation';

describe('Validation', () => {

	common(Validation);

	describe('render', () => {
		it('should render children', () => {
			const content = <div>foo</div>;
			const wrapper = shallow(
				<Validation>{content}</Validation>
			);
			assert(wrapper.children().first().equals(content));
		});
	});

	describe('props', () => {

		describe('Error', () => {

			let wrapper;

			beforeEach(() => wrapper = shallow(
				<Validation Error='error'>
					<div>foo</div>
				</Validation>
			));

			it('should add error class', () => {
				assert(wrapper.hasClass('lucid-Validation-is-error'));
			});

			it('should add error content', () => {
				assert.equal(wrapper.find('.lucid-Validation-error-content').text(), 'error');
			});

		});

		describe('null Error', () => {

			let wrapper;

			beforeEach(() => wrapper = shallow(
				<Validation Error={null}>
					<div>foo</div>
				</Validation>
			));

			it('should not add error class', () => {
				assert(!wrapper.hasClass('lucid-Validation-is-error'));
			});

			it('should not add error content', () => {
				assert.equal(wrapper.find('.lucid-Validation-error-content').length, 0);
			});

		});

	});

});
