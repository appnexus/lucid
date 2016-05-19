import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';

import { lucidClassNames } from '../../util/style-helpers';

const cx = lucidClassNames.bind('&-ColorPalette');

const colorList = [
	{
		category: 'Basic',
		description: 'Basic colors',
		variables: [
			'color-white',
			'color-black',
		],
	},
	{
		category: 'Primary',
		description: 'Primary Colors come in three states primary, primaryMedium and primaryLight',
		variables: [
			'color-primary',
			'color-primaryMedium',
			'color-primaryLight',
		],
	},
	{
		category: 'Container Colors',
		description: 'Colors used to define colors of containers within components.',
		variables: [
			'color-backgroundColor',
			'color-borderColor',
		],
	},
	{
		category: 'Text Colors',
		description: 'Used to define the color of text within a component.',
		variables: [
			'color-textColor',
			'color-disabledText',
			'color-linkColor',
			'color-linkColorHover',
		],
	},
	{
		category: 'Grays',
		description: 'Defined gray colors to be used with a component.  Do not use ' +
		'if a variable has been created that is more descriptive.',
		variables: [
			'color-lightGray',
			'color-gray',
			'color-mediumGray',
			'color-darkGray',
		],
	},
	{
		category: 'Transparent Grays',
		description: 'Gray with an opacity.',
		variables: [
			'color-gray-5',
			'color-gray-10',
			'color-gray-25',
			'color-gray-30',
		],
	},
	{
		category: 'Featured Colors',
		description: 'A featured color should only be used for a component that has ' +
		'multiple states like banners or buttons or button like components ' +
		'(single select).  Featured colors should not be consumed by most components ' +
		'instead use the color variables defined above.',
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
			'featured-color-default-borderColor',
			'featured-color-default-backgroundColor',
			'featured-color-default-gradientStartColor',
			'featured-color-default-gradientEndColor',
		],
	},
	{
		category: 'Featured Primary',
		variables: [
			'featured-color-primary-borderColor',
			'featured-color-primary-backgroundColor',
			'featured-color-primary-borderColorLite',
			'featured-color-primary-gradientStartColor',
			'featured-color-primary-gradientEndColor',
		],
	},
	{
		category: 'Featured Success',
		variables: [
			'featured-color-success-borderColor',
			'featured-color-success-backgroundColor',
			'featured-color-success-borderColorLite',
			'featured-color-success-gradientStartColor',
			'featured-color-success-gradientEndColor',
		],
	},
	{
		category: 'Featured Info',
		variables: [
			'featured-color-info-borderColor',
			'featured-color-info-backgroundColor',
			'featured-color-info-borderColorLite',
			'featured-color-info-gradientStartColor',
			'featured-color-info-gradientEndColor',
		],
	},
	{
		category: 'Featured Warning',
		variables: [
			'featured-color-warning-borderColor',
			'featured-color-warning-backgroundColor',
			'featured-color-warning-borderColorLite',
			'featured-color-warning-gradientStartColor',
			'featured-color-warning-gradientEndColor',
		],
	},
	{
		category: 'Featured Danger',
		variables: [
			'featured-color-danger-borderColor',
			'featured-color-danger-backgroundColor',
			'featured-color-danger-borderColorLite',
			'featured-color-danger-gradientStartColor',
			'featured-color-danger-gradientEndColor',
		],
	},
	{
		category: 'Chart 0',
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
		category: 'Chart Semantic Good',
		variables: [
			'color-chart-good-light',
			'color-chart-good',
			'color-chart-good-dark',
		],
	},
	{
		category: 'Chart Semantic Bad',
		variables: [
			'color-chart-bad-light',
			'color-chart-bad',
			'color-chart-bad-dark',
		],
	},
	{
		category: 'Chart Other',
		variables: [
			'color-chart-neutral',
		],
	},
];

const ColorPalette = React.createClass({
	render() {
		return (
			<div >
				<h2>Color Palette</h2>
				<p>A list of all colors used.  Colors are listed by group type.</p>
				<p></p>
				{_.map(colorList, (group, i) => (
					<div key={i} style={{display: 'flex', flexWrap: 'wrap'}}>
						<h3 style={{flex: '1 0 100%'}}>{group.category}</h3>
						{group.description ?
							<p style={{flex: '1 0 100%'}}>{group.description}</p>
						: null}
						{_.map(group.variables, (variable, j) => (
							<div key={j} className={classNames(cx('&'))}>
								<div className={cx(`&-${variable}`)}></div>
								<p><code>{`@${variable};`}</code></p>
							</div>
						))}
					</div>
				))}
			</div>
		);
	},
});

export default ColorPalette;
