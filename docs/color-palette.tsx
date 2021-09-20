import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import createClass from 'create-react-class';

import { lucidClassNames } from '../src/util/style-helpers';
import './color-palette.less';

const cx = lucidClassNames.bind('ColorPalette');

const colorList = [
	{
		category: 'Basic',
		description: 'Basic colors',
		variables: [
			'color-white',
			'color-backgroundColor',
			'color-pageBackgroundColor',
			'color-borderColor',
			'color-black',
		],
	},
	{
		category: 'Primary',
		description:
			"The primary color is the most prominent color used throughout lucid. It's great for drawing the user's eye to particular components.",
		variables: [
			'color-primary',
			'color-primaryLight',
			'color-primaryLightHover',
			'color-primaryDark',
		],
	},
	{
		category: 'Secondary',
		description:
			'Secondary colors are used to denote specific objects types. In our case we typically use these color for advertisers, insertion orders, and line items.',
		variables: [
			'color-secondary-1',
			'color-secondary-2',
			'color-secondary-3',
			'color-secondary-4',
			'color-secondary-5',
		],
	},
	{
		category: 'Text Colors',
		variables: [
			'color-textColor',
			'color-disabledText',
			'color-linkColor',
			'color-linkColorHover',
		],
	},
	{
		category: 'Grays',
		description:
			'Grays play an important role in lucid, and this set of grays forms the foundation for all the other variants. More prescriptive colors should be favored over these general grays when available.',
		variables: [
			'color-neutral-1',
			'color-neutral-2',
			{ name: 'color-neutral-3', aliases: ['color-lightGray'] },
			{ name: 'color-neutral-4', aliases: ['color-gray'] },
			{ name: 'color-neutral-5', aliases: ['color-mediumGray'] },
			'color-neutral-6',
			'color-neutral-7',
			'color-neutral-8',
			{ name: 'color-neutral-9', aliases: ['color-darkGray'] },
		],
	},
	{
		category: 'Featured Colors',
		description:
			'A featured color should only be used for a component that has multiple states like banners, buttons, or button like components (e.g. SingleSelect).',
		variables: [
			'featured-color-default',
			'featured-color-primary',
			'featured-color-success',
			'featured-color-info',
			'featured-color-warning',
			'featured-color-danger',
		],
	},
	{
		category: 'Featured Default',
		variables: [
			'featured-color-default-backgroundColor',
			'featured-color-default-borderColor',
		],
	},
	{
		category: 'Featured Primary',
		variables: [
			'featured-color-primary-backgroundColor',
			'featured-color-primary-borderColor',
		],
	},
	{
		category: 'Featured Success',
		variables: [
			'featured-color-success-backgroundColor',
			'featured-color-success-borderColor',
			'featured-color-success-colorHover',
		],
	},
	{
		category: 'Featured Info',
		variables: [
			'featured-color-info-backgroundColor',
			'featured-color-info-borderColor',
			'featured-color-info-colorHover',
		],
	},
	{
		category: 'Featured Warning',
		variables: [
			'featured-color-warning-backgroundColor',
			'featured-color-warning-borderColor',
			'featured-color-warning-colorHover',
		],
	},
	{
		category: 'Featured Danger',
		variables: [
			'featured-color-danger-backgroundColor',
			'featured-color-danger-borderColor',
			'featured-color-danger-colorHover',
		],
	},
	{
		category: 'Chart 0',
		description:
			'Chart colors are used for data visualizations and were designed to be used in a particular order.',
		variables: [
			'color-chart-0-lightest',
			'color-chart-0-light',
			'color-chart-0',
			'color-chart-0-dark',
			'color-chart-0-darkest',
		],
	},
	{
		category: 'Chart 1',
		variables: [
			'color-chart-1-lightest',
			'color-chart-1-light',
			'color-chart-1',
			'color-chart-1-dark',
			'color-chart-1-darkest',
		],
	},
	{
		category: 'Chart 2',
		variables: [
			'color-chart-2-lightest',
			'color-chart-2-light',
			'color-chart-2',
			'color-chart-2-dark',
			'color-chart-2-darkest',
		],
	},
	{
		category: 'Chart 3',
		variables: [
			'color-chart-3-lightest',
			'color-chart-3-light',
			'color-chart-3',
			'color-chart-3-dark',
			'color-chart-3-darkest',
		],
	},
	{
		category: 'Chart 4',
		variables: [
			'color-chart-4-lightest',
			'color-chart-4-light',
			'color-chart-4',
			'color-chart-4-dark',
			'color-chart-4-darkest',
		],
	},
	{
		category: 'Chart 5',
		variables: [
			'color-chart-5-lightest',
			'color-chart-5-light',
			'color-chart-5',
			'color-chart-5-dark',
			'color-chart-5-darkest',
		],
	},
	{
		category: 'Chart 6',
		variables: [
			'color-chart-6-lightest',
			'color-chart-6-light',
			'color-chart-6',
			'color-chart-6-dark',
			'color-chart-6-darkest',
		],
	},
	{
		category: 'Chart Semantic Good',
		variables: [
			'color-chart-good-lightest',
			'color-chart-good-light',
			'color-chart-good',
			'color-chart-good-dark',
			'color-chart-good-darkest',
		],
	},
	{
		category: 'Chart Semantic Bad',
		variables: [
			'color-chart-bad-lightest',
			'color-chart-bad-light',
			'color-chart-bad',
			'color-chart-bad-dark',
			'color-chart-bad-darkest',
		],
	},
	{
		category: 'Chart Other',
		variables: ['color-chart-neutral'],
	},
];

