// Note: these tests are basically pin tests, given that we're rendering svgs,
// these tests serve to ensure that the rendered output is exactly at the
// author inteded. As a consequence, you may need to re-pin these tests if you
// change things.

import React from 'react';
import { mount } from 'enzyme';
import { common } from '../../util/generic-tests';
import assert from 'assert';

import LineChart from './LineChart';
import EmptyStateWrapper from '../EmptyStateWrapper/EmptyStateWrapper';

const { EmptyStateWrapper: { Title, Body } } = LineChart;

describe('LineChart', () => {
	let wrapper;

	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
		}
	});

	common(LineChart, {
		exemptFunctionProps: [
			'xAxisFormatter',
			'xAxisTooltipFormatter',
			'yAxisTooltipFormatter',
			'yAxisTooltipDataFormatter',
			'yAxisFormatter',
			'y2AxisFormatter',
			'y2AxisTooltipDataFormatter',
		],
		getDefaultProps: () => ({
			data: [
				{ x: new Date('2015-01-01T00:00:00Z'), y: 1 },
				{ x: new Date('2015-01-01T00:00:00Z'), y: 2 },
			],
		}),
	});

	describe('props', () => {
		describe('isLoading', () => {
			it('should show a `LoadingIndicator` if `isLoading`', () => {
				wrapper = mount(<LineChart isLoading />);

				const loadingIndicatorWrapper = wrapper
					.find(EmptyStateWrapper)
					.find('LoadingIndicator');

				assert(loadingIndicatorWrapper.prop('isLoading'));
			});
		});
	});

	describe('child components', () => {
		describe('EmptyStateWrapper Title', () => {
			it('should render the message title element', () => {
				const titleText = 'Here is the Title Text';
				wrapper = mount(
					<LineChart>
						<EmptyStateWrapper>
							<Title>{titleText}</Title>
						</EmptyStateWrapper>
					</LineChart>
				);

				const messageTitleWrapper = wrapper
					.find(EmptyStateWrapper)
					.find('.lucid-EmptyStateWrapper-message-title');

				assert.equal(
					messageTitleWrapper.text(),
					titleText,
					'must contain the title text'
				);
			});
		});

		describe('EmptyStateWrapper Body', () => {
			it('should render the message body element', () => {
				const bodyElement = (
					<div className="parent-div"><div className="nested-div" /></div>
				);
				wrapper = mount(
					<LineChart>
						<EmptyStateWrapper>
							<Body>{bodyElement}}</Body>
						</EmptyStateWrapper>
					</LineChart>
				);

				const messageBodyWrapper = wrapper.find(EmptyStateWrapper);

				assert(
					messageBodyWrapper.contains(bodyElement),
					'must contain the body element'
				);
			});
		});
	});

	describe('render', () => {
		it('should render a single axis chart', () => {
			wrapper = mount(
				<LineChart
					data={[
						{ x: new Date(), y: 1 },
						{ x: new Date(), y: 2 },
						{ x: new Date(), y: 3 },
					]}
				/>
			);

			assert.equal(
				wrapper.find('.lucid-Point').length,
				3,
				'did not find the correct number of points'
			);
		});

		it('should render a single axis chart with multiple series', () => {
			wrapper = mount(
				<LineChart
					data={[
						{ x: new Date(), y: 1, y2: 1 },
						{ x: new Date(), y: 2, y2: 1 },
						{ x: new Date(), y: 3, y2: 1 },
					]}
					yAxisFields={['y', 'y2']}
				/>
			);

			assert.equal(
				wrapper.find('.lucid-Line').length,
				2,
				'did not find the correct number of lines'
			);
		});

		it('should render a dual axis chart', () => {
			wrapper = mount(
				<LineChart
					data={[
						{ x: new Date(), y: 1, y2: 1 },
						{ x: new Date(), y: 2, y2: 1 },
						{ x: new Date(), y: 3, y2: 1 },
					]}
					yAxisFields={['y']}
					y2AxisFields={['y2']}
				/>
			);

			assert.equal(
				wrapper.find('.lucid-Axis').length,
				3,
				'did not find the correct number of axes'
			);
		});
	});
});
