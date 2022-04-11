/* eslint-disable comma-spacing */
import _, { forEach, has, noop } from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';
import { common } from '../../util/generic-tests';
import assert from 'assert';
import sinon from 'sinon';

import { PieChartDumb as PieChart } from './PieChart';
import Line from '../Line/Line';
import { ToolTipDumb as ToolTip } from '../ToolTip/ToolTip';
import * as chartConstants from '../../constants/charts';

jest.mock('d3-shape', () => ({
	arc: jest.fn(() => ({
		innerRadius: jest.fn(() => ({
			outerRadius: jest.fn(() => (arg: any) => `${arg}`),
		})),
	})),
	pie: jest.fn(() => ({
		sort: jest.fn(() => (arg: any) => arg),
	})),
}));

const sampleData = [
	{ x: 'One', y: 30 },
	{ x: 'Two', y: 20 },
	{ x: 'Three', y: 50 },
];

describe('PieChart', () => {
	common(PieChart, {
		exemptFunctionProps: ['xAxisFormatter', 'yAxisFormatter'] as any,
	});

	describe('render', () => {
		it('should render a basic chart', () => {
			const wrapper = shallow(<PieChart data={sampleData} />);

			assert.equal(wrapper.find(Line).length, 3, "missing Line's");
			assert.equal(
				wrapper.find('.lucid-PieChart-slice-hover').length,
				3,
				'missing the hover slices'
			);
		});
	});

	describe('props', () => {
		it('height and width', () => {
			const wrapper = shallow(<PieChart height={150} width={250} />);

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

				assert.equal(
					wrapper.find('g').at(0).prop('transform'),
					'translate(10, 50)'
				);
			});
		});

		describe('hasToolTips', () => {
			it('should set isExpanded on ToolTip when true and hovering', () => {
				const wrapper = shallow(
					<PieChart data={sampleData} hasToolTips isHovering />
				);

				assert.equal(wrapper.find(ToolTip).prop('isExpanded'), true);
			});

			it('should not set isExpanded on ToolTip when not hovering', () => {
				const wrapper = shallow(
					<PieChart data={sampleData} hasToolTips={false} isHovering />
				);

				assert.equal(wrapper.find(ToolTip).prop('isExpanded'), false);
			});
		});

		describe('palette', () => {
			it('should pass through to Line and handle wrapping values', () => {
				const wrapper = shallow(
					<PieChart data={sampleData} palette={['foo', 'bar']} />
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

				assert.equal(wrapper.find(Line).at(0).prop('color'), 'color-chart-3');
				assert.equal(wrapper.find(Line).at(1).prop('color'), '#abc123');
				assert.equal(wrapper.find(Line).at(2).prop('color'), 'color-chart-2');
			});
		});

		describe('ToolTip', () => {
			it('should pass through props to ToolTip', () => {
				const wrapper = shallow(
					<PieChart data={sampleData} ToolTip={{ kind: 'info' } as any} />
				);

				assert.equal(wrapper.find(ToolTip).prop('kind'), 'info');
			});
		});

		describe('hasStroke', () => {
			it('should add the correct class', () => {
				const wrapper = shallow(
					<PieChart data={sampleData} hasStroke={true} />
				);

				assert.equal(
					wrapper.find('.lucid-PieChart-slice-has-stroke').length,
					3
				);
			});

			it('should not add the class when false', () => {
				const wrapper = shallow(
					<PieChart data={sampleData} hasStroke={false} />
				);

				assert.equal(
					wrapper.find('.lucid-PieChart-slice-has-stroke').length,
					0
				);
			});
		});

		describe('isHovering and hoveringIndex', () => {
			it('should put the right class on the right slice', () => {
				const wrapper = shallow(
					<PieChart data={sampleData} isHovering={true} hoveringIndex={1} />
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
						palette={['foo']}
					/>
				);

				const target = wrapper.find('.lucid-PieChart-slice-hover').at(1);

				target.simulate('mouseOver');

				assert(onMouseOver.called, 'onMouseOver was not called');
				assert.equal(onMouseOver.args[0][0], 1, 'wrong index on onMouseOut');
				assert.equal(onMouseOver.args[0][1].props.palette[0], 'foo');
				assert(_.has(onMouseOver.args[0][1], 'event'));
			});
		});

		describe('onMouseOut', () => {
			it("should fire when hovering out when we're not using tooltips", () => {
				const onMouseOut = sinon.spy();
				const wrapper = shallow(
					<PieChart
						data={sampleData}
						onMouseOut={onMouseOut}
						hasToolTips={false}
						palette={['bar']}
					/>
				);

				const target = wrapper.find('.lucid-PieChart-slice-hover').at(0);

				target.simulate('mouseOut', { stopPropagation: () => undefined });

				assert(onMouseOut.called, 'onMouseOut was not called');
				assert.equal(onMouseOut.args[0][0].props.palette[0], 'bar');
				assert(_.has(onMouseOut.args[0][0], 'event'));
			});
		});

		describe('xAxisFormatter', () => {
			it('should work', () => {
				const wrapper = shallow(
					<PieChart
						data={sampleData}
						xAxisFormatter={_.toUpper as any}
						isHovering
						hoveringIndex={0}
					/>
				);

				assert.equal(wrapper.find(ToolTip.Title).prop('children'), 'ONE');
			});
		});

		describe('yAxisFormatter', () => {
			it('should work', () => {
				const wrapper = shallow(
					<PieChart
						data={sampleData}
						yAxisFormatter={(x) => x * 10}
						isHovering
						hoveringIndex={1}
					/>
				);

				assert.equal(wrapper.find(ToolTip.Body).prop('children'), '200');
			});
		});
	});

	describe('pass throughs', () => {
		let wrapper: any;
		const defaultProps = PieChart.defaultProps;
		const tooltipDefaultProps = ToolTip.defaultProps;
		const { Body } = ToolTip;

		const data = [
			{ x: 'Leslie', y: 60 },
			{ x: 'Ron', y: 40 },
			{ x: 'Tom', y: 30 },
			{ x: 'Gary', y: 20 },
			{ x: 'Ben', y: 15 },
		];

		beforeEach(() => {
			const props = {
				...defaultProps,
				height: 100,
				width: 200,
				margin: { top: 11, right: 12, bottom: 13, left: 14 },
				palette: chartConstants.PALETTE_30,
				colorMap: { clicks: '#abc123' },
				data: data,
				hasToolTips: false,
				hasStroke: false,
				isDonut: true,
				isHovering: true,
				hoveringIndex: 1,
				onMouseOver: noop,
				onMouseOut: noop,
				donutWidth: 20,
				ToolTip: {
					...tooltipDefaultProps,
					className: 'foo bar',
					isCloseable: true,
					isLight: true,
					onClose: noop,
					flyOutStyle: { marginLeft: 10 },
					flyOutMaxWidth: 1000,
					direction: 'right' as any,
					alignment: 'end' as any,
					isExpanded: true,
					onMouseOver: noop,
					onMouseOut: noop,
					portalId: '11',
					Title: 'Test Title',
					Body: <Body>ToolTip Test Body.</Body>,
					Target: <div>Example Test Target</div>,
					style: { marginRight: 10 },
					initialState: { test: true },
					callbackId: 1,
					'data-testid': 10,
				},
				className: 'wut',
				style: { marginRight: 10 },
				initialState: { test: true },
				callbackId: 1,
				'data-testid': 10,
			};
			wrapper = shallow(<PieChart {...props} />);
		});

		afterEach(() => {
			wrapper.unmount();
		});

		it('passes through props not defined in `propTypes` to the root element.', () => {
			const rootProps = wrapper.find('.lucid-PieChart').props();

			expect(wrapper.first().prop(['className'])).toContain('wut');
			expect(wrapper.first().prop(['style'])).toMatchObject({
				marginRight: 10,
			});
			expect(wrapper.first().prop(['height'])).toBe(100);
			expect(wrapper.first().prop(['width'])).toBe(200);
			expect(wrapper.first().prop(['data-testid'])).toBe(10);

			// 'className' 'with', 'height' and 'style' are plucked from the pass through object
			// but still appear becuase they are also directly passed to the root element as a prop
			forEach(['className', 'style', 'data-testid'], (prop) => {
				expect(has(rootProps, prop)).toBe(true);
			});
		});
		it('omits all the props defined in `propTypes` (plus, in addition, `initialState`, and `callbackId` and any toolTip props) from the root element', () => {
			const rootProps = wrapper.find('.lucid-PieChart').props();

			// ensure that omitted PieChart props are not passed through
			forEach(
				[
					'margin',
					'data',
					'hasToolTips',
					'hasStroke',
					'palette',
					'colorMap',
					'ToolTip',
					'isDonut',
					'isHovering',
					'hoveringIndex',
					'onMouseOver',
					'onMouseOut',
					'donutWidth',
					'xAxisField',
					'xAxisFormatter',
					'yAxisField',
					'yAxisFormatter',
					'initialState',
					'callbackId',
				],
				(prop) => {
					expect(has(rootProps, prop)).toBe(false);
				}
			);

			// ensure that omitted ToolTip props are not passed through
			forEach(
				[
					'isCloseable',
					'isLight',
					'onClose',
					'flyOutStyle',
					'flyOutMaxWidth',
					'Title',
					'Body',
					'Target',
					'initialState',
				],
				(prop) => {
					expect(has(rootProps, prop)).toBe(false);
				}
			);
		});
	});
});