// Yoinked from SO: http://stackoverflow.com/a/3627747/895558
function hex(x) {
	return ('0' + parseInt(x).toString(16)).slice(-2);
}

function rgb2hex(rgb) {
	const matches = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

	return '#' + hex(matches[1]) + hex(matches[2]) + hex(matches[3]);
}

const ColorPalette = createClass({
	getInitialState() {
		return {
			hexMap: {},
		};
	},

	// In order to keep our colors coming from LESS, we need to do some...
	// interesting... dom inspection to get the actual background colors
	// rendered.
	getHexMap() {
		const allItems = document.querySelectorAll('[data-less-variable]');
		const hexMap = _.reduce(
			allItems,
			(acc, item) => {
				const lessVariable = (item as any).dataset.lessVariable;
				const hexString = rgb2hex(
					window.getComputedStyle(item).getPropertyValue('background-color')
				);

				return {
					...acc,
					[lessVariable]: hexString,
				};
			},
			{}
		);

		this.setState({ hexMap });
	},

	componentDidMount() {
		// Because of the way we load our css with webpack, we need to make sure
		// that the page is loaded before we try to sniff out the colors
		if (document.readyState === 'complete') {
			this.getHexMap();
		} else {
			window.addEventListener('load', this.getHexMap);
		}
	},

	componentWillUnmount() {
		window.removeEventListener('load', this.getHexMap);
	},

	render() {
		const { hexMap } = this.state;

		return (
			<div className={cx('&')}>
				<h2>Color Palette</h2>

				<p>This page documents important colors used in Lucid.</p>

				{_.map(colorList, (group, i) => (
					<div key={i}>
						<h3 style={{ marginTop: '1.5rem' }}>{group.category}</h3>

						{group.description ? <p>{group.description}</p> : null}

						{_.map(group.variables, (variable: any, j) => {
							const hasAliases = _.isPlainObject(variable);
							const variableName = hasAliases ? variable.name : variable;

							return (
								<div
									key={j}
									data-less-variable={variableName}
									className={classNames(cx('&-item', `&-${variableName}`))}
								>
									<span>
										{`@${variableName}; `}
										{hasAliases
											? `(aliases: ${variable.aliases
													.map((v) => `@${v};`)
													.join(' ')})`
											: null}
									</span>

									<span>{hexMap[variableName]}</span>
								</div>
							);
						})}
					</div>
				))}

				<h2 style={{ margin: '2rem 0 1rem 0' }}>Chart Color Matrix</h2>
				<div
					style={{
						display: 'grid',
						gridTemplateRows: 'repeat(5, 1fr)',
						gridAutoFlow: 'column',
						height: 250,
						gridGap: 15,
					}}
				>
					{_.map(_.times(7 * 5), (n) => (
						<div
							className={cx(
								`&-color-chart-${Math.floor(n / 5)}${shades[n % 5]}`
							)}
						/>
					))}
				</div>
			</div>
		);
	},
});

const shades = ['-lightest', '-light', '', '-dark', '-darkest'];

export default ColorPalette;
