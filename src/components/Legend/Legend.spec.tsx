import React from 'react';
import { common } from '../../util/generic-tests';
import { shallow } from 'enzyme';
import assert from 'assert';
import Point from '../Point/Point';
import Line from '../Line/Line';
import Legend from './Legend';

const { Item } = Legend;

describe('Legend', () => {
	common(Legend);

	describe('render', () => {
		it('should render a legend', () => {
			const wrapper = shallow(<Legend />);

			assert.strictEqual(
				wrapper.find('.lucid-Legend').length,
				1,
				'missing legend'
			);
		});
	});

	describe('props', () => {
		describe('orient', () => {
			it('should add the correct class for horizontal', () => {
				const wrapper = shallow(<Legend orient='horizontal' />);

				assert.strictEqual(
					wrapper.find('.lucid-Legend-is-horizontal').length,
					1,
					'missing class'
				);
			});

			it('should add the correct class for vertical', () => {
				const wrapper = shallow(<Legend orient='vertical' />);

				assert.strictEqual(
					wrapper.find('.lucid-Legend-is-vertical').length,
					1,
					'missing class'
				);
			});
		});
	});

	describe('child components', () => {
		describe('Item', () => {
			it('should not render an svg when no line or point', () => {
				const wrapper = shallow(
					<Legend>
						<Item />
					</Legend>
				);

				assert.strictEqual(wrapper.find('svg').length, 0);
			});

			it('should set the correct width when vertical and there are some lines', () => {
				const wrapper = shallow(
					<Legend orient='vertical'>
						<Item hasPoint />
						<Item hasLine />
					</Legend>
				);

				assert.strictEqual(
					wrapper.find('.lucid-Legend-Item-indicator').at(0).prop('width'),
					22
				);
				assert.strictEqual(
					wrapper.find('.lucid-Legend-Item-indicator').at(1).prop('width'),
					22
				);

				assert.strictEqual(wrapper.find(Point).prop('x'), 11);
				assert.strictEqual(wrapper.find(Line).prop('d'), 'M0,6 L22,6');
			});

			it('should set the correct width when there are only points', () => {
				const wrapper = shallow(
					<Legend>
						<Item hasPoint />
						<Item hasPoint />
					</Legend>
				);

				assert.strictEqual(
					wrapper.find('.lucid-Legend-Item-indicator').at(0).prop('width'),
					12
				);
				assert.strictEqual(
					wrapper.find('.lucid-Legend-Item-indicator').at(1).prop('width'),
					12
				);
			});

			it('should render items with text in them', () => {
				const wrapper = shallow(
					<Legend>
						<Item>Foo</Item>
						<Item>Bar</Item>
					</Legend>
				);

				assert.strictEqual(
					wrapper.find('.lucid-Legend-Item').at(0).text(),
					'Foo',
					'wrong text content found'
				);
				assert.strictEqual(
					wrapper.find('.lucid-Legend-Item').at(1).text(),
					'Bar',
					'wrong text content found'
				);
			});

			it('should handle the `hasLine` prop', () => {
				const wrapper = shallow(
					<Legend>
						<Item hasLine />
					</Legend>
				);

				assert.strictEqual(wrapper.find(Line).length, 1, 'did not find a Line');
			});

			it('should handle the `hasPoint` prop', () => {
				const wrapper = shallow(
					<Legend>
						<Item hasPoint />
					</Legend>
				);

				assert.strictEqual(
					wrapper.find(Point).length,
					1,
					'did not find a Point'
				);
			});

			it('should handle the `color` prop by passing through to Line and Point', () => {
				const wrapper = shallow(
					<Legend>
						<Item color={'fooest thou bar'} hasPoint hasLine />
					</Legend>
				);

				assert.strictEqual(
					wrapper.find(Line).prop('color'),
					'fooest thou bar',
					'wrong or missing `color` prop on Line'
				);
				assert.strictEqual(
					wrapper.find(Point).prop('color'),
					'fooest thou bar',
					'wrong or missing `color` prop on Point'
				);
			});

			it('should handle the `pointKind` prop by passing through to Point', () => {
				const wrapper = shallow(
					<Legend>
						<Item hasPoint pointKind={5} />
					</Legend>
				);

				assert.strictEqual(
					wrapper.find(Point).prop('kind'),
					5,
					'wrong or missing `kind` prop on Point'
				);
			});
		});
	});
});
