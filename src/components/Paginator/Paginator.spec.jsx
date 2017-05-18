import React from 'react';
import { mount, shallow } from 'enzyme';
import assert from 'assert';
import sinon from 'sinon';
import _ from 'lodash';
import { common } from '../../util/generic-tests';
import { buildHybridComponent } from '../../util/state-management';
import { SingleSelectDumb as SingleSelect } from '../SingleSelect/SingleSelect';
import { PaginatorDumb as Paginator } from './Paginator';
import Button from '../Button/Button';
import TextField from '../TextField/TextField';

describe('Paginator', () => {
	common(Paginator);

	describe('render', () => {
		describe('hasPageSizeSelector', () => {
			it('should not render page size selector', () => {
				const wrapper = shallow(<Paginator />);
				assert(
					!wrapper.find('.lucid-Paginator-page-size-container').exists(),
					'must be true'
				);
			});
			it('should render page size selector', () => {
				const wrapper = shallow(<Paginator hasPageSizeSelector />);
				assert.equal(
					wrapper.find('.lucid-Paginator-page-size-container').length,
					1,
					'must be 1'
				);
			});
			it('should render a TextField', () => {
				const wrapper = shallow(<Paginator />);
				assert.equal(wrapper.find(TextField).length, 1, 'must be 1');
			});
			it('should render two buttons', () => {
				const wrapper = shallow(<Paginator />);
				assert.equal(wrapper.find(Button).length, 2, 'must be 2');
			});
		});
	});

	describe('props', () => {
		describe('isDisabled', () => {
			it('should set isDisabled on next and previous buttons', () => {
				const wrapper = shallow(
					<Paginator selectedPageIndex={1} totalCount={30} isDisabled />
				);
				const buttons = wrapper.find(Button);
				buttons.forEach(button => {
					assert(button.prop('isDisabled'), 'must be true');
				});
			});

			it('should set isDisabled on page size selector SingleSelect', () => {
				const wrapper = shallow(
					<Paginator
						hasPageSizeSelector
						selectedPageIndex={1}
						totalCount={30}
						isDisabled
					/>
				);
				const pageSizeSelectorWrapper = wrapper
					.find('.lucid-Paginator-page-size-container')
					.first()
					.shallow()
					.find(SingleSelect)
					.shallow();
				assert(pageSizeSelectorWrapper.prop('isDisabled'), 'must be true');
			});
		});

		describe('selectedPageIndex', () => {
			it('should set the value of the TextField to selectedPageIndex + 1', () => {
				const wrapper = shallow(<Paginator selectedPageIndex={1} />);
				const textFieldWrapper = wrapper.find(TextField).first().shallow();
				assert.equal(textFieldWrapper.prop('value'), 2, 'must be 2');
			});
		});

		describe('selectedPageSizeIndex', () => {
			it('should propagate to page size selector selectedIndex prop', () => {
				const selectedPageSizeIndex = 1;
				const wrapper = shallow(
					<Paginator
						hasPageSizeSelector
						selectedPageSizeIndex={selectedPageSizeIndex}
					/>
				);
				const pageSizeSelectorWrapper = wrapper
					.find('.lucid-Paginator-page-size-container')
					.first()
					.shallow()
					.find(SingleSelect);
				assert.equal(
					pageSizeSelectorWrapper.prop('selectedIndex'),
					selectedPageSizeIndex,
					'must be 1'
				);
			});
		});

		describe('SingleSelect', () => {
			it('should propagate SingleSelect props through to SingleSelect component', () => {
				const explicitSingleSelectProps = {
					menuMaxHeight: 3,
					DropMenu: {},
				};

				const wrapper = shallow(
					<Paginator
						hasPageSizeSelector
						SingleSelect={explicitSingleSelectProps}
					/>
				);
				const singleSelectProps = wrapper
					.find('.lucid-Paginator-page-size-container')
					.first()
					.shallow()
					.find(SingleSelect)
					.props();

				_.forEach(explicitSingleSelectProps, (prop, name) => {
					assert.strictEqual(singleSelectProps[name], prop);
				});
			});
		});

		describe('totalPages', () => {
			it('should appear in "of {totalPages}" span', () => {
				const totalPages = 5;
				const wrapper = shallow(<Paginator totalPages={totalPages} />);
				assert.equal(
					wrapper.find('span').text(),
					`of ${totalPages}`,
					'must be "of 5"'
				);
			});
		});

		describe('totalCount', () => {
			it('should generate `totalPages` from `totalCount`', () => {
				const HybridPaginator = buildHybridComponent(Paginator);
				const totalCount = 100;
				const wrapper = shallow(
					<HybridPaginator totalCount={totalCount} pageSizeOptions={[10]} />
				);
				assert.equal(
					wrapper.find(Paginator).shallow().find('span').text(),
					'of 10',
					'must be "of 10"'
				);
			});
		});

		describe('pageSizeOptions', () => {
			it('should propagate to `SingleSelect` as `SingleSelect.Option`s', () => {
				const pageSizeOptions = [1, 2, 3, 4, 5];
				const wrapper = shallow(
					<Paginator hasPageSizeSelector pageSizeOptions={pageSizeOptions} />
				);
				const options = wrapper
					.find('.lucid-Paginator-page-size-container')
					.first()
					.find(SingleSelect)
					.first()
					.children();

				assert.equal(options.length, 5, 'must be 5');
				options.forEach((option, i) => {
					assert(option.is(SingleSelect.Option), 'must be true');
					assert.equal(option.children().text(), pageSizeOptions[i]);
				});
			});
		});

		describe('TextField', () => {
			it('should propagate TextField props through to TextField component', () => {
				const explicitTextFieldProps = {
					style: {},
					isMultiline: true,
					rows: 2,
					className: 'foo',
					debounceLevel: 50,
				};

				const wrapper = shallow(
					<Paginator TextField={explicitTextFieldProps} />
				);
				const textFieldProps = wrapper.find(TextField).first().props();

				_.forEach(explicitTextFieldProps, (prop, name) => {
					assert.strictEqual(textFieldProps[name], prop);
				});
			});
		});

		describe('onPageSelect', () => {
			let wrapper;

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
			});

			describe('previous button', () => {
				it('should get called with the correct args when previous is clicked', () => {
					const onPageSelect = sinon.spy();
					wrapper = mount(
						<Paginator
							selectedPageIndex={1}
							totalPages={3}
							onPageSelect={onPageSelect}
						/>
					);
					wrapper.find('button').first().simulate('click');
					assert(onPageSelect.calledOnce);
					const [pageIndex, totalPages] = onPageSelect.firstCall.args;
					assert.equal(pageIndex, 0, 'must be 0');
					assert.equal(totalPages, 3, 'must be 3');
				});
			});

			describe('next button', () => {
				it('should get called with the correct args when next is clicked', () => {
					const onPageSelect = sinon.spy();
					wrapper = mount(
						<Paginator
							selectedPageIndex={1}
							totalPages={3}
							onPageSelect={onPageSelect}
						/>
					);
					wrapper.find('button').first().simulate('click');
					assert(onPageSelect.calledOnce);
					const [pageIndex, totalPages] = onPageSelect.firstCall.args;
					assert.equal(pageIndex, 0, 'must be 0');
					assert.equal(totalPages, 3, 'must be 3');
				});
			});

			describe('input', () => {
				_.forEach(['onBlur', 'onSubmit'], propName => {
					it(`should get called with the correct args ${propName}`, () => {
						const onPageSelect = sinon.spy();
						wrapper = mount(
							<Paginator
								selectedPageIndex={1}
								totalPages={3}
								onPageSelect={onPageSelect}
							/>
						);
						wrapper.find(TextField).prop(propName)(1, 3);
						assert(onPageSelect.calledOnce);
						const [pageIndex, totalPages] = onPageSelect.firstCall.args;
						assert.equal(pageIndex, 0, 'must be 0');
						assert.equal(totalPages, 3, 'must be 3');
					});
				});
			});
		});

		describe('onPageSizeSelect', () => {
			it('should be passed through to SingleSelect as `onSelect`', () => {
				const onPageSizeSelect = function() {};
				const wrapper = shallow(
					<Paginator hasPageSizeSelector onPageSizeSelect={onPageSizeSelect} />
				);
				assert.strictEqual(
					wrapper.find(SingleSelect).prop('onSelect'),
					onPageSizeSelect
				);
			});
		});
	});
});
