import React from 'react';
import { forEach, has } from 'lodash';
import { shallow } from 'enzyme';

import { common } from '../../util/generic-tests';
import { Grid } from './Grid';

describe('Grid', () => {
	common(Grid);

	describe('props', () => {
		let wrapper: any;

		beforeEach(() => {
			const props = {
				className: 'wut',
				children: <Grid.Cell></Grid.Cell>,
				style: { marginRight: 10 },
				initialState: { test: true },
				callbackId: 1,
				'data-testid': 10,
			};
			wrapper = shallow(<Grid {...props} />);
		});

		afterEach(() => {
			wrapper.unmount();
		});

		describe('isVertical', () => {
			it('Explicitly set the primary axis of the grid to Y', () => {
				wrapper = shallow(<Grid isVertical />);
				expect(wrapper.find('.lucid-Grid-is-vertical').length).toBe(1);
			});
		});

		describe('isHorizontal', () => {
			it('Explicitly set the primary axis of the grid to X', () => {
				wrapper = shallow(<Grid isHorizontal />);
				expect(wrapper.find('.lucid-Grid-is-horizontal').length).toBe(1);
			});
		});

		describe('isGutterless', () => {
			it('Creates a grid without padding separating grid cells', () => {
				wrapper = shallow(<Grid isGutterless />);
				expect(wrapper.find('.lucid-Grid-is-gutterless').length).toBe(1);
			});
		});

		describe('isMultiline', () => {
			it('Allow Grids to wrap multiple lines ', () => {
				wrapper = shallow(<Grid isMultiline />);
				expect(wrapper.find('.lucid-Grid-is-multiline').length).toBe(1);
			});
		});

		describe('section pass throughs', () => {
			it('passes through props not defined in `propTypes` to the root section element', () => {
				const sectionRootProps = wrapper.find('.lucid-Grid').props();

				// 'className' is destructured from the props object
				// but still appear becuase it is also directly passed to the root <section /> element as a prop
				forEach(
					[
						'className',
						'data-testid',
						'style',
						'children',
						'initialState',
						'callbackId',
					],
					(prop) => {
						expect(has(sectionRootProps, prop)).toBe(true);
					}
				);
			});
			it('does not pass through any props destructured from the root section element', () => {
				const sectionRootProps = wrapper.find('.lucid-Grid').props();

				// 'className' is destructured from the props object
				// but still appear becuase it is also directly applied to the root <section /> element as a prop
				forEach(
					['isVertical', 'isHorizontal', 'isGutterless', 'isMultiline'],
					(prop) => {
						expect(has(sectionRootProps, prop)).toBe(false);
					}
				);
			});
		});
		describe('article pass throughs', () => {
			it('passes through specific child props to the article', () => {
				const articleRootProps = wrapper.find('.lucid-Grid-Cell').props();

				// class name is directly applied to the article
				forEach(['className', 'children'], (prop) => {
					expect(has(articleRootProps, prop)).toBe(true);
				});
			});
			it('does not pass through the the article element any of the props defined in `Grid.Cell.propTypes` (and, in addition, omits `initialState`, and `callbackId`)', () => {
				const articleRootProps = wrapper.find('.lucid-Grid-Cell').props();

				forEach(
					[
						'isFull',
						'isHalf',
						'isThird',
						'isQuarter',
						'is2',
						'is3',
						'is4',
						'is5',
						'is6',
						'is7',
						'is8',
						'is9',
						'is10',
						'is11',
						'isOffsetQuarter',
						'isOffsetThird',
						'isOffsetHalf',
						'initialState',
						'callbackId',
					],
					(prop) => {
						expect(has(articleRootProps, prop)).toBe(false);
					}
				);
			});
		});
	});
});
