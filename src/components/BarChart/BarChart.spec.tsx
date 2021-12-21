/* eslint-disable comma-spacing */

// Note: these tests are basically pin tests, given that we're rendering svgs,
// these tests serve to ensure that the rendered output is exactly at the author
// intended. As a consequence, you may need to re-pin these tests if you change
// things.

import React from 'react';
import { mount } from 'enzyme';
import { common } from '../../util/generic-tests';
import assert from 'assert';

import BarChart from './BarChart';
import EmptyStateWrapper from '../EmptyStateWrapper/EmptyStateWrapper';

const {
	EmptyStateWrapper: { Title, Body },
} = BarChart;

describe('BarChart', () => {
	let wrapper: any;

	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
		}
	});

	common(BarChart, {
		exemptFunctionProps: [
			'xAxisFormatter',
			'yAxisFormatter',
			'yAxisTooltipFormatter',
			'yAxisTooltipDataFormatter',
			'renderTooltipBody',
		] as any,
		getDefaultProps: () => ({
			data: [
				{ x: 'Monday', y: 1, y2: 2 },
				{ x: 'Tuesday', y: 4, y2: 4 },
				{ x: 'Wednesday', y: 8, y2: 1 },
				{ x: 'Thursday', y: 20, y2: 15 },
				{ x: 'Friday', y: 10, y2: 2 },
			],
		}),
	});

	describe('props', () => {
		describe('isLoading', () => {
			it('should show a `LoadingIndicator` if `isLoading`', () => {
				wrapper = mount(<BarChart data={[]} isLoading />);

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
					<BarChart data={[]}>
						<EmptyStateWrapper>
							<Title>{titleText}</Title>
						</EmptyStateWrapper>
					</BarChart>
				);

				const messageTitleWrapper = wrapper
					.find(EmptyStateWrapper)
					.find('.lucid-EmptyStateWrapper-message-title');

				assert.strictEqual(
					messageTitleWrapper.text(),
					titleText,
					'must contain the title text'
				);
			});
		});

		describe('EmptyStateWrapper Body', () => {
			it('should render the message body element', () => {
				const bodyElement = (
					<div className='parent-div'>
						<div className='nested-div' />
					</div>
				);
				wrapper = mount(
					<BarChart data={[]}>
						<EmptyStateWrapper>
							<Body>{bodyElement}</Body>
						</EmptyStateWrapper>
					</BarChart>
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
		it('should render a basic chart', () => {
			wrapper = mount(
				<BarChart
					data={[
						{ x: 'Monday', y: 1, y2: 2 },
						{ x: 'Tuesday', y: 4, y2: 4 },
						{ x: 'Wednesday', y: 8, y2: 1 },
						{ x: 'Thursday', y: 20, y2: 15 },
						{ x: 'Friday', y: 10, y2: 2 },
					]}
				/>
			);

			assert.strictEqual(
				wrapper.find('.lucid-Bar').length,
				5,
				'did not find the correct number of bars'
			);
			assert.strictEqual(
				wrapper.find('.lucid-Axis').length,
				2,
				'did not find the correct number of axes'
			);
		});

		it('should render a chart with multiple series', () => {
			wrapper = mount(
				<BarChart
					data={[
						{ x: 'Monday', y: 1, y2: 2 },
						{ x: 'Tuesday', y: 4, y2: 4 },
						{ x: 'Wednesday', y: 8, y2: 1 },
						{ x: 'Thursday', y: 20, y2: 15 },
						{ x: 'Friday', y: 10, y2: 2 },
					]}
					yAxisFields={['y', 'y2']}
				/>
			);

			assert.strictEqual(
				wrapper.find('.lucid-Bar').length,
				10,
				'did not find the correct number of bars'
			);
		});
	});
});
