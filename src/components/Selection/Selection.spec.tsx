import React from 'react';
import { shallow } from 'enzyme';
import { common } from '../../util/generic-tests';
import Selection from './Selection';

describe('Selection', () => {
	common(Selection);

	describe('render', () => {
		it('should match snapshot for responsiveMode small', () => {
			const wrapper = shallow(
				<Selection responsiveMode='small'>Yolo</Selection>
			);

			expect(wrapper).toMatchSnapshot();
		});

		it('should match snapshot for container', () => {
			expect(
				shallow(<Selection kind='container'>cont</Selection>)
			).toMatchSnapshot();
		});

		it('should match snapshot for success', () => {
			expect(
				shallow(<Selection kind='success'>cont</Selection>)
			).toMatchSnapshot();
		});

		it('should match snapshot for danger', () => {
			expect(
				shallow(<Selection kind='danger'>cont</Selection>)
			).toMatchSnapshot();
		});

		it('should match snapshot for info', () => {
			expect(
				shallow(<Selection kind='info'>cont</Selection>)
			).toMatchSnapshot();
		});

		it('should match snapshot for warning', () => {
			expect(
				shallow(<Selection kind='warning'>cont</Selection>)
			).toMatchSnapshot();
		});

		it('should match snapshot for non removable', () => {
			expect(shallow(<Selection isRemovable={false} />)).toMatchSnapshot();
		});

		it('should match snapshot for nested selections', () => {
			const wrapper = shallow(
				<Selection>
					Hello
					<Selection>There</Selection>
				</Selection>
			);

			expect(wrapper).toMatchSnapshot();
		});

		it('should match snapshot for custom icons', () => {
			const wrapper = shallow(
				<Selection>
					<Selection.Icon>
						<div className='fake-icon' />
					</Selection.Icon>
				</Selection>
			);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('props', () => {
		it('onRemove', () => {
			const onRemove = jest.fn();
			const wrapper: any = shallow(<Selection onRemove={onRemove} />);

			wrapper.find('CloseIcon').prop('onClick')({});
			expect(onRemove).toHaveBeenCalled();
		});
	});
});
