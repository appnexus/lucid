import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';

import { lucidClassNames } from '../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-ColorPalette');

const colorList = [
	{
		category: 'Basic',
		description: 'Basic colors',
		colors: [
			{
				varName: 'white',
				hex: '#fff'
			},
			{
				varName: 'black',
				hex: '#000'
			},
		]
	},
	{
		category: 'Primary',
		description: 'Primary Colors come in three states primary, primaryMedium and primaryLight',
		colors: [
			{
				varName: 'primary',
				hex: '#2abbb0'
			},
			{
				varName: 'primaryMedium',
				hex: 'tint(@color-primary, 65%)'
			},
			{
				varName: 'primaryLight',
				hex: 'tint(@color-primary, 85%)'
			},
		]
	},
	{
		category: 'Container Colors',
		description: 'Colors used to define colors of containers within components.',
		colors: [
			{
				varName: 'backgroundColor',
				hex: '@color-lightGray'
			},
			{
				varName: 'borderColor',
				hex: '@color-mediumGray'
			},
		]
	},
	{
		category: 'Text Colors',
		description: 'Used to define the color of text within a component.',
		colors: [
			{
				varName: 'textColor',
				hex: '@color-darkGray'
			},
			{
				varName: 'disabledText',
				hex: 'tint(@color-textColor, 50%)'
			},
			{
				varName: 'linkColor',
				hex: '@color-primary'
			},
			{
				varName: 'linkColorHover',
				hex: 'darken(@color-linkColor, 20%)'
			},
		]
	},
	{
		category: 'Transparent Gray',
		description: 'Gray with an opacity.',
		colors: [
			{
				varName: 'gray-5',
				hex: 'fade(@color-black, 5%)'
			},
			{
				varName: 'gray-10',
				hex: 'fade(@color-black, 10%)'
			},
			{
				varName: 'gray-25',
				hex: 'fade(@color-black, 25%)'
			},
			{
				varName: 'gray-30',
				hex: 'fade(@color-black, 30%)'
			},
		]
	},
	{
		category: 'Grays',
		description: 'Defined gray colors to be used with a component.  Do not use ' +
		'if a variable has been created that is more descriptive.',
		colors: [
			{
				varName: 'lightGray',
				hex: '#f4f4f4'
			},
			{
				varName: 'gray',
				hex: '#e3e3e3'
			},
			{
				varName: 'mediumGray',
				hex: '#c5c5c5'
			},
			{
				varName: 'darkGray',
				hex: '#333333'
			},
		]
	},
	{
		category: 'Featured colors',
		description: 'A featured color should only be used for a component that has ' +
		'multiple states like banners or buttons or button like components ' +
		'(single select).  Featured colors should not be consumed by most components ' +
		'instead use the color variables defined above.',
		colors: [
			{
				varName: 'default',
				hex: '#f3f3f3',
				featured: 'featured-'
			},
			{
				varName: 'primary',
				hex: '#2abbb0',
				featured: 'featured-'
			},
			{
				varName: 'success',
				hex: '#3fa516',
				featured: 'featured-'
			},
			{
				varName:'info',
				hex: '#0089c4',
				featured: 'featured-'
			},
			{
				varName: 'warning',
				hex: '#feb209',
				featured: 'featured-'
			},
			{
				varName: 'danger',
				hex: '#f7403a',
				featured: 'featured-'
			},
		]
	},
	{
		category: 'Featured default',
		colors: [
			{varName: 'default-borderColor', hex: '#c5c5c5', featured: 'featured-'},
			{varName: 'default-backgroundColor', hex: '#ededed', featured: 'featured-'},
			{varName: 'default-gradientStartColor', hex: '#f3f3f3', featured: 'featured-'},
			{varName: 'default-gradientEndColor', hex: '#e2e2e2', featured: 'featured-'},
		]
	},
	{
		category: 'Featured primary',
		colors: [
			{varName: 'primary-borderColor', hex: '@color-primary', featured: 'featured-'},
			{varName: 'primary-backgroundColor', hex: 'tint(@color-primary, 70%)', featured: 'featured-'},
			{varName: 'primary-borderColorLite', hex: 'tint(@color-primary, 60%)', featured: 'featured-'},
			{varName: 'primary-gradientStartColor', hex: 'tint(@color-primary, 30%)', featured: 'featured-'},
			{varName: 'primary-gradientEndColor', hex: '@color-primary', featured: 'featured-'},
		]
	},
	{
		category: 'Featured success',
		colors: [
			{varName: 'success-borderColor', hex: '@color-success', featured: 'featured-'},
			{varName: 'success-backgroundColor', hex: 'tint(@color-success, 70%)', featured: 'featured-'},
			{varName: 'success-borderColorLite', hex: 'tint(@color-success, 60%)', featured: 'featured-'},
			{varName: 'success-gradientStartColor', hex: 'tint(@color-success, 30%)', featured: 'featured-'},
			{varName: 'success-gradientEndColor', hex: '@color-success', featured: 'featured-'},
		]
	},
	{
		category: 'Featured info',
		colors: [
			{varName: 'info-borderColor', hex: '@color-info', featured: 'featured-'},
			{varName: 'info-backgroundColor', hex: 'tint(@color-info, 70%)', featured: 'featured-'},
			{varName: 'info-borderColorLite', hex: 'tint(@color-info, 60%)', featured: 'featured-'},
			{varName: 'info-gradientStartColor', hex: 'tint(@color-info, 30%)', featured: 'featured-'},
			{varName: 'info-gradientEndColor', hex: '@color-info', featured: 'featured-'},
		]
	},
	{
		category: 'Featured warning',
		colors: [
			{varName: 'warning-borderColor', hex: '@color-warning', featured: 'featured-'},
			{varName: 'warning-backgroundColor', hex: 'tint(@color-warning, 70%)', featured: 'featured-'},
			{varName: 'warning-borderColorLite', hex: 'tint(@color-warning, 60%)', featured: 'featured-'},
			{varName: 'warning-gradientStartColor', hex: 'tint(@color-warning, 30%)', featured: 'featured-'},
			{varName: 'warning-gradientEndColor', hex: '@color-warning', featured: 'featured-'},
		]
	},
	{
		category: 'Featured danger',
		colors: [
			{varName: 'danger-borderColor', hex: '@color-danger'},
			{varName: 'danger-backgroundColor', hex: 'tint(@color-danger, 70%)', featured: 'featured-'},
			{varName: 'danger-borderColorLite', hex: 'tint(@color-danger, 60%)', featured: 'featured-'},
			{varName: 'danger-gradientStartColor', hex: 'tint(@color-danger, 30%)', featured: 'featured-'},
			{varName: 'danger-gradientEndColor', hex: '@color-danger', featured: 'featured-'},
		]
	},
	{
		category: 'Charts',
		description: 'Colors that are used throughout our charts.',
		colors: [
			{ varName: 'chart-1', hex: '#0089c4'},
			{ varName: 'chart-1-dark', hex: 'shade(@color-chart-1, 35%)' },
			{ varName: 'chart-1-light', hex: 'tint(@color-chart-1, 65%)' },

			{ varName: 'chart-2', hex: '#ff8700' },
			{ varName: 'chart-2-dark', hex: 'shade(@color-chart-2, 35%)' },
			{ varName: 'chart-2-light', hex: 'tint(@color-chart-2, 65%)' },

			{ varName: 'chart-3', hex: '@color-primary' },
			{ varName: 'chart-3-dark', hex: 'shade(@color-chart-3, 35%)' },
			{ varName: 'chart-3-light', hex: 'tint(@color-chart-3, 65%)' },

			{ varName: 'chart-4', hex: '#824bb0' },
			{ varName: 'chart-4-dark', hex: 'shade(@color-chart-4, 35%)' },
			{ varName: 'chart-4-light', hex: 'tint(@color-chart-4, 65%)' },

			{ varName: 'chart-5', hex: '#fed100' },
			{ varName: 'chart-5-dark', hex: 'shade(@color-chart-5, 35%)' },
			{ varName: 'chart-5-light', hex: 'tint(@color-chart-5, 65%)' },

			{ varName: 'chart-6', hex: '#d144b5' },
			{ varName: 'chart-6-dark', hex: 'shade(@color-chart-6, 35%)' },
			{ varName: 'chart-6-light', hex: 'tint(@color-chart-6, 65%)' },
		]
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
						{_.map(group.colors, (color, j) => (
							<div key={j} className={classNames(boundClassNames('&'))}>
								<div className={boundClassNames(`&-color-${color.varName}`)}></div>
								<p><code>{`@${color.featured || ''}color-${color.varName};`}</code></p>
								<p className={boundClassNames('&-hex-string')}>{color.hex}</p>
							</div>
						))}
					</div>
				))}
			</div>
		);
	}
});

export default ColorPalette;
