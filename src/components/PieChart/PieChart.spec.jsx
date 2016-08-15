import _ from 'lodash';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { common } from '../../util/generic-tests';
import assert from 'assert';
import sinon from 'sinon';

import PieChart from './PieChart';
import Line from '../Line/Line';
import ToolTip from '../ToolTip/ToolTip';

const sampleData = [
	{ x: 'One'   , y: 30 } ,
	{ x: 'Two'   , y: 20 } ,
	{ x: 'Three' , y: 50 } ,
];

describe('PieChart', () => {
	common(PieChart, {
		exemptFunctionProps: [
			'xAxisFormatter',
			'yAxisFormatter',
		],
	});

	describe('render', () => {
		it('should render a basic chart', () => {
			const wrapper = shallow(
				<PieChart data={sampleData}/>
			);

			assert.equal(wrapper.find(Line).length, 3, 'missing Line\'s');
			assert.equal(wrapper.find('.lucid-PieChart-slice-hover').length, 3, 'missing the hover slices');
		});
	});

	describe('props', () => {
		it('height and width', () => {
			const wrapper = shallow(
				<PieChart height={150} width={250} />
			);

			const svg = wrapper.find('.lucid-PieChart');

			assert.equal(svg.prop('height'), 150);
			assert.equal(svg.prop('width'), 250);
		});

		describe('margin', () => {
			it('should merge margins and transform accordingly', () => {
				const wrapper = shallow(
					<PieChart
						data={sampleData}
						width={200}
						height={100}
						margin={{
							top: 50,
						}}
					/>
				);

				assert.equal(wrapper.find('g').at(0).prop('transform'), 'translate(10, 50)');
			});
		});

		describe('hasToolTips', () => {
			it('should set isExpanded on ToolTip when true and hovering', () => {
				const wrapper = shallow(
					<PieChart
						data={sampleData}
						hasToolTips
						isHovering
					/>
				);

				assert.equal(wrapper.find(ToolTip).prop('isExpanded'), true);
			});

			it('should not set isExpanded on ToolTip when not hovering', () => {
				const wrapper = shallow(
					<PieChart
						data={sampleData}
						hasToolTips={false}
						isHovering
					/>
				);

				assert.equal(wrapper.find(ToolTip).prop('isExpanded'), false);
			});
		});

		describe('palette', () => {
			it('should pass through to Line and handle wrapping values', () => {
				const wrapper = shallow(
					<PieChart
						data={sampleData}
						palette={['foo', 'bar']}
					/>
				);

				assert.equal(wrapper.find(Line).at(0).prop('color'), 'foo');
				assert.equal(wrapper.find(Line).at(1).prop('color'), 'bar');
				assert.equal(wrapper.find(Line).at(2).prop('color'), 'foo');
			});
		});

		describe('colorMap', () => {
			it('should pass through the correct color to Line', () => {
				const wrapper = shallow(
					<PieChart
						data={sampleData}
						colorMap={{
							Two: '#abc123',
						}}
					/>
				);

				assert.equal(wrapper.find(Line).at(0).prop('color'), 'color-chart-0');
				assert.equal(wrapper.find(Line).at(1).prop('color'), '#abc123');
				assert.equal(wrapper.find(Line).at(2).prop('color'), 'color-chart-2');
			});
		});

		describe('ToolTip', () => {
			it('should pass through props to ToolTip', () => {
				const wrapper = shallow(
					<PieChart
						data={sampleData}
						ToolTip={{ foo: 'bar' }}
					/>
				);

				assert.equal(wrapper.find(ToolTip).prop('foo'), 'bar');
			});
		});

		describe('isHovering and hoveringIndex', () => {
			it('should put the right class on the right slice', () => {
				const wrapper = shallow(
					<PieChart
						data={sampleData}
						isHovering={true}
						hoveringIndex={1}
					/>
				);

				assert(
					wrapper
					.find('.lucid-PieChart-slice-group')
					.at(1)
					.hasClass('lucid-PieChart-slice-group-is-hovering')
				);
			});
		});

		describe('onMouseOver', () => {
			it('should fire when hovering on a slice and hasToolTips', () => {
				const onMouseOver = sinon.spy();
				const wrapper = shallow(
					<PieChart
						data={sampleData}
						onMouseOver={onMouseOver}
						hasToolTips
						foo='bar'
					/>
				);

				const target = wrapper.find('.lucid-PieChart-slice-hover').at(1);

				target.simulate('mouseOver');

				assert(onMouseOver.called, 'onMouseOver was not called');
				assert.equal(onMouseOver.args[0][0], 1, 'wrong index on onMouseOut');
				assert.equal(onMouseOver.args[0][1].props.foo, 'bar');
				assert(_.has(onMouseOver.args[0][1], 'event'))
			});
		});

		describe('onMouseOut', () => {
			it('should fire when hovering out when we\' not using tooltips', () => {
				const onMouseOut = sinon.spy();
				const wrapper = shallow(
					<PieChart
						data={sampleData}
						onMouseOut={onMouseOut}
						hasToolTips={false}
						foo='bar'
					/>
				);

				const target = wrapper.find('.lucid-PieChart-slice-hover').at(0);

				target.simulate('mouseOut');

				assert(onMouseOut.called, 'onMouseOut was not called');
				assert.equal(onMouseOut.args[0][0].props.foo, 'bar');
				assert(_.has(onMouseOut.args[0][0], 'event'));
			});
		});

		describe('xAxisFormatter', () => {
			it('should work', () => {
				const wrapper = shallow(
					<PieChart
						data={sampleData}
						xAxisFormatter={_.toUpper}
						isHovering
						hoveringIndex={0}
					/>
				);

				assert.equal(wrapper.find(ToolTip.Title).prop('children'), 'ONE')
			});
		});

		describe('yAxisFormatter', () => {
			it('should work', () => {
				const wrapper = shallow(
					<PieChart
						data={sampleData}
						yAxisFormatter={x => x * 10}
						isHovering
						hoveringIndex={1}
					/>
				);

				assert.equal(wrapper.find(ToolTip.Body).prop('children'), '200');
			});
		});
	});
});
