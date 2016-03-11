import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';

import { lucidClassNames } from '../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-ColorPalette');

const colorList = [
	{
		category: 'basic',
		colors: [
			{
				varName: 'white',
				hex: '#fff'
			},
			{
				varName: 'black',
				hex: '#000'
			},
			{
				varName: 'primary',
				hex: '#2abbb0'
			},
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
		category: 'transparent gray',
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
		category: 'grays',
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
		category: 'featured colors',
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
		category: 'featured default',
		colors: [
			{varName: 'default-borderColor', hex: '#c5c5c5', featured: 'featured-'},
			{varName: 'default-backgroundColor', hex: '#ededed', featured: 'featured-'},
			{varName: 'default-gradientStartColor', hex: '#f3f3f3', featured: 'featured-'},
			{varName: 'default-gradientEndColor', hex: '#e2e2e2', featured: 'featured-'},
		]
	},
	{
		category: 'featured primary',
		colors: [
			{varName: 'primary-borderColor', hex: '@color-primary', featured: 'featured-'},
			{varName: 'primary-backgroundColor', hex: 'tint(@color-primary, 70%)', featured: 'featured-'},
			{varName: 'primary-borderColorLite', hex: 'tint(@color-primary, 60%)', featured: 'featured-'},
			{varName: 'primary-gradientStartColor', hex: 'tint(@color-primary, 30%)', featured: 'featured-'},
			{varName: 'primary-gradientEndColor', hex: '@color-primary', featured: 'featured-'},
		]
	},
	{
		category: 'featured success',
		colors: [
			{varName: 'success-borderColor', hex: '@color-success', featured: 'featured-'},
			{varName: 'success-backgroundColor', hex: 'tint(@color-success, 70%)', featured: 'featured-'},
			{varName: 'success-borderColorLite', hex: 'tint(@color-success, 60%)', featured: 'featured-'},
			{varName: 'success-gradientStartColor', hex: 'tint(@color-success, 30%)', featured: 'featured-'},
			{varName: 'success-gradientEndColor', hex: '@color-success', featured: 'featured-'},
		]
	},
	{
		category: 'featured info',
		colors: [
			{varName: 'info-borderColor', hex: '@color-info', featured: 'featured-'},
			{varName: 'info-backgroundColor', hex: 'tint(@color-info, 70%)', featured: 'featured-'},
			{varName: 'info-borderColorLite', hex: 'tint(@color-info, 60%)', featured: 'featured-'},
			{varName: 'info-gradientStartColor', hex: 'tint(@color-info, 30%)', featured: 'featured-'},
			{varName: 'info-gradientEndColor', hex: '@color-info', featured: 'featured-'},
		]
	},
	{
		category: 'featured warning',
		colors: [
			{varName: 'warning-borderColor', hex: '@color-warning', featured: 'featured-'},
			{varName: 'warning-backgroundColor', hex: 'tint(@color-warning, 70%)', featured: 'featured-'},
			{varName: 'warning-borderColorLite', hex: 'tint(@color-warning, 60%)', featured: 'featured-'},
			{varName: 'warning-gradientStartColor', hex: 'tint(@color-warning, 30%)', featured: 'featured-'},
			{varName: 'warning-gradientEndColor', hex: '@color-warning', featured: 'featured-'},
		]
	},
	{
		category: 'featured danger',
		colors: [
			{varName: 'danger-borderColor', hex: '@color-danger'},
			{varName: 'danger-backgroundColor', hex: 'tint(@color-danger, 70%)', featured: 'featured-'},
			{varName: 'danger-borderColorLite', hex: 'tint(@color-danger, 60%)', featured: 'featured-'},
			{varName: 'danger-gradientStartColor', hex: 'tint(@color-danger, 30%)', featured: 'featured-'},
			{varName: 'danger-gradientEndColor', hex: '@color-danger', featured: 'featured-'},
		]
	},
];

const ColorPalette = React.createClass({
	render() {
		return (
			<div >
				<h2>Color Palette</h2>
				<p>A list of all colors used.  Colors are listed by group type.</p>
				{_.map(colorList, (group, i) => (
					<div key={i} style={{display: 'flex', flexWrap: 'wrap'}}>
						<h3 style={{flex: '1 0 100%'}}>{group.category}</h3>
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
