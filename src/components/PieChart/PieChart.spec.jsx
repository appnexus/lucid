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

		describe('data', () => {
			it('should work with xAxisField', () => {
				const wrapper = shallow(
					<PieChart
						data={[
							{key: 'one', y: 10},
							{key: 'two', y: 10},
						]}
						xAxisField='key'
					/>
				);

				assert.equal(wrapper.find(Line).at(0).prop('d'), 'M5.5109105961630896e-15,-90A90,90,0,1,1,5.5109105961630896e-15,90L3.061616997868383e-17,0.5A0.5,0.5,0,1,0,3.061616997868383e-17,-0.5Z');
				assert.equal(wrapper.find(Line).at(1).prop('d'), 'M5.5109105961630896e-15,90A90,90,0,1,1,-1.6532731788489267e-14,-90L-9.184850993605148e-17,-0.5A0.5,0.5,0,1,0,3.061616997868383e-17,0.5Z');
			});

			it('should work with yAxisField', () => {
				const wrapper = shallow(
					<PieChart
						data={[
							{x: 'one', value: 10},
							{x: 'two', value: 10},
						]}
						yAxisField='value'
					/>
				);

				assert.equal(wrapper.find(Line).at(0).prop('d'), 'M5.5109105961630896e-15,-90A90,90,0,1,1,5.5109105961630896e-15,90L3.061616997868383e-17,0.5A0.5,0.5,0,1,0,3.061616997868383e-17,-0.5Z');
				assert.equal(wrapper.find(Line).at(1).prop('d'), 'M5.5109105961630896e-15,90A90,90,0,1,1,-1.6532731788489267e-14,-90L-9.184850993605148e-17,-0.5A0.5,0.5,0,1,0,3.061616997868383e-17,0.5Z');
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

		describe('isDonut', () => {
			it('should render correctly', () => {
				const wrapper = shallow(
					<PieChart
						data={sampleData}
						isDonut
					/>
				);

				assert.equal(wrapper.find(Line).at(0).prop('d'), 'M5.5109105961630896e-15,-90A90,90,0,0,1,85.59508646656381,27.811529493745287L71.32923872213651,23.17627457812107A75,75,0,0,0,4.592425496802574e-15,-75Z');
				assert.equal(wrapper.find(Line).at(1).prop('d'), 'M85.59508646656381,27.811529493745287A90,90,0,0,1,5.5109105961630896e-15,90L4.592425496802574e-15,75A75,75,0,0,0,71.32923872213651,23.17627457812107Z');
				assert.equal(wrapper.find(Line).at(2).prop('d'), 'M5.5109105961630896e-15,90A90,90,0,1,1,-1.6532731788489267e-14,-90L-1.3777276490407723e-14,-75A75,75,0,1,0,4.592425496802574e-15,75Z');
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

		describe('donutWidth', () => {
			it('should render correctly', () => {
				const wrapper = shallow(
					<PieChart
						data={sampleData}
						donutWidth={25}
					/>
				);

				assert.equal(wrapper.find(Line).at(0).prop('d'), 'M5.5109105961630896e-15,-90A90,90,0,0,1,85.59508646656381,27.811529493745287L0.47552825814757677,0.1545084971874738A0.5,0.5,0,0,0,3.061616997868383e-17,-0.5Z');
				assert.equal(wrapper.find(Line).at(1).prop('d'), 'M85.59508646656381,27.811529493745287A90,90,0,0,1,5.5109105961630896e-15,90L3.061616997868383e-17,0.5A0.5,0.5,0,0,0,0.47552825814757677,0.1545084971874738Z');
				assert.equal(wrapper.find(Line).at(2).prop('d'), 'M5.5109105961630896e-15,90A90,90,0,1,1,-1.6532731788489267e-14,-90L-9.184850993605148e-17,-0.5A0.5,0.5,0,1,0,3.061616997868383e-17,0.5Z');
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

describe('PieChart', () => {
	let wrapper;

	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
		}
	});

	describe('render', () => {
		it('should have the correct html', () => {
			wrapper = mount(
				<PieChart
					data={[
						{ key: 'foo', value: 120 },
						{ key: 'bar', value: 140 },
						{ key: 'baz', value: 100 },
					]}
					xAxisField='key'
					yAxisField='value'
				/>
			);

			assert.equal(wrapper.html(), '<svg class="lucid-PieChart" width="200" height="200"><g class="lucid-ContextMenu lucid-ToolTip"><g transform="translate(10, 10)"><g transform="translate(90, 90)"><g class="lucid-PieChart-slice-group"><path transform="scale(1)" class="lucid-PieChart-slice lucid-Line lucid-Line-color-chart-0" d="M5.5109105961630896e-15,-90A90,90,0,0,1,77.94228634059948,44.999999999999986L0.43301270189221935,0.24999999999999992A0.5,0.5,0,0,0,3.061616997868383e-17,-0.5Z"></path><path class="lucid-PieChart-slice-hover" d="M5.5109105961630896e-15,-90A90,90,0,0,1,77.94228634059948,44.999999999999986L0,0Z" transform="scale(1.1)"></path></g><g class="lucid-PieChart-slice-group"><path transform="scale(1)" class="lucid-PieChart-slice lucid-Line lucid-Line-color-chart-1" d="M77.94228634059948,44.999999999999986A90,90,0,0,1,-88.63269777109872,15.628335990023725L-0.492403876506104,0.08682408883346514A0.5,0.5,0,0,0,0.43301270189221935,0.24999999999999992Z"></path><path class="lucid-PieChart-slice-hover" d="M77.94228634059948,44.999999999999986A90,90,0,0,1,-88.63269777109872,15.628335990023725L0,0Z" transform="scale(1.1)"></path></g><g class="lucid-PieChart-slice-group"><path transform="scale(1)" class="lucid-PieChart-slice lucid-Line lucid-Line-color-chart-2" d="M-88.63269777109872,15.628335990023725A90,90,0,0,1,-1.6532731788489267e-14,-90L-9.184850993605148e-17,-0.5A0.5,0.5,0,0,0,-0.492403876506104,0.08682408883346514Z"></path><path class="lucid-PieChart-slice-hover" d="M-88.63269777109872,15.628335990023725A90,90,0,0,1,-1.6532731788489267e-14,-90L0,0Z" transform="scale(1.1)"></path></g></g></g></g></svg>');
		});
	});
});
